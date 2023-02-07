import { readFileSync } from "node:fs";
import { lineEnding, matchGroups } from "../consts";
import { matchResults } from "../types";

export const getMatches = async (files: string[]): Promise<matchResults[] | []> => {
  let contents: any[] = [];

  for (const file of files) {
    contents.push({ body: readFileSync(file, 'utf8'), filename: file });
  }

  let formattedMatches: matchResults[] = [];

  for (const content of contents) {
    for (const matchGroup of matchGroups) {
      const results = content.body.match(matchGroup.matchRegex);

      if (!results) {
        continue;
      }

      for (const match of results) {
        const lineNumber = content.body.substring(0, content.body.indexOf(match)).split(lineEnding).length;
        const splitMatch = match.match(matchGroup.extractRegex);

        if (!splitMatch) {
          continue;
        }

        formattedMatches.push({
          filename: content.filename,
          lineNumber: lineNumber,
          match: matchGroup.formatMatch(splitMatch)
        });

      }
    }
  }

  return formattedMatches;
}
