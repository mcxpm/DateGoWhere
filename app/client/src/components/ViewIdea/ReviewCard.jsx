import { Avatar, Badge, Group, Paper, Text } from '@mantine/core';
import { MdGrade } from 'react-icons/md';


const ReviewCard = ({reviewData}) => {
    return reviewData.map((item) => (
        <Paper key={item.name} p={'md'} m={'xs'} withBorder shadow="xl">
            <Group>
                <Avatar
                   src={item.avatar}
                   alt={item.name}
                   radius="xl"
                />
                <div>
                    <Text size="sm" fw={700}>
                        {item.name}
                    </Text>
                </div>
                <Badge
                    variant="outline"
                    size="md"
                    fw={700}
                    rightSection={<MdGrade color="gold" />}
                >
                    {item.rating}
                </Badge>
            </Group>
            <Text pl={54} pt="sm" size="sm">
                {item.review}
            </Text>
        </Paper>
    ));
};

export default ReviewCard;
