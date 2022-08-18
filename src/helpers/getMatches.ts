import {readFile} from "node:fs/promises";

const lineEnding = '\n';

interface MatchGroup {
    /** Name of the WordPress translation function */
    wpFunction: string;
    /** The Regex for finding matches */
    matchRegex: RegExp;
    /** The Regex for extracting the parameters */
    extractRegex: RegExp;
    /** Function for formatting a single matchRegex result. */
    formatMatch: (match: string[]) => any;
}

const matchGroups: MatchGroup[] = [
    {
        wpFunction: '_x',
        matchRegex: new RegExp(/(?<!esc_attr|esc_html)_x\(.*?\)/),
        extractRegex: new RegExp(/_x\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                context: match[2],
                domain: match[3]
            };
        }
    },
    {
        wpFunction: '__',
        matchRegex: new RegExp(/(?<!esc_attr|esc_html)__\(.*?\)/),
        extractRegex: new RegExp(/__\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: '_e',
        matchRegex: new RegExp(/(?<!esc_attr|esc_html)_e\(.*?\)/),
        extractRegex: new RegExp(/_e\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: 'esc_attr__',
        matchRegex: new RegExp(/esc_attr__\(.*?\)/),
        extractRegex: new RegExp(/esc_attr__\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: 'esc_attr_e',
        matchRegex: new RegExp(/esc_attr_e\(.*?\)/),
        extractRegex: new RegExp(/esc_attr_e\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: 'esc_html__',
        matchRegex: new RegExp(/esc_html__\(.*?\)/),
        extractRegex: new RegExp(/esc_html__\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: 'esc_html_e',
        matchRegex: new RegExp(/esc_html_e\(.*?\)/),
        extractRegex: new RegExp(/esc_html_e\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: '_ex',
        matchRegex: new RegExp(/_ex\(.*?\)/),
        extractRegex: new RegExp(/_ex\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                context: match[2],
                domain: match[3]
            };
        }
    },
    {
        wpFunction: 'esc_attr_x',
        matchRegex: new RegExp(/esc_attr_x\(.*?\)/),
        extractRegex: new RegExp(/esc_attr_x\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                context: match[2],
                domain: match[3]
            };
        }
    },
    {
        wpFunction: 'esc_html_x',
        matchRegex: new RegExp(/esc_html_x\(.*?\)/),
        extractRegex: new RegExp(/esc_html_x\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                context: match[2],
                domain: match[3]
            };
        }
    }
]

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

    // Eerst zoek alle matches met een eigen regex. In dit geval eerst _x.
    // (?<!esc_attr|esc_attr|esc_html)_x\(.*?\)

    // interface van match maken

    // matchgroups in een array zetten
    // loop door matchgroups

    // let _xMatches = content.body.match(/^(?!esc_attr)_x\(.*?\)/gm);
    // let __Matches = content.body.match(/^(?!esc_attr)__\(.*?\)/gm);
    //
    // let _xRegex = /_x\\(\\s*[\'"](.*?)[\'"]\\s*,\\s*[\'"](.*?)[\'"]\\s*,\\s*[\'"](.*?)[\'"]\\s*\\)/;
    // let __Regex = /_x\\(\\s*[\'"](.*?)[\'"]\\s*,\\s*[\'"](.*?)[\'"]\\s*,\\s*[\'"](.*?)[\'"]\\s*\\)/;

    let formattedMatches: any[] = [];

    for (let content of contents) {

        // hier loop je door de matchgroups

        for (let matchGroup of matchGroups) {

            let results = content.body.match(matchGroup.matchRegex);


            // Voor alle matches, zoeken naar de relevante parameters.


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
