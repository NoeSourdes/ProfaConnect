export type EventType = {
  title: string;
  date: Date;
  color: string;
  description: string | null;
  start: string;
  end: string;
  startTime: string;
  endTime: string;
  categoryId: string | null;
  category: { name: string } | null;
  id: string;
  userId: string;
};
