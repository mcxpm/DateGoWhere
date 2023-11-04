import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebase";

export async function getUser() {
    return await new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                resolve(null);
            } else {
                resolve(user);
            }
        });
    })
        .then((user) => user)
        .catch(function (e) {
            throw e;
        });
}