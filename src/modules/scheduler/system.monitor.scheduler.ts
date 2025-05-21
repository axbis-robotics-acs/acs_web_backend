import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ElasticLogService } from 'src/common/adapter/elk/elastic.log.service';
import * as os from 'os';

@Injectable()
export class SystemMonitorScheduler {
  constructor(private readonly elasticLogService: ElasticLogService) {}

  @Cron('0 0 * * * *') // 매시간 정각
  logMemoryAndCpu() {
    const formatMB = (bytes: number) => +(bytes / 1024 / 1024).toFixed(2);
    const formatMs = (micro: number) => +(micro / 1000).toFixed(2);
    const mem = process.memoryUsage();
    const cpu = process.cpuUsage(); // 마이크로초(us) 단위

    const uptime = process.uptime(); // 초(s) 단위
    const totalMem = os.totalmem();
    const rssUsed = mem.rss;
    const heapTotal = mem.heapTotal;
    const uptimeSec = process.uptime();
    const cpuCoreCount = os.cpus().length;

    const memoryUsagePercent = +((rssUsed / totalMem) * 100).toFixed(2);
    const memoryAllocatedPercent = +((heapTotal / totalMem) * 100).toFixed(2);
    const cpuTotalMs = cpu.user + cpu.system;
    const cpuUsagePercent = +(
      (cpuTotalMs / (uptimeSec * 1000 * cpuCoreCount)) *
      100
    ).toFixed(2); // 근사값

    this.elasticLogService.logMessage({
      type: 'system', // 로그 카테고리 (시스템 모니터링 용도로 구분하기 위한 타입)
      source: 'SystemMonitor', // 로그 발생 위치 또는 주체 (해당 스케줄러 클래스)
      event: 'resource_summary', // 이벤트 종류: 시스템 리소스 요약 보고용

      // ✅ 주요 모니터링 지표
      memoryUsagePercent, // 전체 시스템 메모리(RAM) 중 Node.js 프로세스가 실제 사용하는 메모리 비율 (%)
      // 계산식: rss / totalMem * 100
      // rss는 프로세스가 확보한 전체 물리 메모리 (힙, 스택 등 포함)

      memoryAllocatedPercent, // 전체 시스템 메모리 중 Node.js가 V8 힙으로 할당받은 비율 (%)
      // 계산식: heapTotal / totalMem * 100
      // 아직 사용되지 않은 여유 힙 공간도 포함됨

      cpuUsagePercent, // Node.js 프로세스가 시스템 CPU를 얼마나 사용했는지 나타내는 비율 (%)
      // 계산식: (cpu.user + cpu.system) / (uptime * cpuCoreCount * 1000) * 100
      // 근사값이며, 시스템 부하량과 비교 시 유용

      // ✅ 보조 정보 (필요 시 Kibana로 drill-down 가능)
      heapUsed: formatMB(mem.heapUsed), // V8 힙 중 실제 사용 중인 메모리 (MB)
      heapTotal: formatMB(heapTotal), // 현재 V8이 할당한 힙 전체 크기 (MB)
      rss: formatMB(rssUsed), // Resident Set Size: Node.js 전체 프로세스가 확보한 메모리 총량 (MB)

      cpuUser: formatMs(cpu.user), // Node.js가 사용자 영역에서 사용한 CPU 시간 (ms)
      cpuSystem: formatMs(cpu.system), // Node.js가 커널 영역에서 사용한 CPU 시간 (ms)
      cpuTotal: formatMs(cpuTotalMs), // cpuUser + cpuSystem의 합산 (ms)

      unit: '%', // 주 지표 단위: 퍼센트 기반 지표를 의미
    });

    console.log(
      `[SYSTEM] 🧠 heapUsed: ${formatMB(mem.heapUsed)}MB / ${formatMB(heapTotal)}MB, ` +
        `🧠 rss: ${formatMB(mem.rss)}MB, 🧮 cpuUser: ${formatMs(cpu.user)}ms,` +
        `cpuSystem: ${formatMs(cpu.system)}ms, cpuTotal: ${formatMs(cpuTotalMs)}ms, uptime: ${uptime.toFixed(2)}s`,
    );
  }
}
