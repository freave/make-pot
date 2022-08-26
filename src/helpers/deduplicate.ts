export const deduplicate = (matches: any[]) => {
    let deduplicatedMatches: any[] = [];

    for (const match of matches) {
        let found = false;

        for (const deduplicatedMatch of deduplicatedMatches) {

            if (deduplicatedMatch.match.context) {
                if (
                    match.match.text === deduplicatedMatch.match.text &&
                    match.match.domain === deduplicatedMatch.match.domain &&
                    match.match.context === deduplicatedMatch.match.context
                ) {
                    found = true;
                    break;
                }
            } else {
                if (
                    match.match.text === deduplicatedMatch.match.text &&
                    match.match.domain === deduplicatedMatch.match.domain
                ) {
                    found = true;
                    break;
                }
            }

        }

        if (!found) {
            deduplicatedMatches.push(match);
        }
    }

    return deduplicatedMatches;
}
