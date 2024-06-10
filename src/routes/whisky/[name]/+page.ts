/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, params }) => {
  const name: string = params.name;
  let whiskyData = {
    name: "",
    region: "",
    type: [] as { name: string }[],
    age: 0,
    abv: 0,
    taste: "",
    price: 0,
    location: "",
    status: "",
    image: "",
  };
  const res = await fetch(`/api/whisky/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  let age = 0;
  let url = "";
  if (data.properties.Age) {
    age = data.properties.Age.number;
  }
  if (data.properties.Images.files.length > 0) {
    url = data.properties.Images.files[0].file.url;
  }

  whiskyData = {
    name: data.properties.Name.title[0].text.content,
    region: data.properties.Region.select.name,
    type: data.properties.Type.multi_select,
    age: age,
    abv: data.properties.ABV.number,
    taste: data.properties.Taste.rich_text[0].text.content,
    price: data.properties.Price.number,
    location: data.properties["Location Purchased"].rich_text[0].text.content,
    status: data.properties.Status.status.name,
    image: url,
  };

  const res2 = await fetch("/api/info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data2 = await res2.json();

  return {
    props: {
      whisky: whiskyData,
      whiskiesBought: data2.whiskiesBought,
      whiskiesTested: data2.whiskiesTested,
      whiskiesWanted: data2.whiskiesWanted,
    },
  };
};

