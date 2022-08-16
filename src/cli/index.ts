import c from "ansi-colors";
import fs from "fs";
import {walkDirectories} from "../helpers/walkDirectories";
import {getMatches} from "../helpers/getMatches";
import {getVersion} from "../helpers/getVersion";
import {initArgs} from "../helpers/args";
import {potHeader} from "../consts";

const args = initArgs();

const outputName = 'domain.pot';

export const createPot = () => {

    console.log(c.black.bgGreen("Freave create-pot " + getVersion()));
    console.log(c.green("Searching in the following directories: "));

    for (let directory of args.source) {
        console.log(c.green(directory));
    }

    walkDirectories(args.source, (err: any, results: string[]) => {
        if (err) throw err;

        // filter out the files ending in .pot
        let filteredResults = results.filter((result: string) => {
            return !result.match(/.pot$/);
        });

        console.log(c.green("Searching " + filteredResults.length + " files..."));

        let allMatches = getMatches(filteredResults);

        console.log(c.black.bgGreen('Found ' + allMatches.length + ' matches.'));

        let potContent = '';

        for (let singleMatch of allMatches) {
            potContent += '\n\n# ' + singleMatch.filename + ':' + singleMatch.linenumber + '\n' +
                'msgctxt "' + singleMatch.match.context + '"\n' +
                'msgid "' + singleMatch.match.text + '"\n' +
                'msgstr ""';
        }

        let potFile = potHeader + potContent;

        fs.writeFileSync(args.destination + '/' + outputName, potFile);
        console.log(c.green('\nPOT file created in ' + args.destination + '/' + outputName));
    });

}
