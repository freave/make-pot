import {potHeader} from "../consts";
import fs, {writeFile} from "fs";

export const writePotFile = (data: any[], destination: string, outputName: string) => {
    let potContent = '';

    for (let singleMatch of data) {
        potContent += '\n\n# ' + singleMatch.filename + ':' + singleMatch.linenumber + '\n' +
            'msgctxt "' + singleMatch.match.context + '"\n' +
            'msgid "' + singleMatch.match.text + '"\n' +
            'msgstr ""';
    }

    let potFile = potHeader + potContent;

    fs.writeFileSync(destination + '/' + outputName, potFile);
}
