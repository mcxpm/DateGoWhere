import { Paper } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';

import { getIdea } from '../../utils/IdeaUtils';
import classes from './TestViewIdea.module.css';

export async function loader({ params }) {
    console.log('view', params);
    return await getIdea(params.id);
}

const TestViewIdea = () => {
    const ideaRef = useLoaderData();

    return (
        <Paper p={'md'} m={'xs'} withBorder shadow="xl" className={classes.leftPanel}>
            {JSON.stringify(ideaRef.data())}
        </Paper>
    );
};

export default TestViewIdea;
