import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

import { db } from '../config/firebase';

export const getIdeas = async () => {
    return await getDocs(collection(db, 'ideas'))
};

export const getIdea = async (id) => {
    const ideaRef = doc(db, "ideas", id)
    return await getDoc(ideaRef);
};

export const createIdea = async () => {
    return await addDoc(collection(db, 'ideas'), {});
};

export const updateIdea = async (ideaRef, newIdea) => {
    return await setDoc(ideaRef, newIdea)
};

export const deleteIdea = async () => { };

export const createReview = async () => { };

export const deleteReview = async () => { };
