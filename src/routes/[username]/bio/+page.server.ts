import type { PageServerLoad } from "./$types";
import { adminAuth, adminDB } from "$lib/server/admin";
import { auth } from "$lib/firebase";
import { signOut } from "firebase/auth";
import { error, fail, type Actions } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {

    const uid = locals.userID;
    if (!uid) {
        throw error(401, "Unauthorized");
    }
    
    const userDoc = await adminDB.collection("users").doc(uid!).get();
    const { username, bio } = userDoc.data()!;

    
    return {
        bio,
    }
    
  }) satisfies PageServerLoad;


export const actions = {
    default: async ({ locals, request, params}) => {
            const uid = locals.userID;
            if (!uid) {
                    throw error(401, "Unauthorized");
            }
            const data = await request.formData();
            const userRef = adminDB.collection("users").doc(uid!);
            const bio = data.get("bio");
            const { username } = (await userRef.get()).data()!;
            if (params.username !== username) {
                    throw error(401, "Unauthorized");
            }

            if (bio!.toString().length > 260) {
                    let excessBio = bio!.toString().length - 260;
                    let problemString = `Bio must be less than ${excessBio} characters`;
                    return fail(400, { problem: problemString});
                }
            await userRef.update({ bio });
    },
} satisfies Actions;