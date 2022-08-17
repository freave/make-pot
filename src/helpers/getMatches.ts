import fs from "fs";

const lineEnding = '\n';

export const getMatches = (files: string[]) => {
    let results: any[] = [];

    for (let file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let formattedMatches = [];
        let matches = content.match(/_x\(.*?\)/gm);
        if (matches) {
            for (let match of matches) {
                let lineNumber = content.substring(0, content.indexOf(match)).split(lineEnding).length;
                let splitMatch = match.match(/_x\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/);
                if (splitMatch) {
                    let formattedMatch = {
                        text: splitMatch[1],
                        context: splitMatch[2],
                        domain: splitMatch[3]
                    }
                    formattedMatches.push({'filename': file, 'linenumber': lineNumber, 'match': formattedMatch});
                }
            }
            results = results.concat(formattedMatches);
        }
    }
    return results;
}
