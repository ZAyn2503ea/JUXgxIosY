// 代码生成时间: 2025-09-24 11:29:37
 * It includes error handling and is designed to be easily maintainable and extensible.
 */

import { Injectable } from '@nestjs/common';
import { existsSync, readdirSync, renameSync } from 'fs';
import { join } from 'path';

@Injectable()
export class BatchFileRenamerService {

  constructor() {}

  /**
   * Renames all files in the given directory based on the provided naming pattern.
   * @param directoryPath The path to the directory containing files to rename.
   * @param namingPattern A function that determines the new name for each file.
   * @returns The number of renamed files.
   */
  public renameFiles(directoryPath: string, namingPattern: (filename: string) => string): number {
    if (!existsSync(directoryPath)) {
      throw new Error('Directory does not exist.');
    }

    const files = readdirSync(directoryPath);
    let renamedCount = 0;

    for (const file of files) {
      try {
        const oldPath = join(directoryPath, file);
        const newName = namingPattern(file);
        const newPath = join(directoryPath, newName);

        // Rename the file if the new name is different from the old name.
        if (file !== newName) {
          renameSync(oldPath, newPath);
          renamedCount++;
        }
      } catch (error) {
        console.error(`Error renaming file ${file}: ${error}`);
      }
    }

    return renamedCount;
  }

}