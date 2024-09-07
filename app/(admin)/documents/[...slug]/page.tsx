"use client";

export default function RouteLayout({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  console.log(params.slug);
  return (
    <div>
      <h1>Route Layout</h1>
      <div>
        <p>Slug: {params.slug.join("/")}</p>
      </div>
    </div>
  );
}
