import { Box } from '@mantine/core';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { getIdeas } from '../../utils/IdeaUtils';
import classes from './BrowsePage.module.css';
import ListIdeas from './ListIdeas';
import SearchBar from './SearchBar';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    return await getIdeas();
}

export default function BrowsePage() {
    const ideas = useLoaderData();
    const [posts, setPosts] = useState(ideas);
    const [searchResults, setSearchResults] = useState(ideas);

    return (
        <Box p={'xl'}>
            <SearchBar posts={posts} setSearchResults={setSearchResults} />
            <Box className={classes.cardContainer}>
                <ListIdeas searchResults={searchResults} />
            </Box>
        </Box>
    );
}
