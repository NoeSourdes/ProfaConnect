import { colorClasses15, colorClassesBorderClean } from "../actions/color";
import { checkHour } from "../actions/hour";
import { EventType } from "../actions/types/events-type";

export type CalendarWeekProps = {
  date: Date;
  events: EventType[];
};

export const CalendarWeek = (props: CalendarWeekProps) => {
  const listDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const listHours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const startingDayOfWeek = props.date.getDay();
  const adjustedStartingDayOfWeek = (startingDayOfWeek + 6) % 7;

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const weekDates = listDays.map((_, index) =>
    addDays(props.date, index - adjustedStartingDayOfWeek)
  );

  const getEventPosition = (event: any) => {
    const eventDate = new Date(event.date);
    const dayIndex = weekDates.findIndex(
      (date) => date.toDateString() === eventDate.toDateString()
    );

    if (dayIndex === -1) return null;

    const startTime = JSON.parse(event.start);
    const endTime = JSON.parse(event.end);
    const startHours = startTime.hour + startTime.minute / 60;
    const endHours = endTime.hour + endTime.minute / 60;
    const top = (startHours / 24) * 100;
    const height = ((endHours - startHours) / 24) * 100;

    return { dayIndex, top, height, startHours, endHours };
  };

  return (
    <div className="w-full h-full">
      <section className="pb-2">
        <div className="flex justify-between ml-10">
          {weekDates.map((date, index) => (
            <div
              key={listDays[index]}
              className={`text-xs font-medium text-muted-foreground w-full h-full flex items-center justify-center ${
                new Date().toDateString() === date.toDateString()
                  ? "text-primary"
                  : ""
              }`}
            >
              {`${listDays[index]} ${date.getDate()}`}
            </div>
          ))}
        </div>
      </section>
      <section className="flex max-h-[700px] h-full w-full overflow-y-auto border rounded-lg">
        <div className="h-full ml-1">
          {listHours.map((hour) => (
            <div
              key={hour}
              className="text-xs font-medium text-muted-foreground h-10 flex items-center justify-center"
            >
              {hour}
            </div>
          ))}
        </div>
        <div className="h-full grow pt-5 ml-1 relative">
          {Array.from({ length: 23 }).map((_, index) => (
            <div
              key={index}
              className={`h-10 border-b flex ${index == 0 ? "border-t " : ""}`}
            >
              <div className="h-full w-full flex">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-full w-full ${index == 0 ? " " : "border-l"}`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
          {props.events.map((event) => {
            const position = getEventPosition(event);
            if (!position) return null;

            const eventsSameDay = props.events.filter(
              (e) =>
                new Date(e.date).getTime() === new Date(event.date).getTime()
            );

            const eventsOverlapping = eventsSameDay.filter((e) => {
              const eventPos = getEventPosition(e);
              if (!eventPos) return false;
              // Check if events overlap
              return (
                (eventPos.startHours < position.endHours &&
                  eventPos.startHours >= position.startHours) ||
                (position.startHours < eventPos.endHours &&
                  position.startHours >= eventPos.startHours)
              );
            });

            const eventIndex = eventsOverlapping.findIndex(
              (e) => e.id === event.id
            );
            const eventCount = eventsOverlapping.length;

            const eventWidth = `calc(${100 / 7 / eventCount}% + 1px)`;
            const eventLeft = `calc(${position.dayIndex * (100 / 7)}% + ${
              eventIndex * (100 / 7 / eventCount)
            }%)`;

            return (
              <div
                key={event.id}
                className={`absolute rounded mt-[20px] p-[1px] pl-[2px]`}
                style={{
                  top: `${position.startHours * 40}px`,
                  height: `calc(${position.height}% + 1px)`,
                  left: eventLeft,
                  width: eventWidth,
                }}
              >
                <div
                  className={`w-full h-full border-2 rounded overflow-hidden ${
                    colorClasses15[event.color as keyof typeof colorClasses15]
                  } ${
                    colorClassesBorderClean[
                      event.color as keyof typeof colorClassesBorderClean
                    ]
                  }`}
                >
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs font-medium text-muted-foreground">
                    {checkHour(event.startTime)} - {checkHour(event.endTime)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
