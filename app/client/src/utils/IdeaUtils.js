import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import { auth, db } from '../config/firebase';

export const getIdeas = async () => {
    const q = query(collection(db, "ideas"), where("isPublished", "==", true), where("isPublic", "==", true));
    const docs = await getDocs(q);
    return docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getIdea = async (id) => {
    const ideaRef = doc(db, "ideas", id)
    return await getDoc(ideaRef);
};

export const createIdea = async () => {
    try {
        return await addDoc(collection(db, 'ideas'), {
            createdBy: auth.currentUser.uid,
            isPublished: false,
            isPublic: true,
            reviews: []
        });
    }
    catch (e) {
        console.log("Error creating idea", e)
        throw e;
    }
};

export const updateIdea = async (ideaRef, newIdea) => {
    return await updateDoc(ideaRef, newIdea)
};

export const deleteIdea = async () => { };

export const createReview = async (id, review) => {
    const ideaRef = doc(db, 'ideas', id);
    return await updateDoc(ideaRef, {
        review: {
            createdAt: new Date(),
            createdBy: auth.currentUser.displayName,
            ...review
        }
    });
};

export const deleteReview = async () => { };
