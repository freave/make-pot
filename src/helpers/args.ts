import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {getVersion} from "./getVersion";

export const initArgs = ():Array<string> => {
    setCommands();
    return getArgs();
}

const setCommands = () => {
    yargs
        .scriptName("create-pot")
        .usage("$0 <args>")
        .version(getVersion())
        .options({
            'directories': {
                demandOption: true,
                describe: "Comma-seperated list of directories that should be searched.",
                type: "string"
            }
        })
        .parse();
}

const getArgs = (): any => {
    return yargs(hideBin(process.argv)).argv;
}
