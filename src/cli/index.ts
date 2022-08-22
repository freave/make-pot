import c from "ansi-colors";
import {walkDirectories} from "../helpers/walkDirectories";
import {getMatches} from "../helpers/getMatches";
import {getVersion} from "../helpers/getVersion";
import {initArgs} from "../helpers/args";
import {writePotFile} from "../helpers/writePotFile";

const args = initArgs();

export const makePot = async () => {
    console.log(c.black.bgGreen("Freave make-pot " + getVersion()));
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

    let filteredMatches = allMatches.filter((match: any) => {
        return match.match.domain === args.domain;
    });

    console.log(c.black.bgGreen('Found ' + filteredMatches.length + ' matches.'));

    writePotFile(filteredMatches, args.destination, args.domain);

    console.log(c.green('\nPOT file created in ' + args.destination + '/' + args.domain + '.pot'));
}
