import { Box, Grid, Text } from '@mantine/core';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { getIdeas } from '../../utils/IdeaUtils';
import Idea from './Idea';
import SearchBar from './SearchBar';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    return await getIdeas();
}

export default function BrowsePage() {
    const ideas = useLoaderData();
    const [filteredIdeas, setFilteredIdeas] = useState(ideas);

    return (
        <Box p={'xl'}>
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    <SearchBar ideas={ideas} setFilteredIdeas={setFilteredIdeas} />
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
