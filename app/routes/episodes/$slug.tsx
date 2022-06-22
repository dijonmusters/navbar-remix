import { json } from "@remix-run/node";
import { Params, useLoaderData } from "@remix-run/react";
import { getEpisodeBySlug } from "~/utils/notion.server";

export const loader = async ({ params }: { params: Params }) => {
  const { html } = await getEpisodeBySlug(params.slug!);
  return json(
    { html },
    {
      headers: {
        "Cache-Control": "max-age=60, stale-while-revalidate=60",
      },
    }
  );
};

export default function Index() {
  const { html } = useLoaderData();

  return (
    <div className="flex-1 bg-slate-700 p-16">
      <div
        className=" prose prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
