import {
    ActionIcon,
    Badge,
    Button,
    Card,
    Center,
    Group,
    Image,
    Text,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { MdShare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Idea = ({ idea }) => {
    const navigate = useNavigate();
    const clipboard = useClipboard({ timeout: 500 });

    return (
        <Card withBorder>
            <Card.Section bg={'gray.1'}>
                {idea.image ? (
                    <Image src={idea.image} alt={idea.title} h={'10rem'} />
                ) : (
                    <Center h={'10rem'} px={'lg'}>
                        <Text
                            fz={'lg'}
                            fw={'bold'}
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'red', deg: 45 }}
                        >
                            {idea.title}
                        </Text>
                    </Center>
                )}
            </Card.Section>

            <Text fz="lg" fw={500} mt="xs">
                {idea.title}
            </Text>
            <Text fz="sm" mt="xs">
                {idea.description || '-'}
            </Text>

            <Group gap={'sm'} mt="xs">
                <Text fz="sm" c={'dimmed'}>
                    Tags:
                </Text>
                {idea.tags && idea.tags.length ? (
                    idea.tags.map((tag) => (
                        <Badge variant="light" key={idea.id + tag}>
                            {tag}
                        </Badge>
                    ))
                ) : (
                    <Badge variant="light" color="gray">
                        none
                    </Badge>
                )}
            </Group>

            <Group mt="xs">
                <Button
                    style={{ flex: 1 }}
                    onClick={() => {
                        navigate(`/ideas/${idea.id}/view`);
                    }}
                >
                    Show details
                </Button>
                <ActionIcon
                    variant="default"
                    size="lg"
                    onClick={() => {
                        clipboard.copy(`${window.location.origin}/ideas/${idea.id}/view`);
                        notifications.show({
                            color: 'green',
                            title: 'Link copied to clipboard',
                            autoClose: 2000,
                        });
                    }}
                >
                    <MdShare />
                </ActionIcon>
            </Group>
        </Card>
    );
};
export default Idea;
