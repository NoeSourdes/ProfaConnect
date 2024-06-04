export type timeProps = {
  currentTime: Date;
  setCurrentTime: (currentTime: Date) => void;
};

export const Time = (props: timeProps) => {
  return (
    <div className="flex items-center w-full">
      <h4 className="px-1 rounded-full bg-secondary text-xs max-sm:text-[10px] text-muted-foreground">
        {props.currentTime.toLocaleTimeString().slice(0, 5)}
      </h4>
      <div className="w-full h-[0.5px] border-b border-dashed"></div>
    </div>
  );
};
