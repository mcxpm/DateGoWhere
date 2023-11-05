import {
    Anchor,
    Box,
    Button,
    Center,
    Container,
    Group,
    Paper,
    rem,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FcLeft } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import { resetPassword } from '../utils/AuthUtils';

export function ForgotPassword() {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        },
    });

    return (
        <Container size={460} my={30}>
            <Title ta="center">Forgot your password?</Title>
            <Text c="dimmed" fz="sm" ta="center">
                Enter your email to get a reset link
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <TextInput
                    label="Your email"
                    placeholder="hello@mantine.dev"
                    value={form.values.email}
                    onChange={(event) => {
                        form.setFieldValue('email', event.currentTarget.value);
                    }}
                    error={form.errors.email && 'Invalid email'}
                    required
                />
                <Group justify="space-between" mt="lg">
                    <Anchor c="dimmed" size="sm">
                        <Center inline>
                            <FcLeft
                                style={{ width: rem(12), height: rem(12) }}
                                stroke={1.5}
                            />
                            <Box
                                ml={5}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                Back to the login page
                            </Box>
                        </Center>
                    </Anchor>
                    <Button onClick={async () => await resetPassword(form.values.email)}>
                        Reset password
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
}
