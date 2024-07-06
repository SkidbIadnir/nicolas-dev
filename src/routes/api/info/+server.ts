/** @type {import('./$types').RequestHandler} */ export async function GET({
  request,
}) {
  let whiskiesListAll: [
    {
      name: string;
      abv: number;
      price: number;
      age: number;
      location: string;
      taste: string;
      status: string;
      region: string;
      type: string;
      image: string;
    }
  ] = [
    {
      name: "",
      region: "",
      type: "",
      age: 0,
      location: "",
      taste: "",
      abv: 0,
      price: 0,
      status: "",
      image: "",
    },
  ];
  const regions: string[] = [];
  const types: string[] = [];
  const statuses: string[] = [];
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

    let url = "";
    let abv: number = 0;
    data.results.forEach((whisky: any) => {
      if (whisky.properties.Images.files.length > 0) {
        url = whisky.properties.Images.files[0].file.url;
      }
      abv = whisky.properties.ABV.number * 100; // convert to percentage\
      abv = Math.floor(whisky.properties.ABV.number * 100); // truncate to the nearest integer

      whiskiesListAll.push({
        name: whisky.properties.Name.title[0].text.content,
        age: whisky.properties["Age (OF THE BOTTLE)"].number,
        abv: abv,
        price: whisky.properties.Price.number,
        location: whisky.properties.Location.rich_text[0].text.content,
        taste: whisky.properties["SAT Tasting"].relation[0].id,
        status: whisky.properties.Status.status.name,
        region: whisky.properties.Region.select.name,
        type: whisky.properties.Type.multi_select,
        image: url,
      });

      // whiskyListBought.push({
      //   name: whisky.properties.Name.title[0].text.content,
      //   age: whisky.properties["Age (OF THE BOTTLE)"].number,
      // });
    });
    whiskiesListAll.shift();
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

    data.properties.Status.status.options.forEach((status: any) => {
      statuses.push(status.name);
    });
  } catch (error) {
    console.error(error);
  }

  return Response.json({
    whiskiesListAll: whiskiesListAll,
    regions: regions,
    types: types,
    statuses: statuses,
  });
}
