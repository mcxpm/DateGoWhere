import { ActionIcon, Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import classes from './BrowsePage.module.css';
const Idea = ({ idea }) => {
    const navigate = useNavigate();

    return (
        <article>
            {idea?.activities?.length && (
                <Card withBorder radius="md" p="md" className={classes.card}>
                    <Card.Section>
                        <Image
                            src={idea.activities[0].location.image}
                            alt={idea.title}
                            height={180}
                        />
                    </Card.Section>

                    <Card.Section className={classes.section} mt="md">
                        <Group justify="apart">
                            <Text fz="lg" fw={500}>
                                {idea.title}
                            </Text>
                            {/* <Badge size="sm" variant="light">
                            {idea.country}
                        </Badge> */}
                        </Group>
                        <Text fz="sm" mt="xs">
                            {idea.activities[0].description}
                        </Text>
                    </Card.Section>

                    <Card.Section className={classes.section}>
                        <Text mt="md" className={classes.label} c="dimmed">
                            Perfect for you, if you enjoy
                        </Text>
                        <Group gap={7} mt={5}>
                            {idea.tags?.map((tag) => (
                                <Badge variant="light" key={idea.id + tag}>
                                    {tag}
                                </Badge>
                            ))}
                        </Group>
                    </Card.Section>

                    <Group mt="xs">
                        <Button
                            radius="md"
                            style={{ flex: 1 }}
                            onClick={() => {
                                navigate(`/ideas/view/${idea.id}`);
                            }}
                        >
                            Show details
                        </Button>
                        <ActionIcon variant="default" radius="md" size={36}>
                            <AiOutlineHeart className={classes.like} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Card>
            )}
        </article>
    );
};
export default Idea;
