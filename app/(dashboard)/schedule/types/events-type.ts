export type EventType = {
  title: string;
  date: Date;
  color: string;
  description: string | null;
  startTime: string;
  endTime: string;
  categoryId: string | null;
  category: { name: string } | null;
  id: string;
  authorId: string;
};
