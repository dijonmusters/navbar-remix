import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getPublishedEpisodes } from "~/utils/notion.server";

export const loader = async () => {
  const episodes = await getPublishedEpisodes();
  return json(
    { episodes },
    {
      headers: {
        "Cache-Control": "max-age=60, stale-while-revalidate=60",
      },
    }
  );
};

export default function Index() {
  const { episodes } = useLoaderData();

  return (
    <div className="min-h-screen flex max-w-7xl mx-auto">
      <div className="w-64 p-16">
        {/* TODO! Create a type for Episode */}
        {episodes.map((episode: any) => (
          <Link
            key={episode.id}
            to={episode.slug}
            prefetch="intent"
            className="block"
          >
            {episode.title}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

<div className="flex-1">Hello</div>;
