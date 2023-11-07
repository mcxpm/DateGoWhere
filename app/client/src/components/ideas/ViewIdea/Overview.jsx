import { Badge, Box, Group, Text } from '@mantine/core';
import { MdAccessTime, MdAttachMoney, MdGrade } from 'react-icons/md';

const convertToMinutes = (time) => {
    const [hour, minute] = time.split(':').map((t) => parseInt(t));
    return hour * 60 + minute;
};

function Overview({ idea }) {
    let overallBudget = 0;
    idea.activities.forEach((activity) => {
        overallBudget += parseInt(activity.budget);
    });

    // Calculate overall duration
    const startTime = convertToMinutes(idea.activities[0].start); // Start time of first activity
    const endTime = convertToMinutes(idea.activities[idea.activities.length - 1].end); // End time of last activity
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

    return (
        <Group gap="xs">
            <Box>
                <Text fw={700} c="pink">
                    {idea.title}
                </Text>
            </Box>
            <Group gap="xs">
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
        </Group>
    );
}

export default Overview;
