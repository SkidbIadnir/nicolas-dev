import type { PageServerLoad } from "./$types";
import { adminAuth, adminDB } from "$lib/server/admin";
import { auth } from "$lib/firebase";
import { signOut } from "firebase/auth";
import { error } from "@sveltejs/kit";

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