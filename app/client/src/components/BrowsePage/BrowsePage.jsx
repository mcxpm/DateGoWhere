import { Box } from '@mantine/core';
import { useEffect, useState } from 'react';

import classes from './BrowsePage.module.css';
import ListIdeas from './ListIdeas';
import MockData from './MockData';
import SearchBar from './SearchBar';

export default function BrowsePage() {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const data = MockData;
        setPosts(data);
        setSearchResults(data);
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
