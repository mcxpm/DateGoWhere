import { useEffect, useState } from 'react';

import classes from './BrowsePage.module.css';
import ListIdeas from './ListIdeas';
import MockData from './MockData';
import SearchBar from './SearchBar';

/* const mockdata = {
  image:
    'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  title: 'East Coast Park date',
  country:   'South',
  description:
    'Cycling date along East Coast Park to Gardens By The Bay, followed by dinner at lau pa sat',
  badges: [
    { emoji: '☀️', label: 'Sunny weather' },
    { emoji: '🦓', label: 'Onsite zoo' },
    { emoji: '🌊', label: 'Sea' },
    { emoji: '🌲', label: 'Nature' },
    { emoji: '🤽', label: 'Water sports' },
  ],
}; */

export default function BrowsePage() {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const data = MockData;
        setPosts(data);
        setSearchResults(data);
    }, []);

    return (
        <>
            <SearchBar posts={posts} setSearchResults={setSearchResults} />
            <div className={classes.cardContainer}>
                <ListIdeas searchResults={searchResults} />
            </div>
        </>
    );
}
