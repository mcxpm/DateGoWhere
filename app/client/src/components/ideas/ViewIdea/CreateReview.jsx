import {
    Avatar,
    Button,
    Group,
    Paper,
    Rating,
    Stack,
    Text,
    Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';

import { auth } from '../../../config/firebase';
import { createReview } from '../../../utils/ReviewUtils';

const CreateReview = () => {
    const { id: ideaId } = useParams();
    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            rating: 2.5,
            description: '',
        },
        validate: {
            description: (value) => {
                if (!value) {
                    return 'Please enter a description';
                }
                if (value.length > 250) {
                    return 'Too many characters';
                }
            },
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

    if (!user) {
        return (
            <Stack mt={'md'}>
                <Text fz={'sm'} ta={'center'}>
                    Sign in to leave a review
                </Text>
                <Button onClick={() => navigate('/auth')} variant="outline">
                    Sign In
                </Button>
            </Stack>
        );
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
                <Text ta={'right'} fz={'xs'} c="dimmed">
                    {form.values.description.length}/250
                </Text>
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
