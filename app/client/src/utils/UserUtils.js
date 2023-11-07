import { collection, doc, documentId, getDoc, getDocs, query, where } from "firebase/firestore";

import { db } from "../config/firebase";

export const getUserIdeas = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
        return [];
    }
    const ideaIdList = docSnap.data().ideas;
    if (!ideaIdList || !ideaIdList.length) {
        return []
    }
    const q = query(collection(db, "ideas"), where(documentId(), "in", ideaIdList));
    const docs = await getDocs(q);
    return docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}