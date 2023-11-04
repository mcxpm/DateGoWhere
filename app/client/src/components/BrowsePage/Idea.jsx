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
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Idea = ({ idea }) => {
    const navigate = useNavigate();

    return (
        <Card withBorder>
            <Card.Section bg={'gray.1'}>
                {idea.thumbnail ? (
                    <Image src={idea.thumbnail} alt={idea.title} h={'10rem'} />
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
                        navigate(`/ideas/view/${idea.id}`);
                    }}
                >
                    Show details
                </Button>
                <ActionIcon variant="default" size="lg">
                    <MdOutlineFavoriteBorder color="red" />
                </ActionIcon>
            </Group>
        </Card>
    );
};
export default Idea;
