import {
    Box,
    Button,
    Divider,
    Group,
    Paper,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { doc, updateDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { MdAdd, MdEdit, MdSave, MdUpload } from 'react-icons/md';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { db } from '../../config/firebase';
import { createIdea, updateIdea } from '../../utils/IdeaUtils';
import Map from '../Map';
import ActivityForm from './ActivityForm';
import classes from './CreateIdea.module.css';

export async function loader() {
    console.log('create');
    return await createIdea();
}

const CreateIdea = () => {
    const newIdeaRef = useLoaderData();
    const navigate = useNavigate();

    const ref = useRef(null);

    const emptyActivity = {
        start: '',
        end: '',
        name: '',
        location: {
            name: '',
            description: '',
            latLng: null,
        },
        description: '',
        budget: '',
        tags: [],
    };

    const [title, setTitle] = useState('');
    const [activityList, setActivityList] = useState([]);

    const [isEditingList, setIsEditingList] = useState([]);

    const handleSaveActivity = (idx) => {
        const id = idx == -1 ? activityList.length - 1 : idx;
        setIsEditingList((prev) => {
            const newIsEditingList = [...prev];
            newIsEditingList[id] = false;
            return newIsEditingList;
        });
    };

    const handleDiscardActivity = (idx) => {
        const id = idx == -1 ? activityList.length - 1 : idx;
        setActivityList((prev) => {
            const newActivityList = [...prev];
            newActivityList.splice(id);
            return newActivityList;
        });
    };

    const handleAddActivity = () => {
        setActivityList((prev) => [...prev, emptyActivity]);
        setIsEditingList((prev) => [...prev, true]);
    };

    const handleEditActivity = (idx) => {
        setIsEditingList((prev) => {
            const newIsEditingList = [...prev];
            newIsEditingList[idx] = !newIsEditingList[idx];

            return newIsEditingList;
        });
    };

    const handleChangeActivity = (key, idx, value) => {
        const id = idx == -1 ? activityList.length - 1 : idx;
        setActivityList((prev) => {
            const newActivityList = [...prev];
            if (key == 'location') {
                newActivityList[id][key] = {
                    ...newActivityList[id][key],
                    ...value,
                };
            } else {
                newActivityList[id][key] = value;
            }
            return newActivityList;
        });
    };

    const handleSubmit = async () => {
        console.log('submit', newIdeaRef.id);
        if (activityList.length == 0) {
            return notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Dates must have at least one activity',
                autoClose: 2000,
            });
        }
        if (title == '') {
            return notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Dates must have a name',
                autoClose: 2000,
            });
        }
        try {
            updateIdea(newIdeaRef, {
                title: title,
                activities: activityList.map((obj) => {
                    return Object.assign({}, obj);
                }),
            }).then(() => {
                console.log('hadsads');
                navigate('/ideas/view/' + newIdeaRef.id, { replace: true });
            });
        } catch (e) {
            console.log('Error creating idea: ', e);
        }
    };

    const testAddReview = async () => {
        const docRef = doc(db, 'ideas', 'finaltest_1697688212402'); //replace the last one with the documentID

        const dataToUpdate = {
            review: {
                createdAt: new Date(),
                createdBy: 'createdBy user',
                description: 'review description',
                rating: 5,
                title: 'review test',
            },
        };

        // Call updateDoc to update the document with the new data
        try {
            await updateDoc(docRef, dataToUpdate);
            console.log('Document successfully updated');
        } catch (e) {
            console.error('Error updating document: ', e);
        }
    };

    return (
        <>
            {/* <Form method="post" action="/ideas/create"> */}
            <Paper p={'md'} m={'xs'} withBorder shadow="xl" className={classes.leftPanel}>
                <Stack gap={'sm'}>
                    <TextInput
                        label="Give your date a name!"
                        placeholder="Date Name"
                        withAsterisk
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Divider />
                    {activityList.map((activity, idx) => {
                        return !isEditingList[idx] ? (
                            <Paper key={idx} p="xs" shadow="none">
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
                                handleChangeActivity={handleChangeActivity}
                                handleDiscardActivity={handleDiscardActivity}
                                handleSaveActivity={handleSaveActivity}
                            />
                        );
                    })}
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
                        <Button variant="light" leftSection={<MdSave />}>
                            Save Draft
                        </Button>
                        <Button
                            variant="outline"
                            color="green"
                            onClick={() =>
                                ref?.current?.calculateAndDisplayRoute(activityList)
                            }
                        >
                            Get Route
                        </Button>
                        <Button rightSection={<MdUpload />} onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button onClick={testAddReview}>AddReview</Button>
                    </Group>
                </Box>
            </Paper>
            {/* </Form> */}
            <Map activityList={activityList} ref={ref} />
        </>
    );
};

export default CreateIdea;
