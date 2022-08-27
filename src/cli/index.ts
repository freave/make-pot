import c from "ansi-colors";
import {walkDirectories} from "../helpers/walkDirectories";
import {getMatches} from "../helpers/getMatches";
import {getVersion} from "../helpers/getVersion";
import {initArgs} from "../helpers/args";
import {writePotFile} from "../helpers/writePotFile";
import {deduplicate} from "../helpers/deduplicate";

const args = initArgs();

export const makePot = async () => {
    console.info(c.black.bgGreen(`Freave make-pot ${getVersion()}`));

    // Filter out files that are undefined or ending in .pot
    const files: string[] = (await walkDirectories(args.source))
      .filter((result) => result !== undefined && !result.match(/.pot$/))

    if (files.length === 0) {
        console.warn(c.red("No matching files found."));
        return;
    }

    console.info(c.green(`Searching ${files.length} files...`));

    let matches = (await getMatches(files))
      .filter(({ match }) => match.domain === args.domain);

    console.info(c.black.bgGreen(`Found ${matches.length} matches.`));

    matches = deduplicate(matches);

    writePotFile(matches, args.destination, args.domain, args.headers);

    console.info(c.green('\nPOT file created in ' + args.destination + '/' + args.domain + '.pot'));
}
