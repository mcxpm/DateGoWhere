import {
    Accordion,
    Badge,
    Box,
    Button,
    Divider,
    Group,
    Paper,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core';
import { MdAccessTime, MdAttachMoney, MdGrade, MdReviews } from 'react-icons/md';

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
    return (
        <SimpleGrid h={'100dvh'} cols={{ base: 1, sm: 2 }} spacing={0}>
            <Paper p={'md'} m={'xs'} withBorder shadow="xl" className={classes.leftPanel}>
                <Stack gap={'sm'}>
                    <Box className={classes.title}>
                        <Text fw={700} c="pink">
                            Romantic night at Gardens By the Bay
                        </Text>
                    </Box>
                    <Group>
                        <Box>
                            <Badge
                                variant="outline"
                                size="md"
                                fw={700}
                                leftSection={<MdAttachMoney />}
                            >
                                Budget: ${overallBudget}
                            </Badge>
                        </Box>

                        <Box>
                            <Badge
                                variant="outline"
                                size="md"
                                fw={700}
                                leftSection={<MdAccessTime />}
                            >
                                Duration: {formatTime(overallHours, overallMinutes)}
                            </Badge>
                            <Text size="sm" c={'dimmed'} fw={500}></Text>
                        </Box>
                        <Badge
                            variant="outline"
                            size="md"
                            fw={700}
                            rightSection={<MdGrade color="gold" />}
                        >
                            5
                        </Badge>
                    </Group>
                    <Divider />

                    <Accordion multiple variant="contained">
                        {activities}
                    </Accordion>
                </Stack>

                <Box>
                    <Divider my={'sm'} />
                    <Group justify="center">
                        <Button fullWidth variant="outline" rightSection={<MdReviews />}>
                            Add Review
                        </Button>
                    </Group>
                </Box>
            </Paper>
        </SimpleGrid>
    );
};

export default ViewIdea;
