import { Button, Code, Container, Group, Table, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { redirect, useLoaderData, useRevalidator } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getUser } from '../../utils/AuthUtils';
import { deleteIdea, getUserIdeas } from '../../utils/IdeaUtils';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }) => {
    const user = await getUser();
    if (user == null) {
        notifications.show({
            color: 'red',
            title: 'User not authenticated',
            message: 'Please sign in.',
            autoClose: 2000,
        });
        return redirect('/auth');
    }
    if (user.uid != params.id) {
        notifications.show({
            color: 'yellow',
            title: 'TODO',
            message: 'handle user accessing another user profile',
            autoClose: 2000,
        });
    }
    const ideas = await getUserIdeas(params.id);
    return ideas;
};

const ViewIdeas = () => {
    const ideas = useLoaderData();
    const navigate = useNavigate();
    const revalidator = useRevalidator();

    const openDeleteModal = (id) =>
        modals.openConfirmModal({
            title: 'Delete idea',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete idea: <Code>{id}</Code>? You cannot
                    undo this action.
                </Text>
            ),
            labels: { confirm: 'Delete idea', cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onCancel: () => {},
            onConfirm: () =>
                deleteIdea(id).then(() => {
                    notifications.show({
                        color: 'Green',
                        title: 'Deletion success',
                        message: `Your date idea has been deleted successfully`,
                        autoClose: 2000,
                    });
                    revalidator.revalidate();
                }),
        });

    return (
        <Container py={'lg'}>
            <Table.ScrollContainer>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Date Title</Table.Th>

                            <Table.Th>Published?</Table.Th>
                            <Table.Th>Public?</Table.Th>
                            <Table.Th>Likes</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {ideas.map((idea) => {
                            return (
                                <Table.Tr
                                    key={idea.id}
                                    bg={idea.isPublished ? 'white' : 'gray.0'}
                                >
                                    <Table.Td style={{ fontWeight: 'bold' }}>
                                        {idea.title}
                                    </Table.Td>

                                    <Table.Td>{idea.isPublished.toString()}</Table.Td>

                                    <Table.Td>{idea.isPublic.toString()}</Table.Td>

                                    <Table.Td>0</Table.Td>
                                    <Table.Td>
                                        <Group>
                                            <Button
                                                size="xs"
                                                variant="outline"
                                                onClick={() =>
                                                    navigate(`/ideas/${idea.id}/view`)
                                                }
                                            >
                                                View
                                            </Button>
                                            <Button
                                                size="xs"
                                                variant="outline"
                                                onClick={() =>
                                                    navigate(`/ideas/${idea.id}/edit`)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="xs"
                                                variant="outline"
                                                color="gray"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(
                                                        window.location.origin +
                                                            `/ideas/${idea.id}/view`,
                                                    );
                                                    notifications.show({
                                                        color: 'green',
                                                        title: 'Link copied to clipboard',
                                                        autoClose: 2000,
                                                    });
                                                }}
                                            >
                                                Share
                                            </Button>
                                            <Button
                                                size="xs"
                                                variant="filled"
                                                color="red"
                                                onClick={() => openDeleteModal(idea.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            );
                        })}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
};
export default ViewIdeas;
