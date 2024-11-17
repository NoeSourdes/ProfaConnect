import katex from "katex";

export const formatMessageContent = (content: string) => {
  // Transforme les mathématiques LaTeX en HTML avec KaTeX
  const formattedContent = content
    .replace(/\$\$(.*?)\$\$/g, (_, equation) =>
      katex.renderToString(equation, { throwOnError: false })
    )
    .replace(/\$(.*?)\$/g, (_, equation) =>
      katex.renderToString(equation, { displayMode: true, throwOnError: false })
    )
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/(\d+)\.\s/g, "<br />- Étape $1 : ")
    .replace(/- (.*?):/g, "<br /><strong>$1 :</strong>")
    .replace(/\n/g, "<br />");

  return formattedContent;
};
