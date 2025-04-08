import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'acs_area_master' })
export class Area {
  @PrimaryColumn({ type: 'varchar', length: 20, nullable: false }) 
  area_id: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  area_nm: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  area_tp: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  point_cnt: string; 
 
  @Column({ type: 'text', nullable: false, default: '' }) 
  point_val: string; 
 
  @PrimaryColumn({ nullable: false }) 
  map_uuid: number; 
 
  @Column({ type: 'tinyint', width: 1, nullable: false, default: 1 }) 
  usable_fl: number; 
 
  @PrimaryColumn({ type: 'varchar', length: 50, nullable: false }) 
  site_cd: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  description_tx: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  prev_activity_tx: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  activity_tx: string; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  creator_by: string; 
 
  @CreateDateColumn()  
  create_at: Date; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  modifier_by: string; 
 
  @UpdateDateColumn()  
  modify_at: Date; 
 
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  trans_tx: string; 
 
  @Column({ type: 'datetime', nullable: true }) 
  last_event_at: Date; 
 
}