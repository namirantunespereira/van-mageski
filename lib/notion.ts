
import "server-only";
import { Client } from "@notionhq/client";
import type { Tattoo } from "./gallery";

const token = process.env.NOTION_TOKEN;
const db = process.env.NOTION_DATABASE_ID;

export async function getTattoosFromNotion(): Promise<Tattoo[]> {
  if (!token || !db) return [];
  const notion = new Client({ auth: token });

  const result = await notion.databases.query({
    database_id: db,
    filter: {
      property: "Published",
      checkbox: { equals: true }
    },
    sorts: [{ property: "Date", direction: "descending" }]
  });

  const items: Tattoo[] = [];

  for (const page of result.results) {
    // @ts-ignore
    const props = (page as any).properties;
    const title = props.Name?.title?.[0]?.plain_text ?? "Sem título";
    const category = props.Category?.select?.name ?? "Outros";

    // ImageURL (URL) tem prioridade; se não houver, pega primeiro arquivo de Image.
    const imageUrl = props.ImageURL?.url ??
      (props.Image?.files?.[0]?.external?.url || props.Image?.files?.[0]?.file?.url);

    if (!imageUrl) continue;

    items.push({
      id: page.id,
      title,
      category,
      image: imageUrl,
      published: true
    });
  }

  return items;
}
