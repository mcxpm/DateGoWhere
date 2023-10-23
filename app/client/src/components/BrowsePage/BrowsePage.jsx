import { Box } from '@mantine/core';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../../config/firebase';
import classes from './BrowsePage.module.css';
import ListIdeas from './ListIdeas';
import SearchBar from './SearchBar';

export default function TestPage() {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // Fetch data from Firestore and update state
        const fetchData = async () => {
            const collectionRef = collection(db, 'ideas');
            const querySnapshot = await getDocs(collectionRef);
            const docs = querySnapshot.docs.map((doc) => {
                const data = doc.data()
                data.id = doc.id
                return data
            });
            console.log(docs);
            const ideasData = [];
            docs.forEach((doc) => {
                console.log(doc);
                ideasData.push(doc);
            });
            setPosts(ideasData);
            setSearchResults(ideasData);
        };
        fetchData();
    }, []);

    return (
        <Box p={'xl'}>
            <SearchBar posts={posts} setSearchResults={setSearchResults} />
            <Box className={classes.cardContainer}>
                <ListIdeas searchResults={searchResults} />
            </Box>
        </Box>
    );
}
