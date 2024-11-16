// Fonction pour formater la réponse
export const formatMessageContent = (content: string) => {
  const formattedContent = content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/(\d+)\.\s/g, "<br />- Étape $1 : ")
    .replace(/- (.*?):/g, "<br /><strong>$1 :</strong>")
    .replace(/\n/g, "<br />");

  return formattedContent.replace(
    /Cliquez ici pour créer un dossier/g,
    `<a href="/documents/create" class="text-blue-500 underline">Cliquez ici pour créer un dossier</a>`
  );
};
