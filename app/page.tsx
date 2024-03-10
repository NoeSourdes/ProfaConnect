import { ModeToggle } from "@/components/ToogleTheme";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-5xl font-bold text-primary">Profaconnect 2.0</h1>
      <ModeToggle />
    </div>
  );
}
