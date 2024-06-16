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
      whiskiesListAll: data.whiskiesListAll,
      regions: data.regions,
      types: data.types,
      statuses: data.statuses,
    },
  };
};
