export default async function RouteLayout({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  return (
    <div>
      <h1>Route Layout</h1>
      <div>
        <p>Slug: {resolvedParams.slug.join("/")}</p>
      </div>
    </div>
  );
}
