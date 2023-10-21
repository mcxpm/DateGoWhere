import {
    Accordion,
    Box,
    Button,
    Divider,
    Modal,
    Paper,
    ScrollArea,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import CreateReview from './CreateReview';
import Overview from './Overview';
import ReviewCard from './ReviewCard';
import classes from './ViewIdea.module.css';

//used mockdata temporarily
const MockActivity = [
    {
        id: 1,
        start: '17:00',
        end: '18:00',
        activityTitle: 'Picnic',
        description:
            'Ad voluptate ex excepteur eu eiusmod officia magna reprehenderit nulla esse magna nisi.',
        location: 'East Coast Park',
        budget: '20',
    },
    {
        id: 2,
        start: '18:15',
        end: '20:00',
        activityTitle: 'Dinner',
        description:
            'Ad voluptate ex excepteur eu kwjfbsdZRIUfb;asdiufbpasouifbp[aserifn[aseifn[asoeifhn[eoasinf[weioasnf[eoasifn[aw]]]]]]] eiusmod officia magna reprehenderit nulla esse magna nisi.',
        location: 'Satay by the Bay',
        budget: '20',
    },

    {
        id: 3,
        start: '20:15',
        end: '22:00',
        activityTitle: 'Hangout',
        description:
            'Ad voluptate ex excepteur eu eiusmod officia magna reprehenderit nulla esse magna nisi.',
        location: 'Gardens By the Bay',
        budget: '0',
    },
];

const MockReviews = [
    {
        name: 'Tan Shao Chong',
        rating: '5',
        avatar: 'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
        review: 'Quis occaecat enim cillum labore consequat reprehenderit eu nostrud deserunt ut occaecat. Sint amet nostrud aliquip commodo. Aute eu elit elit reprehenderit. Sit voluptate id sint cillum amet sit irure exercitation enim et. Ut veniam pariatur dolor non et ipsum qui mollit nulla ut cupidatat dolore. Ea sint eu reprehenderit nisi magna anim officia dolore adipisicing sunt non. Aliqua minim mollit minim voluptate laboris id dolor dolor est aliqua commodo ad ipsum dolore.',
    },

    {
        name: 'Asher Tam',
        rating: '4',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        review: 'Quis occaecat enim cillum labore consequat reprehenderit eu nostrud deserunt ut occaecat. Sint amet nostrud aliquip commodo. Aute eu elit elit reprehenderit. Sit voluptate id sint cillum amet sit irure exercitation enim et. Ut veniam pariatur dolor non et ipsum qui mollit nulla ut cupidatat dolore. Ea sint eu reprehenderit nisi magna anim officia dolore adipisicing sunt non. Aliqua minim mollit minim voluptate laboris id dolor dolor est aliqua commodo ad ipsum dolore.',
    },

    {
        name: 'Markus Lim',
        rating: '5',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        review: 'Quis occaecat enim cillum labore consequat reprehenderit eu nostrud deserunt ut occaecat. Sint amet nostrud aliquip commodo. Aute eu elit elit reprehenderit. Sit voluptate id sint cillum amet sit irure exercitation enim et. Ut veniam pariatur dolor non et ipsum qui mollit nulla ut cupidatat dolore. Ea sint eu reprehenderit nisi magna anim officia dolore adipisicing sunt non. Aliqua minim mollit minim voluptate laboris id dolor dolor est aliqua commodo ad ipsum dolore.',
    },
];

// Overall Date data to be imported from database (title, rating, etc)

let overallBudget = 0;
MockActivity.forEach((activity) => {
    overallBudget += parseInt(activity.budget);
});

const convertToMinutes = (time) => {
    const [hour, minute] = time.split(':').map((t) => parseInt(t));
    return hour * 60 + minute;
};

// Calculate overall duration
const startTime = convertToMinutes(MockActivity[0].start); // Start time of first activity
const endTime = convertToMinutes(MockActivity[MockActivity.length - 1].end); // End time of last activity
const overallDuration = endTime - startTime;

// Convert overall duration back to hours and minutes
const overallHours = Math.floor(overallDuration / 60);
const overallMinutes = overallDuration % 60;

const formatTime = (hours, minutes) => {
    if (minutes === 0) {
        return `${hours} hrs`;
    } else {
        return `${hours} hrs and ${minutes} min`;
    }
};

const activities = MockActivity.map((activity) => (
    <Accordion.Item key={activity.start} value={activity.start}>
        <Accordion.Control>
            <Text size="xs" c={'dimmed'} fw={500}>
                {activity.start} - {activity.end}{' '}
            </Text>
            <Text truncate="end">
                <Text component="span" fw={700}>
                    {activity.activityTitle}
                </Text>
                &nbsp;@&nbsp;
                {activity.location}
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
));

const ViewIdea = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [isAddingReview, setIsAddingReview] = useState(false);

    const handleAddActivity =()=>{
        setIsAddingReview(!isAddingReview);
    }

    let actionButton;
    if (!isAddingReview) {
        actionButton = (
            <Button onClick={handleAddActivity}> Add review </Button>
        );
    } else {
        actionButton = <Button onClick={handleAddActivity}> Return </Button>;
    }

    let reviewPortion;
    if (!isAddingReview) {
        reviewPortion = <ReviewCard reviewData = {MockReviews} />;
    } else {
        reviewPortion = <CreateReview handleAddActivity = {handleAddActivity}/>;
    }
    console.log(isAddingReview)
    return (
        <SimpleGrid h={'100dvh'} cols={{ base: 1, sm: 2 }} spacing={0}>
            <Paper p={'md'} m={'xs'} withBorder shadow="xl" className={classes.leftPanel}>
                <Stack gap={'sm'}>
                    <Overview
                        overallBudget={overallBudget}
                        formatTime={formatTime}
                        overallHours={overallHours}
                        overallMinutes={overallMinutes}
                    />
                    <Divider />

                    <Accordion multiple variant="contained">
                        {activities}
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
                                    <Overview
                                        overallBudget={overallBudget}
                                        formatTime={formatTime}
                                        overallHours={overallHours}
                                        overallMinutes={overallMinutes}
                                    />

                                    {actionButton}
                                    <Divider />
                                </Stack>
                            }
                            scrollAreaComponent={ScrollArea.Autosize}
                        >
                            {reviewPortion}
                        </Modal>

                        <Button onClick={open} fullWidth variant="outline">
                            {' '}
                            View Reviews
                        </Button>
                    </>
                </Box>
            </Paper>
        </SimpleGrid>
    );
};

export default ViewIdea;
