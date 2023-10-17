import { ActionIcon, Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { AiOutlineHeart } from 'react-icons/ai';

import classes from './BrowsePage.module.css';
const Idea = ({ idea }) => {
    const features = idea.badges.map((badge) => (
        <Badge variant="light" key={badge.label + idea.title} leftSection={badge.emoji}>
            {badge.label}
        </Badge>
    ));

    return (
        <article>
            <Card withBorder radius="md" p="md" className={classes.card}>
                <Card.Section>
                    <Image src={idea.image} alt={idea.title} height={180} />
                </Card.Section>

                <Card.Section className={classes.section} mt="md">
                    <Group justify="apart">
                        <Text fz="lg" fw={500}>
                            {idea.title}
                        </Text>
                        <Badge size="sm" variant="light">
                            {idea.country}
                        </Badge>
                    </Group>
                    <Text fz="sm" mt="xs">
                        {idea.description}
                    </Text>
                </Card.Section>

                <Card.Section className={classes.section}>
                    <Text mt="md" className={classes.label} c="dimmed">
                        Perfect for you, if you enjoy
                    </Text>
                    <Group gap={7} mt={5}>
                        {features}
                    </Group>
                </Card.Section>

                <Group mt="xs">
                    <Button radius="md" style={{ flex: 1 }}>
                        Show details
                    </Button>
                    <ActionIcon variant="default" radius="md" size={36}>
                        <AiOutlineHeart className={classes.like} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Card>
        </article>
    );
};
export default Idea;
