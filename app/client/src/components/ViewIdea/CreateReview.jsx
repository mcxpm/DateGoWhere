import { Avatar, Button, Group, Paper, Rating, Text, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';

import { auth } from '../../config/firebase';
import { createReview } from '../../utils/IdeaUtils';

const CreateReview = () => {
    const { id: ideaId } = useParams();
    const [user, loading] = useAuthState(auth);

    const form = useForm({
        initialValues: {
            rating: 2.5,
            description: '',
        },
        validate: {
            description: isNotEmpty('Please enter a description'),
        },
    });

    const handleAddReview = async (values) => {
        try {
            createReview(ideaId, values).then(() => {
                notifications.show({
                    color: 'green',
                    title: 'Success',
                    message: 'Review has been added successfully',
                    autoClose: 2000,
                });
            });
        } catch (e) {
            console.log('Error adding reviewing: ', e);
            notifications.show({
                color: 'red',
                title: 'Error adding review',
                message: 'Please try again',
                autoClose: 2000,
            });
        }
    };

    if (loading) {
        return <div className="">loading...</div>;
    }

    if (!user) {
        return <div className="">please sign in...</div>;
    }

    return (
        <form
            onSubmit={form.onSubmit(async (values) => {
                if (form.isValid) {
                    await handleAddReview(values);
                }
            })}
        >
            <Paper p={'md'} m={'xs'} withBorder shadow="xl">
                <Group>
                    <Avatar src={user.photoURL} alt={'avatar'} radius="xl">
                        {user.displayName[0]}
                    </Avatar>
                    <div>
                        <Text size="sm" fw={700}>
                            {user.displayName}
                        </Text>
                        <Text size="xs" c={'dimmed'} fw={400}>
                            Posting publicly
                        </Text>
                    </div>
                </Group>
                <Group justify="center">
                    {/* to settle collecting value and storing ot firebase */}
                    <Rating size="lg" {...form.getInputProps('rating')} />
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
                    {...form.getInputProps('description')}
                />
            </Paper>
            <Group justify="flex-end">
                {/* To settle submit review to firebase */}
                <Button type="submit" variant="outline">
                    Submit
                </Button>
            </Group>
        </form>
    );
};

export default CreateReview;
