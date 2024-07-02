import { page } from "$app/stores";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const { name } = params;
  const formatedName = "SAT: " + name;
  let pageContent = {
    title: "",
    nose: {
      clarity: "",
      viscosity: "",
      color: "",
      condition: "",
      intensity: "",
      fruits: [] as { name: string }[],
      floral: [] as { name: string }[],
      spices: [] as { name: string }[],
      oak: [] as { name: string }[],
      other_notes: "",
    },
    palate: {
      sweetness: "",
      bitterness: "",
      alcohol: "",
      body: "",
      flavor_intensity: "",
      flavor_characteristics: [] as { name: string }[],
    },
    finish: {
      length: "",
      character: "",
    },
    conclusion: {
      quality: "",
      other_observations: "",
    },
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/e08b91e262914e708571b8121ccb2a95/query`,
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
            equals: formatedName,
          },
        },
      }),
    }
  );

  const data = await res.json();
  const satProperties = data.results[0].properties;
  pageContent = {
    title: satProperties.Name.title[0].text.content,
    nose: {
      clarity: satProperties.Clarity.select.name,
      viscosity: satProperties.Viscosity.select.name,
      color: satProperties.Color.select.name,
      condition: satProperties["Nose Condition"].select.name,
      intensity: satProperties["Nose Intensity"].select.name,
      fruits: satProperties.Fruits.multi_select,
      floral: satProperties.Floral.multi_select,
      spices: satProperties.Spices.multi_select,
      oak: satProperties.Oak.multi_select,
      other_notes: satProperties["Other Nose"].rich_text[0].text.content,
    },
    palate: {
      sweetness: satProperties.Sweetness.select.name,
      bitterness: satProperties.Bitterness.select.name,
      alcohol: satProperties.Alcohol.select.name,
      body: satProperties.Body.select.name,
      flavor_intensity: satProperties["Flavor Intensity"].select.name,
      flavor_characteristics:
        satProperties["Flavor Characteristics"].multi_select,
    },
    finish: {
      length: satProperties["Finish Length"].select.name,
      character: satProperties["Finish Character"].select.name,
    },
    conclusion: {
      quality: satProperties["Quality Level"].select.name,
      other_observations:
        satProperties["Other Observations"].rich_text[0].text.content,
    },
  };

  return json({ pageContent });
};

