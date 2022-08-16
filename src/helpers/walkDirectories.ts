import fs from "fs";
import path from "node:path";

export const walk = (dir: string, done: Function) => {
    let results: string[] = [];

    fs.readdir(dir, (err, list) => {
        if (err) return done(err);

        let pending = list.length;
        if (!pending) return done(null, results);

        list.forEach((file) => {
            file = path.resolve(dir, file);

            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {

                    walk(file, (err: NodeJS.ErrnoException | null, res: any) => {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });

                } else {

                    results.push(file);
                    if (!--pending) done(null, results);

                }
            });

        });
    });
};

export const walkDirectories = (dirs: string[], done: any) => {
    let results: any[] = [];

    let pending = dirs.length;

    if (!pending) return done(null, results);

    dirs.forEach((dir: string) => {
        walk(dir, (err: any, res: any) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
        });
    });
}
