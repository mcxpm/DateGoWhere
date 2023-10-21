import { Badge, Box, Group, Text } from '@mantine/core';
import { MdAccessTime, MdAttachMoney, MdGrade } from 'react-icons/md';


function Overview({
    overallBudget,
    formatTime,
    overallHours,
    overallMinutes
}) {
    return (
        <Group gap='xs'>
            <Box >
                <Text fw={700} c="pink">
                    Romantic night at Gardens By the Bay
                </Text>
            </Box>
            <Group gap='xs'>
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
