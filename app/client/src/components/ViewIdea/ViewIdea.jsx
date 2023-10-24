import {
    Accordion,
    Box,
    Button,
    Divider,
    Modal,
    Paper,
    ScrollArea,
    Stack,
    Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { getIdea } from '../../utils/IdeaUtils';
import CreateReview from './CreateReview';
import Overview from './Overview';
import ReviewCard from './ReviewCard';
import classes from './ViewIdea.module.css';

export async function loader({ params }) {
    return await getIdea(params.id);
}

const ViewIdea = () => {
    const ideaRef = useLoaderData();
    const idea = ideaRef.data();

    const [opened, { open, close }] = useDisclosure(false);
    const [isAddingReview, setIsAddingReview] = useState(false);

    const toggleView = () => {
        setIsAddingReview((prev) => !prev);
    };

    return (
        <Paper p={'md'} m={'xs'} withBorder shadow="xl" className={classes.leftPanel}>
            <Stack gap={'sm'}>
                <Overview idea={idea} />
                <Divider />

                <Accordion multiple variant="contained">
                    {idea.activities.map((activity) => (
                        <Accordion.Item key={activity.name} value={activity.name}>
                            <Accordion.Control>
                                <Text size="xs" c={'dimmed'} fw={500}>
                                    {activity.start} - {activity.end}{' '}
                                </Text>
                                <Text truncate="end">
                                    <Text component="span" fw={700}>
                                        {activity.name}
                                    </Text>
                                    &nbsp;@&nbsp;
                                    {activity.location.name}
                                </Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Text size="sm" fw={700} fs="italic">
                                    Author Description
                                </Text>
                                <Text size="sm">{activity.description}</Text>
                                <Text size="xs" c={'dimmed'} fw={500}>
                                    Estimated Damage : ${activity.budget}
                                </Text>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Stack>

            <Box>
                <Divider my={'sm'} />

                <>
                    <Modal
                        // size="xl"
                        opened={opened}
                        onClose={close}
                        title={
                            <Stack>
                                <Overview idea={idea} />

                                <Button onClick={toggleView}>
                                    {isAddingReview ? 'Return' : 'Add review'}
                                </Button>
                                <Divider />
                            </Stack>
                        }
                        scrollAreaComponent={ScrollArea.Autosize}
                    >
                        {isAddingReview ? (
                            <CreateReview />
                        ) : (
                            <ReviewCard reviewData={idea.reviews} />
                        )}
                    </Modal>

                    <Button onClick={open} fullWidth variant="outline">
                        View Reviews
                    </Button>
                </>
            </Box>
        </Paper>
    );
};

export default ViewIdea;
