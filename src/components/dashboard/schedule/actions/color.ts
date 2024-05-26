export const colors: Array<
  | "novel-highlight-purple"
  | "novel-highlight-red"
  | "novel-highlight-yellow"
  | "novel-highlight-blue"
  | "novel-highlight-green"
> = [
  "novel-highlight-purple",
  "novel-highlight-red",
  "novel-highlight-yellow",
  "novel-highlight-blue",
  "novel-highlight-green",
];

export const colorClasses: Record<(typeof colors)[number], string> = {
  "novel-highlight-purple": "bg-novel-highlight-purple",
  "novel-highlight-red": "bg-novel-highlight-red",
  "novel-highlight-yellow": "bg-novel-highlight-yellow",
  "novel-highlight-blue": "bg-novel-highlight-blue",
  "novel-highlight-green": "bg-novel-highlight-green",
};
