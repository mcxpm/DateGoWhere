import {
    Anchor,
    Box,
    Button,
    Divider,
    Group,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { useEffect } from 'react';
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../config/firebase';
import GoogleButton from './GoogleButton';

const AuthenticationForm = (props) => {
    const [user] = useAuthState(auth);

    const [type, toggle] = useToggle(['login', 'register']);

    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) =>
                val.length <= 6 ? 'Password should include at least 6 characters' : null,
        },
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user]);

    return (
        <Container size="xs" px="xs" h={'100dvh'}>
            <Box h={'100%'} style={{ display: 'grid', placeItems: 'center' }}>
                <Paper radius="md" p="xl" withBorder {...props}>
                    <Text size="lg" weight={500}>
                        {upperFirst(type)} with
                    </Text>

                    <Group grow mb="md" mt="md">
                        <GoogleButton
                            radius="xl"
                            onClick={() => {
                                signInWithGoogle();
                            }}
                        >
                            Google
                        </GoogleButton>
                    </Group>

                    <Divider
                        label="Or continue with email"
                        labelPosition="center"
                        my="lg"
                    />

                    <form
                        onSubmit={form.onSubmit(() => {
                            if (type === 'login') {
                                signInWithEmailAndPassword(
                                    form.values.email,
                                    form.values.password,
                                );
                            } else {
                                createUserWithEmailAndPassword(
                                    form.values.email,
                                    form.values.password,
                                );
                            }
                        })}
                    >
                        <Stack>
                            <TextInput
                                required
                                label="Email"
                                placeholder="hello@mantine.dev"
                                value={form.values.email}
                                onChange={(event) =>
                                    form.setFieldValue('email', event.currentTarget.value)
                                }
                                error={form.errors.email && 'Invalid email'}
                                radius="md"
                            />

                            <PasswordInput
                                required
                                label="Password"
                                placeholder="Your password"
                                value={form.values.password}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        'password',
                                        event.currentTarget.value,
                                    )
                                }
                                error={
                                    form.errors.password &&
                                    'Password should include at least 6 characters'
                                }
                                radius="md"
                            />
                        </Stack>

                        <Group justify="space-between" mt="xl">
                            <Anchor
                                component="button"
                                type="button"
                                color="dimmed"
                                onClick={() => toggle()}
                                size="xs"
                            >
                                {type === 'register'
                                    ? 'Already have an account? Login'
                                    : "Don't have an account? Register"}
                            </Anchor>
                            <Button type="submit" radius="md">
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default AuthenticationForm;
