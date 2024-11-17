import { Calendar, Folder, Gamepad, Shapes } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Base_profabotProps {
  setInputValue: (value: string) => void;
}

const buttons = [
  { icon: Folder, color: "#6EB6F2", text: "Créer un dossier" },
  { icon: Calendar, color: "#a855f7", text: "Créer un evènement" },
  { icon: Gamepad, color: "#ea580c", text: "Créer un mini-jeux" },
  { icon: Shapes, color: "#eab308", text: "Créer une classe" },
];

export default function Base_profabot({ setInputValue }: Base_profabotProps) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-16 flex items-center md:pt-32 pt-10 flex-col gap-5">
      <div className="flex flex-col items-center">
        {/* <Image src="/img/profabot.webp" alt="Logo" width={100} height={100} /> */}
        <h1 className="sm:text-6xl text-4xl font-bold bg-[linear-gradient(120deg,#6EB6F2_10%,#6EB6F2,#a855f7,#ea580c,#eab308)] bg-clip-text text-transparent">
          ProfaBot
        </h1>
      </div>
      <h2 className="sm:text-4xl text-2xl font-bold">
        Comment puis-je vous aider ?
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {buttons.map(({ icon: Icon, color, text }, index) => (
          <button
            onClick={() => {
              setInputValue(text);
            }}
            key={index}
            className="border rounded-full px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-secondary transition-colors"
          >
            <Icon size={24} style={{ color }} />
            <p className="text-sm text-muted-foreground">{text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
