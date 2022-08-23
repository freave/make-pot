interface MatchGroup {
    /** Name of the WordPress translation function */
    wpFunction: string;
    /** The Regex for finding matches */
    matchRegex: RegExp;
    /** The Regex for extracting the parameters */
    extractRegex: RegExp;
    /** Function for formatting a single matchRegex result. */
    formatMatch: (match: string[]) => any;
}

export const matchGroups: MatchGroup[] = [
    {
        wpFunction: '_x',
        matchRegex: new RegExp(/(?<!esc_attr|esc_html)_x\(.*?\)/gs),
        extractRegex: new RegExp(/_x\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                context: match[2],
                domain: match[3]
            };
        }
    },
    {
        wpFunction: '__',
        matchRegex: new RegExp(/(?<!esc_attr|esc_html)__\(.*?\)/gs),
        extractRegex: new RegExp(/__\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: '_e',
        matchRegex: new RegExp(/(?<!esc_attr|esc_html)_e\(.*?\)/gs),
        extractRegex: new RegExp(/_e\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: 'esc_attr__',
        matchRegex: new RegExp(/esc_attr__\(.*?\)/gs),
        extractRegex: new RegExp(/esc_attr__\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: 'esc_attr_e',
        matchRegex: new RegExp(/esc_attr_e\(.*?\)/gs),
        extractRegex: new RegExp(/esc_attr_e\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: 'esc_html__',
        matchRegex: new RegExp(/esc_html__\(.*?\)/gs),
        extractRegex: new RegExp(/esc_html__\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: 'esc_html_e',
        matchRegex: new RegExp(/esc_html_e\(.*?\)/gs),
        extractRegex: new RegExp(/esc_html_e\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                domain: match[2]
            };
        }
    },
    {
        wpFunction: '_ex',
        matchRegex: new RegExp(/_ex\(.*?\)/gs),
        extractRegex: new RegExp(/_ex\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                context: match[2],
                domain: match[3]
            };
        }
    },
    {
        wpFunction: 'esc_attr_x',
        matchRegex: new RegExp(/esc_attr_x\(.*?\)/gs),
        extractRegex: new RegExp(/esc_attr_x\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                context: match[2],
                domain: match[3]
            };
        }
    },
    {
        wpFunction: 'esc_html_x',
        matchRegex: new RegExp(/esc_html_x\(.*?\)/gs),
        extractRegex: new RegExp(/esc_html_x\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                context: match[2],
                domain: match[3]
            };
        }
    },
    {
        wpFunction: '_n',
        matchRegex: new RegExp(/_n\(.*?\)/gs),
        extractRegex: new RegExp(/_n\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*(.*?)\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                plural: match[2],
                domain: match[4]
            };
        }
    },
    {
        wpFunction: '_nx',
        matchRegex: new RegExp(/_nx\(.*?\)/gs),
        extractRegex: new RegExp(/_nx\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*(.*?)\s*,\s*['"](.*?)['"]\s*, \s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                plural: match[2],
                context: match[4],
                domain: match[5]
            };
        }
    },
    {
        wpFunction: '_n_noop',
        matchRegex: new RegExp(/_n_noop\(.*?\)/gs),
        extractRegex: new RegExp(/_n_noop\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => ({
            text: match[1],
            plural: match[2],
            domain: match[3]
        })
    },
    {
        wpFunction: '_nx_noop',
        matchRegex: new RegExp(/_nx_noop\(.*?\)/gs),
        extractRegex: new RegExp(/_nx_noop\(\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*,\s*['"](.*?)['"]\s*, \s*['"](.*?)['"]\s*\)/),
        formatMatch: (match: string[]) => {
            return {
                text: match[1],
                plural: match[2],
                context: match[3],
                domain: match[4]
            };
        }
    },
]
