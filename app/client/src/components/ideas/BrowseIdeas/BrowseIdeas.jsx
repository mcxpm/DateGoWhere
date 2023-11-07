import { Box, Grid, Select, Text } from '@mantine/core';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { getIdeas } from '../../../utils/IdeaUtils';
import Idea from './Idea';
import SearchBar from './SearchBar';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    return await getIdeas();
}

export default function BrowseIdeas() {
    const ideas = useLoaderData();
    const [filteredIdeas, setFilteredIdeas] = useState(ideas);
    const [filter, setFilter] = useState('');
    const [query, setQuery] = useState('');

    const handleSearchAndFilter = (_query, _filter) => {
        if (!_query && !_filter) return setFilteredIdeas(ideas);
        const query = _query.toLowerCase();
        let filteredIdeas = ideas.filter(
            (idea) =>
                idea.title.toLowerCase().includes(query) ||
                idea.description?.toLowerCase().includes(query) ||
                idea.tags?.map((tag) => tag.toLowerCase()).includes(query),
        );
        if (!_filter) {
            return setFilteredIdeas(filteredIdeas);
        }
        filteredIdeas = filteredIdeas.filter((idea) => idea.tags?.includes(_filter));
        setFilteredIdeas(filteredIdeas);
    };

    return (
        <Box p={'xl'}>
            <Grid>
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <SearchBar
                        filter={filter}
                        setQuery={setQuery}
                        handleSearchAndFilter={handleSearchAndFilter}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Select
                        label="Filter by tags"
                        placeholder="Pick value"
                        value={filter}
                        data={[
                            'Romantic',
                            'Outdoor',
                            'Food',
                            'Sport',
                            'Dance',
                            'Cultural',
                        ]}
                        clearable
                        onChange={(value) => {
                            setFilter(value);
                            handleSearchAndFilter(query, value);
                        }}
                        size="md"
                    />
                </Grid.Col>
                {filteredIdeas.length ? (
                    filteredIdeas.map((idea) => (
                        <Grid.Col key={idea.id} span={{ base: 12, sm: 6, md: 4 }}>
                            <Idea idea={idea} />
                        </Grid.Col>
                    ))
                ) : (
                    <Grid.Col span={{ base: 12 }}>
                        <Text>Sorry, No date ideas match your search</Text>
                    </Grid.Col>
                )}
            </Grid>
        </Box>
    );
}
