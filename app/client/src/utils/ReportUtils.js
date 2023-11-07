import { addDoc, collection } from "firebase/firestore";

import { auth, db } from "../config/firebase";

export const createReport = async (id, report) => {
    try {
        return await addDoc(collection(db, 'reports'), {
            createdBy: auth.currentUser.uid,
            ideaID: id,
            ...report
        });
    }
    catch (e) {
        console.log("Error creating report", e)
        throw e;
    }
};