import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const { name } = params;

  // Fetch whisky details based on the name parameter
  const res = await fetch(
    `https://api.notion.com/v1/databases/695d6c5cf0d14e8ca0e7533583def23b/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer secret_X8fVfB5bXhuAWEYTMcgihDViWcrjthFtO0C2iSQA3m3",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        filter: {
          property: "Name",
          title: {
            equals: name,
          },
        },
      }),
    }
  );
  const data = await res.json();
  const whisky = data.results[0];

  if (whisky) {
    return json(whisky);
  } else {
    return json({ error: "Whisky not found" }, { status: 404 });
  }
};
