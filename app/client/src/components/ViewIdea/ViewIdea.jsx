import {
    Accordion,
    ActionIcon,
    Box,
    Button,
    Divider,
    Group,
    Modal,
    Paper,
    ScrollArea,
    Stack,
    Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { MdOutlineReportProblem } from 'react-icons/md';
import { useLoaderData } from 'react-router-dom';

import { getIdea } from '../../utils/IdeaUtils';
import CreateReport from './CreateReport';
import CreateReview from './CreateReview';
import Overview from './Overview';
import ReviewCard from './ReviewCard';
import classes from './ViewIdea.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
    return await getIdea(params.id);
}

const ViewIdea = () => {
    const ideaRef = useLoaderData();
    const idea = ideaRef.data();

    const [reviewsOpened, { open, close }] = useDisclosure(false);
    const [reportOpened, reportHandlers] = useDisclosure(false);

    const [isAddingReview, setIsAddingReview] = useState(false);

    const toggleView = () => {
        setIsAddingReview((prev) => !prev);
    };

    console.log(reportOpened);
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

                <Modal
                    // size="xl"
                    opened={reviewsOpened}
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

                <Modal
                    // size="xl"
                    opened={reportOpened}
                    onClose={reportHandlers.close}
                    title={
                        <Group>
                            <Text fw={700} c="pink">
                                Report {idea.title}
                            </Text>
                        </Group>
                    }
                >
                    <CreateReport/>
                </Modal>

                <Group justify="space-between">
                    <ActionIcon onClick={reportHandlers.open} variant="filled" size={36}>
                        <MdOutlineReportProblem stroke={1.5} />
                    </ActionIcon>

                    <Button onClick={open} variant="outline" w={'88%'}>
                        View Reviews
                    </Button>
                </Group>
            </Box>
        </Paper>
    );
};

export default ViewIdea;
