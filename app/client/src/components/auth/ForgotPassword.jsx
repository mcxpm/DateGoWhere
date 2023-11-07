import {
    Alert,
    Box,
    Button,
    Container,
    Group,
    Paper,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { auth } from '../../config/firebase';

export function ForgotPassword() {
    const [sendPasswordResetEmail, loading, error] = useSendPasswordResetEmail(auth);

    const form = useForm({
        initialValues: {
            email: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        },
    });

    return (
        <Container size="xs" px="xs" h={'100dvh'}>
            <Box h={'100%'} style={{ display: 'grid', placeItems: 'center' }}>
                <Box>
                    <Title ta="center">Forgot your password?</Title>
                    <Text c="dimmed" fz="sm" ta="center" mt={'sm'}>
                        Enter your email to get a reset link
                    </Text>
                    {error && (
                        <Alert
                            title="Error resetting password"
                            variant="light"
                            color="red"
                        >
                            Apologies, an error occured. Please try again
                        </Alert>
                    )}
                    <Paper withBorder p={30} radius="md" mt="xl">
                        <form
                            onSubmit={form.onSubmit(({ email }) => {
                                if (form.isValid) {
                                    console.log('submit');
                                    sendPasswordResetEmail(email).then((success) => {
                                        if (success) {
                                            notifications.show({
                                                color: 'green',
                                                title: 'Success',
                                                message:
                                                    'Password reset email has been sent',
                                                autoClose: 2000,
                                            });
                                        }
                                    });
                                }
                            })}
                        >
                            <TextInput
                                label="Your email"
                                placeholder="hello@mantine.dev"
                                value={form.values.email}
                                onChange={(event) => {
                                    form.setFieldValue(
                                        'email',
                                        event.currentTarget.value,
                                    );
                                }}
                                error={form.errors.email && 'Invalid email'}
                                required
                            />
                            <Group justify="space-between" mt="lg">
                                <Link
                                    to={-1}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'nowrap',
                                        gap: '2px',
                                    }}
                                >
                                    <MdArrowBack />
                                    <Text fz={'sm'} c={'dimmed'}>
                                        Back to the login page
                                    </Text>
                                </Link>
                                <Button type="submit" loading={loading}>
                                    Reset password
                                </Button>
                            </Group>
                        </form>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
}
