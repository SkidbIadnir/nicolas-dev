import { fromJSON } from "postcss";

/** @type {import('./$types').RequestHandler} */ export async function POST({
  request,
}) {
  const formData = await request.json();
  console.log("The form data : ", formData);

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer secret_X8fVfB5bXhuAWEYTMcgihDViWcrjthFtO0C2iSQA3m3",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: "695d6c5cf0d14e8ca0e7533583def23b" },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: formData.name, // Replace with actual name
              },
            },
          ],
        },
        Region: {
          select: {
            name: formData.region, // Replace with actual region
          },
        },
        Taste: {
          rich_text: [
            {
              text: {
                content: formData.taste, // Replace with actual taste
              },
            },
          ],
        },
        "Age (OF THE BOTTLE)": {
          number: formData.age, // Replace with actual age
        },
        Type: {
          multi_select: formData.type, // Replace with actual type
        },
        Price: {
          number: formData.price, // Replace with actual price
        },
        "Location Purchased": {
          rich_text: [
            {
              text: {
                content: formData.placePurchased, // Replace with actual location
              },
            },
          ],
        },
      },
    }),
  });
  const data = await res.json();
  console.log("The data : ", data);
  return Response.json({ status: "ok" });
}

