import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { auth, db } from "../config/firebase";

export const createReview = async (id, review) => {
    console.log(id, review)
    const ideaRef = doc(db, 'ideas', id);
    console.log({
        review: {
            createdAt: new Date(),
            createdBy: auth.currentUser.displayName,
            ...review
        }
    })
    return await updateDoc(ideaRef, {
        reviews: arrayUnion({
            createdAt: new Date(),
            createdBy: auth.currentUser.displayName,
            ...review
        })
    });
};




export const deleteReview = async () => { };