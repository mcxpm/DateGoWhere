import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

import { auth, db } from '../config/firebase';

export const getIdeas = async () => {
    const q = query(collection(db, "ideas"), where("isPublished", "==", true), where("isPublic", "==", true));
    const docs = await getDocs(q);
    return docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getIdea = async (id) => {
    const ideaRef = doc(db, "ideas", id)
    const docSnap = await getDoc(ideaRef);
    if (!docSnap.exists()) {
        return null;
    }
    return docSnap.data()
};

export const getIdeaRefFromId = async (id) => {
    return doc(db, 'ideas', id);
}

export const createIdea = async () => {
    try {
        const idea = {
            createdBy: auth.currentUser.uid,
            isPublished: false,
            isPublic: true,
            reviews: []
        }

        const ideaDocRef = await addDoc(collection(db, 'ideas'), idea);
        const ideaDocId = ideaDocRef.id;
        const userDocRef = doc(db, "users", auth.currentUser.uid)
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
            await updateDoc(userDocRef, {
                ideas: arrayUnion(ideaDocId)
            })
        } else {
            await setDoc(userDocRef, {
                ideas: [ideaDocId]
            })
        }
        return ideaDocRef;
    }
    catch (e) {
        console.log("Error creating idea", e)
        throw e;
    }
};

export const updateIdea = async (ideaRef, newIdea) => {
    return await updateDoc(ideaRef, newIdea)
};

export const deleteIdea = async (id) => {
    const userDocRef = doc(db, "users", auth.currentUser.uid)
    const deleteIdeaIdFromUser = updateDoc(userDocRef, { ideas: arrayRemove(id) })
    const ideaRef = doc(db, 'ideas', id);
    const deleteIdeaDoc = deleteDoc(ideaRef)
    return Promise.all([deleteIdeaDoc, deleteIdeaIdFromUser])
};
