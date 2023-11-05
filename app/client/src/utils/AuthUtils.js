import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

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

export async function resetPassword(email) {
    const status = await sendPasswordResetEmail(auth, email);
    console.log("Sent reset email: ", status)
}