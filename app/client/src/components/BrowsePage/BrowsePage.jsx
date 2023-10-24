import { Box } from '@mantine/core';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../../config/firebase';
import { getIdeas } from '../../utils/IdeaUtils';
import classes from './BrowsePage.module.css';
import ListIdeas from './ListIdeas';
import SearchBar from './SearchBar';

export default function TestPage() {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // Fetch data from Firestore and update state
        const fetchData = async () => {
            const ideas = await getIdeas();
            setPosts(ideas);
            setSearchResults(ideas);
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
