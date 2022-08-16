import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {getVersion} from "./getVersion";

interface createPotArguments {
    /** Positional arguments */
    _: (string | number)[];
    $0: string;
    source: Array<string>;
    destination: Array<string>;
}

export const initArgs = (): createPotArguments => {
    return <createPotArguments>yargs(hideBin(process.argv))
        .scriptName("create-pot")
        .usage("$0 <args>")
        .version(getVersion())
        .options({
            'source': {
                demandOption: true,
                describe: "Space-seperated list of directories that should be searched.",
                type: "array"
            },
            'destination': {
                demandOption: true,
                describe: "Directory where the POT file will be placed.",
                type: "array"
            }
        })
        .parse();
}
