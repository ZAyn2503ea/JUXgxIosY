// 代码生成时间: 2025-09-23 10:38:26
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { Transform } from 'stream';
import { PassThrough } from 'stream';
import { createInterface } from 'readline';
import { LogEntry } from './log-entry.interface';

@Injectable()
export class LogParserService {
  private readonly logPattern: RegExp = /\[(.*?)\]\s+(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+(.*)/;

  constructor() {}

  /**
   * Parses a log file stream and emits log entries.
   *
   * @param logFileStream - A readable stream of log file content.
   */
  parseLogFile(logFileStream: Readable): Transform {
    const lineStream = createInterface({
      input: logFileStream,
      crlfDelay: Infinity,
    }).on('line', (line: string) => {
      const match = this.logPattern.exec(line);
      if (match) {
        const logEntry: LogEntry = {
          level: match[1],
          timestamp: match[2],
          message: match[3],
        };
        this.emitLogEntry(logEntry);
      } else {
        this.handleError(new Error('Failed to parse log entry'));
      }
    });

    return new PassThrough({
      objectMode: true,
      transform(chunk, encoding, callback) {
        callback(null, chunk);
      },
    });
  }

  private emitLogEntry(logEntry: LogEntry): void {
    // Here you would emit the logEntry to some event stream or handle it as required.
    console.log('Parsed Log Entry:', logEntry);
  }

  private handleError(error: Error): void {
    // Implement error handling logic.
    console.error('Error parsing log file:', error.message);
  }
}

/*
 * Log Entry Interface
 *
 * Defines the structure of a log entry.
 */
export interface LogEntry {
  level: string;
  timestamp: string;
  message: string;
}
