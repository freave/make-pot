import { readFile } from "node:fs/promises";
import { lineEnding, matchGroups } from "../consts";
import { matchResults } from "../types";

export const getMatches = async (files: string[]): Promise<matchResults[] | []> => {
  let contentPromises: any[] = [];

  for (const file of files) {
    contentPromises.push({ body: await readFile(file, 'utf8'), filename: file });
  }

  const contents = await Promise.all(
    contentPromises.map(async (contentPromise) => {
        return {
          ...contentPromise,
          body: await contentPromise.body
        };
      }
    ));

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
