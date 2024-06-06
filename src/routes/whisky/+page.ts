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
      whiskies: data.whiskies,
      regions: data.regions,
      types: data.types,
    },
  };
};

