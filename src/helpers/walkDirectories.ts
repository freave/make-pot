import {readdir} from "node:fs/promises";
import {resolve} from "node:path";

// https://stackoverflow.com/a/45130990/8678755
async function getFiles(dir: string) :Promise<any> {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

export const walkDirectories = async (directories: string[]): Promise<any[]> => {
    let results: any[] = [];

    if (!directories.length) return results;

    for (const directory of directories) {
        results.push(getFiles(directory));
    }

    const resolvedResults = await Promise.all(results);

    return resolvedResults.flat();
}
