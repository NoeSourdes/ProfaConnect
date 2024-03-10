import Image from "next/image";

export const Sidebar = () => {
  return (
    <div className="h-full w-full p-7">
      <div>
        <div className="flex items-center gap-3">
          <Image
            src="/img/logo-profaconnect.png"
            alt="Logo Profaconnect"
            width={40}
            height={40}
          />
          <h1 className="text-xl font-semibold">ProfaConnect</h1>
        </div>
      </div>
    </div>
  );
};
