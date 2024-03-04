import { themes } from "$lib/themes";
import { adminAuth } from "$lib/server/admin";
import { getCookie } from "$lib/utils/cookies";

export const handle = async ({ event, resolve }) => {
    let theme = event.cookies.get("theme");
    const sessionCookie = event.cookies.get("__session");
  
    if (!theme || !themes.includes(theme)) {
      console.log("no theme found, setting to default");
      theme = "light";
      return await resolve(event);
    }

    try {
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
      event.locals.userID = decodedClaims.uid;
      console.log("found user id", decodedClaims.uid);
    } catch (e) {
      event.locals.userID = null;
      return resolve(event);
    }


    return await resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace('data-theme=""', `data-theme="${theme}"`);
    },
  });
};