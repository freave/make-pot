import c from "ansi-colors";
import fs from "fs";
import {walkDirectories} from "../helpers/walkDirectories";
import {getMatches} from "../helpers/getMatches";

// import {version} from "../../package.json";

const version = '0.0.1';
const directories = ['C:\\Projects\\freave\\create-pot\\test'];
const outputLocation = 'C:\\Projects\\freave\\create-pot\\test\\';
const outputName = 'domain.pot';
const potHeader = `# Generated by Freave POT generatorr ${version}\n` +
    '#\n' +
    '#, fuzzy\n' +
    'msgid ""\n' +
    'msgstr ""\n' +
    '"Project-Id-Version: freaveflex \\n"\n' +
    '"Report-Msgid-Bugs-To: Freave \\n"\n' +
    '"Last-Translator: Freave \\n"\n' +
    '"Language-Team: Freave \\n"\n' +
    '"MIME-Version: 1.0 \\n"\n' +
    '"Content-Type: text/plain; charset=UTF-8 \\n"\n' +
    '"Content-Transfer-Encoding: 8bit \\n"\n' +
    '"POT-Creation-Date: ' + new Date().toISOString() + ' \\n"\n' +
    '"PO-Revision-Date: ' + new Date().toISOString() + ' \\n"\n' +
    '"X-Generator:  Freave POT generator ' + version + ' \\n"\n';

export const createPot = () => {

    console.log(c.black.bgGreen(" Freave POT generator " + version + " "));
    console.log(c.green("Searching in the following directories: "));

    for (let dir of directories) {
        console.log(c.green(dir));
    }

    walkDirectories(directories, (err: any, results: string[]) => {
        if (err) throw err;

        // filter out the files ending in .pot
        let filteredResults = results.filter((result: string) => {
            return !result.match(/.pot$/);
        });

        console.log('\x1b[32m%s\x1b[0m', "Searching " + filteredResults.length + " files...");

        let allMatches = getMatches(filteredResults);

        console.log('\x1b[42m\x1b[30m', 'Found ' + allMatches.length + ' matches.','\x1b[0m');

        let potContent = '';

        for (let singleMatch of allMatches) {
            potContent += '\n\n# ' + singleMatch.filename + ':' + singleMatch.linenumber + '\n' +
                'msgctxt "' + singleMatch.match.context + '"\n' +
                'msgid "' + singleMatch.match.text + '"\n' +
                'msgstr ""';
        }

        let potFile = potHeader + potContent;

        fs.writeFileSync(outputLocation + outputName, potFile);
        console.log('\x1b[32m%s\x1b[0m', '\nPOT file created in ' + outputLocation + outputName);
    });

}
