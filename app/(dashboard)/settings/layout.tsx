interface LayoutProps {
  children: React.ReactNode;
}

export default async function RouteLayout({ children }: LayoutProps) {
  return (
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Paramètres</h1>
        </div>
        <div
          className="h-full w-full rounded-lg"
          x-chunk="dashboard-02-chunk-1"
        >
          {children}
        </div>
      </main>
    </div>
  );
}
