import { Avatar, Button, Group, Paper, Rating, Text, Textarea } from '@mantine/core';

const UserData = [
    {
        name: 'Tan Shao Chong',
        avatar: 'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
];

const CreateReview = ({ handleAddActivity }) => {
    return UserData.map((item) => (
        <>
            <Paper key={item.name} p={'md'} m={'xs'} withBorder shadow="xl">
                <Group>
                    <Avatar src={item.avatar} alt={item.name} radius="xl" />
                    <div>
                        <Text size="sm" fw={700}>
                            {item.name}
                        </Text>
                        <Text size="xs" c={'dimmed'} fw={400}>
                            Posting publicly
                        </Text>
                    </div>
                </Group>
                <Group justify="center">

                    {/* to settle collecting value and storing ot firebase */}
                    <Rating defaultValue={5} size="lg" />
                </Group>
                <Textarea
                    label="Your Review"
                    variant="filled"
                    size="xs"
                    radius="xs"
                    placeholder="Share details of your own experience going on this date"
                    autosize
                    maxRows={5}
                    required
                />
            </Paper>
            <Group justify="flex-end">
                {/* To settle submit review to firebase */}
                <Button onClick={handleAddActivity} variant="outline">
                    Submit
                </Button>
            </Group>
        </>
    ));
};

export default CreateReview;
