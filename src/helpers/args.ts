import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {getVersion} from "./getVersion";

interface makePotArguments {
    /** Positional arguments */
    _: (string | number)[];
    $0: string;
    source: Array<string>;
    destination: string;
    domain: string;
    headers?: any;
}

export const initArgs = (): makePotArguments => {
    return <makePotArguments>yargs(hideBin(process.argv))
        .scriptName("make-pot")
        .usage("$0 <args>")
        .version(getVersion())
        .parserConfiguration({
            "camel-case-expansion": false
        })
        .options({
            'source': {
                demandOption: true,
                describe: "Space-seperated list of directories that should be searched.",
                type: "array"
            },
            'destination': {
                demandOption: true,
                describe: "Directory where the POT file will be placed.",
                type: "string"
            },
            'domain': {
                demandOption: true,
                describe: "The domain that will be used in the POT file.",
                type: "string"
            },
            'headers': {
                demandOption: false,
                describe: "The headers that will be added to the POT file. Example: --headers.Language-Team Freave",
                type: "string",
                'string': true
            }
        })
        .parse();
}
