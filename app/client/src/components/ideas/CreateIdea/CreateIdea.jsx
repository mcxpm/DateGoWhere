import {
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
import { MdAdd, MdEdit, MdSave, MdUpload } from 'react-icons/md';
import { redirect } from 'react-router-dom';

import useIdea from '../../../hooks/use-idea';
import { getUser } from '../../../utils/AuthUtils';
import Map from '../Map';
import ActivityForm from './ActivityForm';
import classes from './CreateIdea.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
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
    return null;
}

const CreateIdea = () => {
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
    } = useIdea();

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
                        <Button
                            variant="light"
                            leftSection={<MdSave />}
                            onClick={handleSaveDraft}
                        >
                            Save Draft
                        </Button>
                        <Button
                            variant="outline"
                            color="gray"
                            onClick={() =>
                                ref?.current?.calculateAndDisplayRoute(activityList)
                            }
                        >
                            Get Route
                        </Button>
                        <Button rightSection={<MdUpload />} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Group>
                </Box>
            </Paper>
            <Map activityList={activityList} ref={ref} />
        </>
    );
};

export default CreateIdea;
