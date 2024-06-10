/** @type {import('./$types').RequestHandler} */ export async function GET({
  request,
}) {
  let whiskyListBought: [{ name: string; age: number }] = [
    { name: "", age: 0 },
  ];
  let whiskyListTested: [{ name: string; age: number }] = [
    { name: "", age: 0 },
  ];
  let whiskyListWanred: [{ name: string; age: number }] = [
    { name: "", age: 0 },
  ];
  const regions: string[] = [];
  const types: string[] = [];
  try {
    const res = await fetch(
      "https://api.notion.com/v1/databases/695d6c5cf0d14e8ca0e7533583def23b/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer secret_X8fVfB5bXhuAWEYTMcgihDViWcrjthFtO0C2iSQA3m3",
          "Notion-Version": "2022-06-28",
        },
      }
    );
    const data = await res.json();

    data.results.forEach((whisky: any) => {
      if (whisky.properties.Status.status.name === "Bought") {
        whiskyListBought.push({
          name: whisky.properties.Name.title[0].text.content,
          age: whisky.properties["Age (OF THE BOTTLE)"].number,
        });
      }
      if (whisky.properties.Status.status.name === "Tested") {
        whiskyListTested.push({
          name: whisky.properties.Name.title[0].text.content,
          age: whisky.properties["Age (OF THE BOTTLE)"].number,
        });
      }
      if (whisky.properties.Status.status.name === "Wanted") {
        whiskyListWanred.push({
          name: whisky.properties.Name.title[0].text.content,
          age: whisky.properties["Age (OF THE BOTTLE)"].number,
        });
      }
      // whiskyListBought.push({
      //   name: whisky.properties.Name.title[0].text.content,
      //   age: whisky.properties["Age (OF THE BOTTLE)"].number,
      // });
    });
    whiskyListBought.shift();
    whiskyListTested.shift();
    whiskyListWanred.shift();
  } catch (error) {
    console.error(error);
  }

  try {
    const res = await fetch(
      "https://api.notion.com/v1/databases/695d6c5cf0d14e8ca0e7533583def23b/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer secret_X8fVfB5bXhuAWEYTMcgihDViWcrjthFtO0C2iSQA3m3",
          "Notion-Version": "2022-06-28",
        },
      }
    );
    const data = await res.json();
    data.properties.Region.select.options.forEach((region: any) => {
      regions.push(region.name);
    });

    data.properties.Type.multi_select.options.forEach((type: any) => {
      types.push(type.name);
    });
  } catch (error) {
    console.error(error);
  }

  return Response.json({
    whiskiesBought: whiskyListBought,
    whiskiesTested: whiskyListTested,
    whiskiesWanted: whiskyListWanred,
    regions: regions,
    types: types,
  });
}

