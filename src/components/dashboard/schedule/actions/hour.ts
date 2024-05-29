import { EventType } from "./types/events-type";

export const checkHour = (hour: string) => {
  const tab = hour.split(":");
  if (tab.length === 2 && tab[1].length === 1) {
    return tab[0] + ":0" + tab[1];
  }
  return hour;
};

export const sortEvents = (events: EventType[]) => {
  const liste: any = [];
  events.map((event) => {
    const startTime = checkHour(event.startTime);
    const endTime = checkHour(event.endTime);
    liste.push({ ...event, startTime, endTime });
  });
  liste.sort((a: any, b: any) => {
    const timeA = a.startTime.split(":").map(Number);
    const timeB = b.startTime.split(":").map(Number);
    return timeA[0] - timeB[0] || timeA[1] - timeB[1];
  });
  return liste;
};
