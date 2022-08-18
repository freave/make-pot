import {readFile} from "node:fs/promises";
import {matchGroups} from "../consts";

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

    let formattedMatches: any[] = [];

    for (let content of contents) {

        for (let matchGroup of matchGroups) {

            let results = content.body.match(matchGroup.matchRegex);

            if (results) {
                for (let match of results) {
                    let lineNumber = content.body.substring(0, content.body.indexOf(match)).split(lineEnding).length;

                    let splitMatch = match.match(matchGroup.extractRegex);

                    if (splitMatch) {

                        formattedMatches.push({
                            filename: content.filename,
                            linenumber: lineNumber,
                            match: matchGroup.formatMatch(splitMatch)
                        });
                    }
                }
            }
        }
    }

    results = results.concat(formattedMatches);

    return results;
}
