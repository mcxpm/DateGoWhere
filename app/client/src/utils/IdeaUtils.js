import { addDoc, arrayUnion, collection, doc, documentId, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

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

export const getUserIdeas = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
        return [];
    }
    const ideaIdList = docSnap.data().ideas;
    const q = query(collection(db, "ideas"), where(documentId(), "in", ideaIdList));
    const docs = await getDocs(q);
    return docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
        const userDocRef = await doc(db, "users", auth.currentUser.uid)
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

export const deleteIdea = async () => { };

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


export const deleteReview = async () => { };
