export const colors: Array<
  | "novel-highlight-green"
  | "novel-highlight-red"
  | "novel-highlight-blue"
  | "novel-highlight-purple"
  | "novel-highlight-gray"
> = [
  "novel-highlight-green",
  "novel-highlight-red",
  "novel-highlight-blue",
  "novel-highlight-purple",
  "novel-highlight-gray",
];

export const colorClasses: Record<(typeof colors)[number], string> = {
  "novel-highlight-purple": "bg-novel-highlight-purple/40",
  "novel-highlight-red": "bg-novel-highlight-red/40",
  "novel-highlight-gray": "bg-novel-highlight-gray/40",
  "novel-highlight-blue": "bg-novel-highlight-blue/40",
  "novel-highlight-green": "bg-novel-highlight-green/40",
};

export const colorClasses15: Record<(typeof colors)[number], string> = {
  "novel-highlight-purple": "bg-novel-highlight-purple/15",
  "novel-highlight-red": "bg-novel-highlight-red/15",
  "novel-highlight-gray": "bg-novel-highlight-gray/15",
  "novel-highlight-blue": "bg-novel-highlight-blue/15",
  "novel-highlight-green": "bg-novel-highlight-green/15",
};

export const colorClassesClean: Record<(typeof colors)[number], string> = {
  "novel-highlight-purple": "bg-novel-highlight-purple",
  "novel-highlight-red": "bg-novel-highlight-red",
  "novel-highlight-gray": "bg-novel-highlight-gray",
  "novel-highlight-blue": "bg-novel-highlight-blue",
  "novel-highlight-green": "bg-novel-highlight-green",
};

export const colorClassesBorder: Record<(typeof colors)[number], string> = {
  "novel-highlight-purple": "border-novel-highlight-purple/40",
  "novel-highlight-red": "border-novel-highlight-red/40",
  "novel-highlight-gray": "border-novel-highlight-gray/40",
  "novel-highlight-blue": "border-novel-highlight-blue/40",
  "novel-highlight-green": "border-novel-highlight-green/40",
};

export const colorClassesBorderClean: Record<(typeof colors)[number], string> =
  {
    "novel-highlight-purple": "border-novel-highlight-purple",
    "novel-highlight-red": "border-novel-highlight-red",
    "novel-highlight-gray": "border-novel-highlight-gray",
    "novel-highlight-blue": "border-novel-highlight-blue",
    "novel-highlight-green": "border-novel-highlight-green",
  };
