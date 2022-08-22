import {potHeader} from "../consts";
import {writeFileSync} from "fs";

export const writePotFile = (data: any[], destination: string, domain: string) => {
    let potContent = '';

    for (let singleMatch of data) {
        potContent += '\n\n# ' + singleMatch.filename + ':' + singleMatch.linenumber + '\n';

        if (singleMatch.match.context) {
            potContent += 'msgctxt "' + singleMatch.match.context + '"\n';
        }

        potContent += 'msgid "' + singleMatch.match.text + '"\n';

        if (singleMatch.match.plural) {
            potContent += 'msgid_plural "' + singleMatch.match.plural + '"\n' +
                'msgstr[0] ""\n' +
                'msgstr[1] ""\n';
        } else {
            potContent += 'msgstr ""\n';
        }
    }

    let potFile = potHeader + potContent;

    writeFileSync(destination + '/' + domain + '.pot', potFile);
}
