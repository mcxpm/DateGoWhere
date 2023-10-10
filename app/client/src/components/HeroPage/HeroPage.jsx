import { Button, Container, Group, Text } from '@mantine/core';

import classes from './HeroPage.module.css';

export default function HeroPage() {
    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    A{' '}
                    <Text
                        component="span"
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan' }}
                        inherit
                    >
                        fully featured
                    </Text>{' '}
                    React components and hooks library
                </h1>

                <Text className={classes.description} color="dimmed">
                    Build fully functional accessible web applications with ease – Mantine
                    includes more than 100 customizable components and hooks to cover you
                    in any situation
                </Text>

                <Group className={classes.controls}>
                    <Button
                        size="xl"
                        className={classes.control}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan' }}
                    >
                        Get started
                    </Button>
                </Group>
            </Container>
        </div>
    );
}
