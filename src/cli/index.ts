import c from "ansi-colors";
import {walkDirectories} from "../helpers/walkDirectories";
import {getMatches} from "../helpers/getMatches";
import {getVersion} from "../helpers/getVersion";
import {initArgs} from "../helpers/args";
import {writePotFile} from "../helpers/writePotFile";

const args = initArgs();

const outputName = 'domain.pot';

export const createPot = async () => {

    console.log(c.black.bgGreen("Freave create-pot " + getVersion()));
    console.log(c.green("Searching in the following directories: "));

    for (let directory of args.source) {
        console.log(c.green(directory));
    }

    const results: any[] = await walkDirectories(args.source);

    if (results.length === 0) {
        console.log(c.red("No matches found."));
        return;
    }

    // filter out the files ending in .pot
    let filteredResults = results.filter((result: string) => {
        return !result.match(/.pot$/);
    });

    if (filteredResults.length === 0) {
        console.log(c.red("No matches found."));
        return;
    }

    console.log(c.green("Searching " + filteredResults.length + " files..."));

    let allMatches = await getMatches(filteredResults);

    console.log(c.black.bgGreen('Found ' + allMatches.length + ' matches.'));

    writePotFile(allMatches, args.destination, outputName);

    console.log(c.green('\nPOT file created in ' + args.destination + '/' + outputName));
}
