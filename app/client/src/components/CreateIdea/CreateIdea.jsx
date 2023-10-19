import {
    Box,
    Button,
    Divider,
    Group,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import {
    collection,
    doc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { useRef, useState } from 'react';
import { MdAdd, MdEdit, MdSave, MdUpload } from 'react-icons/md';

import { db } from '../../config/firebase';
import Map from '../Map';
import ActivityForm from './ActivityForm';
import classes from './CreateIdea.module.css';

const CreateIdea = () => {
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

    const [docRef, setDocRef] = useState(null);

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
        const newIdea = {
            title: title,
            activities: activityList,
        };
        try {
            const docId = title + '_' + Date.now();
            const docRef = doc(collection(db, 'ideas'), docId);
            await setDoc(docRef, newIdea);
            setDocRef(docRef);
            console.log('Added idea w id: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
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
        <SimpleGrid h={'100dvh'} cols={{ base: 1, sm: 2 }} spacing={0}>
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
                        <Button rightSection={<MdUpload />} onClick={handleSubmit}>Submit</Button>
                        <Button onClick={testAddReview}>AddReview</Button>
                    </Group>
                </Box>
            </Paper>
            <Map activityList={activityList} ref={ref} />
        </SimpleGrid>
    );
};

export default CreateIdea;
