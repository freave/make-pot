import {readdir} from "node:fs/promises";
import {resolve} from "node:path";

// https://stackoverflow.com/a/45130990/8678755
async function* getFiles(dir: string): any {
    const dirents = await readdir(dir, {withFileTypes: true});
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

export const walkDirectories = async (dirs: string[], done: any) => {
    let results: any[] = [];

    let pending = dirs.length;

    if (!pending) return done(null, results);

    for (const dir of dirs) {
        for await (const f of getFiles(dir)) {
            results = results.concat(f);
        }

        if (!--pending) done(null, results);

    }
}
