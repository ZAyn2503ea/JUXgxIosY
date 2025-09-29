// 代码生成时间: 2025-09-30 03:07:21
import { Module } from '@nestjs/common';
import { MemoryUsageAnalyzerService } from './memory-usage-analyzer.service';
import { Process } from 'process';
import * as os from 'os';

@Module({
  providers: [MemoryUsageAnalyzerService],
  exports: [MemoryUsageAnalyzerService],
})
export class MemoryUsageAnalyzerModule {}

/*
 * Service responsible for providing memory usage information of the application.
 */
import { Injectable } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class MemoryUsageAnalyzerService {
  /*
   * Get the current memory usage in megabytes.
   *
   * @returns {number} - The current memory usage in megabytes.
   */
  getCurrentMemoryUsage(): number {
    const usedMemory = process.memoryUsage();
    const heapUsedMb = usedMemory.heapUsed / 1024 / 1024;
    return heapUsedMb;
  }

  /*
   * Get the total available memory in megabytes.
   *
   * @returns {number} - The total available memory in megabytes.
   */
  getTotalAvailableMemory(): number {
    return os.totalmem() / 1024 / 1024;
  }

  /*
   * Get the memory usage percentage of the application.
   *
   * @returns {number} - The memory usage percentage of the application.
   */
  getMemoryUsagePercentage(): number {
    const totalMemory = this.getTotalAvailableMemory();
    const usedMemoryMb = this.getCurrentMemoryUsage();
    return Math.round((usedMemoryMb / totalMemory) * 100);
  }
}
