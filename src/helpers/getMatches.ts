import {readFile} from "node:fs/promises";

const lineEnding = '\n';

export const getMatches = async (files: string[]) => {
    let results: any[] = [];

    let contentPromises: any[] = [];

    for (const file of files) {
        contentPromises.push({body: readFile(file, 'utf8'), filename: file});
    }

    const contents = await Promise.all(
        // Resolve all promises, return the resolved values + the filename
        contentPromises.map(async (contentPromise) => {
                return {
                    ...contentPromise,
                    body: await contentPromise.body
                };
            }
        ));


    let formattedMatches = [];

    for (let content of contents) {

        let matches = content.body.match(/_x\(.*?\)/gm);

        if (matches) {
            for (let match of matches) {

                let lineNumber = content.body.substring(0, content.body.indexOf(match)).split(lineEnding).length;

                let splitMatch = match.match(/_x\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/);

                if (splitMatch) {
                    let formattedMatch = {
                        text: splitMatch[1],
                        context: splitMatch[2],
                        domain: splitMatch[3]
                    }
                    formattedMatches.push({
                        'filename': content.filename,
                        'linenumber': lineNumber,
                        'match': formattedMatch
                    });
                }
            }

        }
    }

    results = results.concat(formattedMatches);

    return results;
}
