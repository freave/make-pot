export type matchResults = {
  filename: string;
  lineNumber: number;
  match: {
    text: string;
    domain: string;
    context?: string;
    plural?: string;
  };
}
