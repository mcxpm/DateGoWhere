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
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRef, useState } from 'react';
import { MdReportProblem, MdShare } from 'react-icons/md';
import { useLoaderData } from 'react-router-dom';

import { getIdea } from '../../utils/IdeaUtils';
import Map from '../Map';
import CreateReport from './CreateReport';
import CreateReview from './CreateReview';
import Overview from './Overview';
import ReviewCard from './ReviewCard';
import classes from './ViewIdea.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
    const idea = await getIdea(params.id);
    if (idea == null) {
        notifications.show({
            color: 'red',
            title: 'Error fetching idea',
            message: 'The idea you requested does not exist.',
            autoClose: 2000,
        });
        throw new Response('Not Found', { status: 404 });
    }
    return idea;
}

const ViewIdea = () => {
    const idea = useLoaderData();
    const clipboard = useClipboard({ timeout: 500 });

    const [reviewsOpened, { open, close }] = useDisclosure(false);
    const [reportOpened, reportHandlers] = useDisclosure(false);

    const [isAddingReview, setIsAddingReview] = useState(false);

    const toggleView = () => {
        setIsAddingReview((prev) => !prev);
    };

    const ref = useRef(null);

    return (
        <>
            <Paper p={'md'} m={'xs'} withBorder shadow="xl" className={classes.leftPanel}>
                <Stack gap={'sm'}>
                    <Overview idea={idea} />
                    <Divider />

                    <Accordion multiple variant="contained">
                        {idea.activities.map((activity) => (
                            <Accordion.Item key={activity.name} value={activity.name}>
                                <Accordion.Control>
                                    <Text size="sm" c={'dimmed'} fw={500}>
                                        {activity.start} - {activity.end}{' '}
                                    </Text>
                                    <Text>
                                        <Text component="span" fw={700}>
                                            {activity.name}
                                        </Text>
                                        &nbsp;@&nbsp;
                                        {activity.location.name}
                                    </Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    {/* <Text size="sm" fw={700} fs="italic">
                                        Author Description
                                    </Text> */}
                                    <Text size="sm">{activity.description}</Text>
                                    <Text size="sm" c={'dimmed'} fw={500} mt={'md'}>
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
                        title={<Overview idea={idea} />}
                        scrollAreaComponent={ScrollArea.Autosize}
                    >
                        <Stack>
                            <Button onClick={toggleView}>
                                {isAddingReview ? 'Return' : 'Add review'}
                            </Button>
                            <Divider />
                        </Stack>
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
                        <CreateReport />
                    </Modal>

                    <Group justify="space-between">
                        <ActionIcon
                            onClick={() => {
                                clipboard.copy(`${window.location.href}`);
                                notifications.show({
                                    color: 'green',
                                    title: 'Link copied to clipboard',
                                    autoClose: 2000,
                                });
                            }}
                            variant="outline"
                            color="gray"
                            size={'lg'}
                        >
                            <MdShare stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon
                            onClick={reportHandlers.open}
                            variant="outline"
                            color="gray"
                            size={'lg'}
                        >
                            <MdReportProblem stroke={1.5} />
                        </ActionIcon>
                        <Button onClick={open} variant="outline" style={{ flexGrow: 1 }}>
                            View Reviews
                        </Button>
                    </Group>
                </Box>
            </Paper>
            <Map activityList={idea.activities} ref={ref} isViewing />
        </>
    );
};

export default ViewIdea;
