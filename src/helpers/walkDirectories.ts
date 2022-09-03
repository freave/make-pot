import { readdir } from "node:fs/promises";
import { resolve, extname } from "node:path";
import c from "ansi-colors";
import { Dirent } from "fs";

type file = (string | undefined);

// https://stackoverflow.com/a/45130990/8678755
const getFiles = async (dir: string): Promise<file[] | []> => {

  let dirents: Dirent[] = [];

  try {
    dirents = await readdir(dir, { withFileTypes: true });
  } catch (e) {
    console.log(c.red(`Could not read directory: ${dir}`));
    console.log(e);
    return [];
  }

  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);

    if (!dirent.isDirectory() && extname(res) === '.php') {
      return res;
    }

    if (dirent.isSymbolicLink() && !dirent.isFile()) {
      // Symbolic links are not supported
      return;
    }

    return dirent.isDirectory() ? getFiles(res) : undefined;
  }));

  return Array.prototype.concat(...files);
}

export const walkDirectories = async (directories: string[]): Promise<string[]> => {
  let results: any[] = [];

  if (!directories.length) return results;

  for (const directory of directories) {
    results.push(getFiles(directory));
  }

  let resolvedResults = await Promise.all(results);

  return resolvedResults.flat().filter((result) => result !== undefined);
}
