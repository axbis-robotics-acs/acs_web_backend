import { Controller, Post, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { join, basename } from 'path';
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import * as Multer from 'multer';
import { exec } from 'child_process';
import * as sharp from 'sharp';
import slugify from 'slugify';

@Controller('file')
export class UploadController {
  private UPLOAD_PATH = 'C:\\HUBIS\\ROBOTICS\\HU_ACS_VIEW\\uploads';
  private CONVERT_PATH = join(this.UPLOAD_PATH, 'convert');
  private FREECAD_CMD = '"C:\\Program Files\\FreeCAD 1.0\\bin\\freecadcmd.exe"';
  private ODA_CONVERTER_CMD = '"C:\\Program Files\\ODA\\ODAFileConverter 25.12.0\\ODAFileConverter.exe"';

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('dwgFile', {
      storage: diskStorage({
        destination: 'C:\\HUBIS\\ROBOTICS\\HU_ACS_VIEW\\uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Multer.File, @Res() res: Response) {
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const baseName = basename(file.originalname, '.dwg');
    const safeName = slugify(baseName, { lower: true, strict: true }); // ex: cv-total

    const dwgPath = join(this.UPLOAD_PATH, `${safeName}.dwg`);
    const dxfPath = join(this.CONVERT_PATH, `${safeName}.dxf`);
    const stlPath = join(this.UPLOAD_PATH, `${safeName}.stl`);

    const dxfURL = `http://localhost:4000/uploads/convert/${safeName}.dxf`;
    const stlURL = `http://localhost:4000/uploads/${safeName}.stl`;

    mkdirSync(this.CONVERT_PATH, { recursive: true });
    writeFileSync(dwgPath, readFileSync(file.path));

    try {
      console.log('📤 DWG → DXF 변환 시작 (ODA CLI)');
      await this.convertDWGtoDXF(this.UPLOAD_PATH, this.CONVERT_PATH);

      if (!existsSync(dxfPath)) throw new Error('DXF 파일 생성 실패');

      // ✅ 3D STL 변환 시도
      console.log('📐 DXF → STL 변환 시작 (FreeCAD)');
      const isSTLGenerated = await this.convertDXFtoSTL(dxfPath, stlPath);

      console.log('📥 DXF URL:', dxfURL)
      console.log('📥 STL URL:', stlURL);

      if (isSTLGenerated) {
        console.log('✅ STL 생성 완료:', stlPath);
        const stlBuffer = readFileSync(stlPath);
        return res.json({ type: '3d', message: stlBuffer.toString('base64') });
      }

      const dxfBuffer = readFileSync(dxfPath, 'utf-8');
      return res.json({ type: '2d', message: dxfBuffer });
    } catch (err) {
      return res.status(500).json({ message: '변환 실패', error: err.message });
    }
  }

  private convertDWGtoDXF(inputDir: string, outputDir: string): Promise<string> {
    const command = `${this.ODA_CONVERTER_CMD} "${inputDir}" "${outputDir}" ACAD2013 DXF 1 1`;
    return new Promise((resolve, reject) => {
      exec(command, () => {
        const dxfFiles = readdirSync(outputDir).filter(f => f.toLowerCase().endsWith('.dxf'));
        if (dxfFiles.length > 0) resolve(dxfFiles[0]);
        else reject(new Error('DXF 파일이 생성되지 않았습니다'));
      });
    });
  }

  private convertDXFtoSTL(dxfPath: string, stlPath: string): Promise<boolean> {
    const script = `
import FreeCAD
import Mesh
import Import
import os

doc = FreeCAD.newDocument("Convert")
Import.insert("${dxfPath.replace(/\\/g, "\\\\")}", "Convert")
doc.recompute()
objs = doc.Objects
if len(objs) == 0:
    print("❌ 3D 객체 없음")
else:
    Mesh.export(objs, "${stlPath.replace(/\\/g, "\\\\")}")
FreeCAD.closeDocument("Convert")
`;
    const scriptPath = join(this.UPLOAD_PATH, 'convert_to_stl.py');
    writeFileSync(scriptPath, script);

    return new Promise((resolve, reject) => {
      exec(`${this.FREECAD_CMD} "${scriptPath}"`, (err, stdout, stderr) => {
        if (err || !existsSync(stlPath)) {
          console.log('❌ STL 변환 실패');
          return resolve(false);
        }
        return resolve(true);
      });
    });
  }
}
