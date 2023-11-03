import { Avatar, Badge, Group, Paper, Text } from '@mantine/core';
import { MdGrade } from 'react-icons/md';

const ReviewCard = ({ reviewData }) => {
    return reviewData.map((review) => (
        <Paper key={review.createdBy} p={'md'} m={'xs'} withBorder shadow="xl">
            <Group>
                <Avatar alt="avatar" radius="xl">
                    {review.createdBy[0]}
                </Avatar>
                <div>
                    <Text size="sm" fw={700}>
                        {review.createdBy}
                    </Text>
                </div>
                <Badge
                    variant="outline"
                    size="md"
                    fw={700}
                    rightSection={<MdGrade color="gold" />}
                >
                    {review.rating}
                </Badge>
            </Group>
            <Text pl={54} pt="sm" size="sm">
                {review.description}
            </Text>
        </Paper>
    ));
};

export default ReviewCard;
