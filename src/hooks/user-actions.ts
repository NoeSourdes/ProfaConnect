export const getRoleFrench = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "Administrateur";
    case "TEACHER":
      return "Enseignant";
    case "STUDENT":
      return "Élève";
    case "PARENT":
      return "Parent";
    default:
      return "Inconnu";
  }
};
