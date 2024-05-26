export const checkHour = (hour: string) => {
  const tab = hour.split(":");
  if (tab.length === 2 && tab[1].length === 1) {
    return tab[0] + ":0" + tab[1];
  }
  return hour;
};
