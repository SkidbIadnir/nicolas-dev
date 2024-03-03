import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { derived, writable, type Readable } from "svelte/store";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPzAoKgoIqCWW4oehSrRqTfx2mpcS9i_0",
  authDomain: "portfolio-c7b26.firebaseapp.com",
  projectId: "portfolio-c7b26",
  storageBucket: "portfolio-c7b26.appspot.com",
  messagingSenderId: "52366842862",
  appId: "1:52366842862:web:b546b67ca355bccd2e0cff",
  measurementId: "G-Y9G1PN9VP4"
};
/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

function docStore<T>(path: string,) {
  const docRef = doc(db, path);
  let unsubscribe: () => void;
  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });
    return () => unsubscribe();
  });
  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}


interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  links: any[];
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
export const user = userStore();


export const userData: Readable<UserData | null> = derived(user, ($user, set) => { 
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null); 
  }
});  
