import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}
