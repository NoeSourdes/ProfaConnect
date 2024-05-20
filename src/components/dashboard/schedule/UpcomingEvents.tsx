import { Calendar } from "lucide-react";

export type UpcomingEventsProps = {};

export const UpcomingEvents = (props: UpcomingEventsProps) => {
  return (
    <div className="border rounded-lg">
      <div className="flex justify-between border-b py-3 px-2 scroll-px-24">
        <div>
          <h2 className="flex items-center gap-3 text-sm font-medium">
            <Calendar size={20} />
            Événements à venir
          </h2>
        </div>
      </div>
      <div className="py-3 px-2 text-sm text-muted-foreground">
        Aucun événement à venir
      </div>
    </div>
  );
};
