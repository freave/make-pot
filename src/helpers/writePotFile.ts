import {getVersion} from "./getVersion";
import {writeFileSync} from "fs";
import path from "node:path";

export const writePotFile = (data: any[], destination: string, domain: string, headers: any) => {
    let potContent = '';

    for (let singleMatch of data) {
        potContent += '\n\n# ' + path.relative(process.cwd(), singleMatch.filename) + ':' + singleMatch.linenumber + '\n';

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

    // make-pot --source test/nested --destination test --domain domain --headers "{\"bla\":\"test\"}"
    // make-pot --source test/nested --destination test --domain domain --headers.Project-Id-Version="package version" --headers.rep
    // ortMsgidBugsTo="Freave"

    const potHeader = createPotHeader(headers);

    let potFile = potHeader + potContent;

    writeFileSync(destination + '/' + domain + '.pot', potFile);
}

const createPotHeader = (headers: any) => {

    let headerData: any = {
        'Project-Id-Version': 'PACKAGE VERSION',
        'Report-Msgid-Bugs-To': '',
        'Last-Translator': 'FULL NAME EMAIL@ADDRESS',
        'Language-Team': 'LANGUAGE LL@li.org',
        'Language': '',
        'MIME-Version': '1.0',
        'Content-Type': 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding': '8bit',
        'POT-Creation-Date': new Date().toISOString(),
        'PO-Revision-Date': new Date().toISOString(),
    }

    console.log(headers);


    if (headers) {
        for (let header in headers) {

            console.log(header);

            headerData[header] = headers[header];
        }

    }

    let potHeader = `# Generated by Freave make-pot ${getVersion()}\n` +
        '#\n' +
        '#, fuzzy\n' +
        'msgid ""\n' +
        'msgstr ""\n';

    for (let header in headerData) {
        potHeader += '"' + header + ': ' + headerData[header] + '\\n"\n';
    }

    potHeader += `"X-Generator: Freave make-pot ` + getVersion() + ` \\n"\n`;

    return potHeader;

    //     return `# Generated by Freave make-pot ${getVersion()}\n` +
    //         '#\n' +
    //         '#, fuzzy\n' +
    //         'msgid ""\n' +
    //         'msgstr ""\n' +
    //         `"Project-Id-Version: ${headerData['Project-Id-Version']} \\n"\n` +
    //         `"Report-Msgid-Bugs-To: ${headerData['Report-Msgid-Bugs-To']} \\n"\n` +
    //         `"Last-Translator: ${headerData['Last-Translator']} \\n"\n` +
    //         `"Language-Team: ${headerData['Language-Team']} \\n"\n` +
    //         `"Language: ${headerData['Language']} \\n"\n` +
    //         `"MIME-Version: ${headerData['MIME-Version']} \\n"\n` +
    //         `"Content-Type: ${headerData['Content-Type']} \\n"\n` +
    //         `"Content-Transfer-Encoding: ${headerData['Content-Transfer-Encoding']} \\n"\n` +
    //         `"POT-Creation-Date: ${headerData['POT-Creation-Date']} \\n"\n` +
    //         `"PO-Revision-Date: ${headerData['PO-Revision-Date']} \\n"\n` +
    //         `"X-Generator: Freave make-pot ` + getVersion() + ` \\n"\n`;

}
