/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, params }) => {
  const res = await fetch("/api/info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return {
    props: {
      whiskiesBought: data.whiskiesBought,
      whiskiesTested: data.whiskiesTested,
      whiskiesWanted: data.whiskiesWanted,
      regions: data.regions,
      types: data.types,
    },
  };
};

