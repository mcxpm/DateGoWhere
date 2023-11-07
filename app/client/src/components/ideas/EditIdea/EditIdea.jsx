import {
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    Group,
    MultiSelect,
    Paper,
    Stack,
    Switch,
    Text,
    TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRef } from 'react';
import { MdAdd, MdEdit, MdSave, MdUpload, MdVisibility } from 'react-icons/md';
import { redirect, useLoaderData, useNavigate, useParams } from 'react-router-dom';

import useIdea from '../../../hooks/use-idea';
import { getUser } from '../../../utils/AuthUtils';
import { getIdea } from '../../../utils/IdeaUtils';
import ActivityForm from '../CreateIdea/ActivityForm';
import classes from '../CreateIdea/CreateIdea.module.css';
import Map from '../Map';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
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
    const idea = await getIdea(params.id);
    if (idea == null) {
        notifications.show({
            color: 'red',
            title: 'Error fetching idea',
            message: 'The idea you requested does not exist.',
            autoClose: 2000,
        });
        throw new Response('Not Found', { status: 404 });
    }
    if (user.uid != idea.createdBy) {
        notifications.show({
            color: 'red',
            title: 'User not authorised',
            message: 'You do not have permissions to edit this idea.',
            autoClose: 2000,
        });
        return redirect(`/ideas/${params.id}/view`);
    }
    return idea;
}

const EditIdea = () => {
    const idea = useLoaderData();
    const { id } = useParams();
    const navigate = useNavigate();
    const ref = useRef(null);

    const {
        info,
        setInfo,
        activityList,
        isEditingList,
        handleAddActivity,
        handleSaveActivity,
        handleEditActivity,
        handleDiscardActivity,
        handleSubmit,
        handleSaveDraft,
    } = useIdea(idea, id);

    return (
        <>
            <Paper
                p={'md'}
                m={'xs'}
                withBorder
                shadow="xl"
                className={classes.leftPanel}
                style={{ overflow: 'hidden' }}
            >
                <Stack gap={'sm'} style={{ overflow: 'hidden' }}>
                    <Stack gap={'sm'} style={{ overflowY: 'auto' }}>
                        <TextInput
                            label="Give your date a name!"
                            placeholder="Date Name"
                            withAsterisk
                            value={info.title}
                            size="xs"
                            onChange={(e) =>
                                setInfo((prevInfo) => ({
                                    ...prevInfo,
                                    title: e.target.value,
                                }))
                            }
                        />
                        <TextInput
                            label="Description"
                            placeholder="Description"
                            value={info.description}
                            size="xs"
                            onChange={(e) =>
                                setInfo((prevInfo) => ({
                                    ...prevInfo,
                                    description: e.target.value,
                                }))
                            }
                        />
                        <TextInput
                            label="Thumbail Image URL"
                            placeholder="URL"
                            value={info.image}
                            size="xs"
                            onChange={(e) =>
                                setInfo((prevInfo) => ({
                                    ...prevInfo,
                                    image: e.target.value,
                                }))
                            }
                        />
                        <Flex align="flex-end" gap="xl">
                            <MultiSelect
                                variant="filled"
                                size="xs"
                                label="Date Tags"
                                placeholder="Pick Category"
                                data={[
                                    'Romantic',
                                    'Outdoor',
                                    'Food',
                                    'Sport',
                                    'Dance',
                                    'Cultural',
                                ]}
                                searchable
                                nothingFoundMessage="Nothing found..."
                                value={info.tags}
                                onChange={(values) =>
                                    setInfo((prevInfo) => ({ ...prevInfo, tags: values }))
                                }
                            />

                            <Switch
                                defaultChecked
                                py={6}
                                color="pink"
                                label="Make this date idea public"
                                size="xs"
                                checked={info.isPublic}
                                onChange={(e) =>
                                    setInfo((prevInfo) => ({
                                        ...prevInfo,
                                        isPublic: e.target.checked,
                                    }))
                                }
                            />
                        </Flex>

                        {activityList.map((activity, idx) => {
                            return !isEditingList[idx] ? (
                                <Paper key={idx} p="xs" shadow="none" withBorder>
                                    <Box className={classes.card}>
                                        <Box>
                                            <Text size="xs" c={'dimmed'} fw={500}>
                                                {activity.start} - {activity.end}{' '}
                                            </Text>
                                            <Text truncate="end">
                                                <Text component="span" fw={700}>
                                                    {activity.name}
                                                </Text>
                                                &nbsp;@&nbsp;
                                                {activity.location.name
                                                    ? activity.location.name
                                                    : activity.location.description}
                                            </Text>
                                        </Box>
                                        <MdEdit
                                            style={{ placeSelf: 'center' }}
                                            onClick={() => handleEditActivity(idx)}
                                            color="grey"
                                        />
                                    </Box>
                                </Paper>
                            ) : (
                                <ActivityForm
                                    key={idx}
                                    activity={activity}
                                    idx={idx}
                                    handleDiscardActivity={handleDiscardActivity}
                                    handleSaveActivity={handleSaveActivity}
                                />
                            );
                        })}
                    </Stack>
                    <Button
                        onClick={handleAddActivity}
                        fullWidth
                        variant="outline"
                        leftSection={<MdAdd />}
                    >
                        Add activity
                    </Button>
                </Stack>
                <Box>
                    <Divider my={'sm'} />
                    <Group justify="space-between">
                        <Badge
                            variant="dot"
                            color={idea.isPublished ? 'green' : 'orange'}
                        >
                            {idea.isPublished ? 'Published' : ' Draft'}
                        </Badge>
                        <Button
                            variant="outline"
                            color="gray"
                            onClick={() =>
                                ref?.current?.calculateAndDisplayRoute(activityList)
                            }
                        >
                            Get Route
                        </Button>
                        <Button
                            leftSection={<MdSave />}
                            variant="light"
                            onClick={handleSaveDraft}
                        >
                            Save
                        </Button>
                        {idea.isPublished ? (
                            <Button
                                leftSection={<MdVisibility />}
                                onClick={() => navigate(`/ideas/${id}/view`)}
                            >
                                View
                            </Button>
                        ) : (
                            <Button rightSection={<MdUpload />} onClick={handleSubmit}>
                                Save and publish
                            </Button>
                        )}
                    </Group>
                </Box>
            </Paper>
            <Map activityList={activityList} ref={ref} />
        </>
    );
};

export default EditIdea;
