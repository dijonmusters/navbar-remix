import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";

const DATABASE_ID = "f8c62de51ca0435bb2f1976ea1ceaedc";

const notion = new Client({
  auth: process.env.NOTION_API_SECRET,
});

export const getPublishedEpisodes = async () => {
  const episodes = [] as any[];
  let data = {} as any;

  do {
    data = await notion.databases.query({
      database_id: DATABASE_ID,
      // TODO! Filter by `Status` of `Released` - once we have some episodes released
      // TODO! Sort by release date - once we have some episodes released
      start_cursor: data?.next_cursor ?? undefined,
    });

    data.results.forEach((episode: any) => {
      episodes.push({
        id: episode.id,
        title: episode.properties.Name.title[0].text.content,
        slug: episode.properties.Slug.formula.string,
        // TODO! add release date - once we have some episodes released
      });
    });
  } while (data?.has_more);

  return episodes;
};

export const getEpisodeBySlug = async (slug: string) => {
  const page = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: `/episodes/${slug}`,
        },
      },
    },
  });

  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdblocks = await n2m.pageToMarkdown(page.results[0].id);
  const md = n2m.toMarkdownString(mdblocks);
  const html = marked.parse(md);

  return { html };
};
