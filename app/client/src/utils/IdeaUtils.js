import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import { auth, db } from '../config/firebase';

export const getIdeas = async () => {
    const q = query(collection(db, "ideas"), where("isPublished", "==", true));
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
            reviews: []
        });
    }
    catch (e) {
        console.log(e)
        throw e;
    }
};

export const updateIdea = async (ideaRef, newIdea) => {
    return await updateDoc(ideaRef, newIdea)
};

export const deleteIdea = async () => { };

export const createReview = async () => { };

export const deleteReview = async () => { };
