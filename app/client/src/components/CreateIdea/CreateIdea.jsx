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
import { useRef } from 'react';
import { MdAdd, MdEdit, MdSave, MdUpload } from 'react-icons/md';
import { redirect, useLoaderData } from 'react-router-dom';

import { auth, db } from '../../config/firebase';
import useIdea from '../../hooks/use-idea';
import { createIdea } from '../../utils/IdeaUtils';
import Map from '../Map';
import ActivityForm from './ActivityForm';
import classes from './CreateIdea.module.css';

export async function loader() {
    if (auth.currentUser == null) {
        notifications.show({
            color: 'red',
            title: 'User not authenticated',
            message: 'Please sign in.',
            autoClose: 2000,
        });
        return redirect('/auth');
    }
    console.log('create');
    return await createIdea();
}

const CreateIdea = () => {
    const newIdeaRef = useLoaderData();

    const ref = useRef(null);

    const {
        title,
        setTitle,
        activityList,
        isEditingList,
        handleAddActivity,
        handleSaveActivity,
        handleEditActivity,
        handleDiscardActivity,
        handleSubmit,
        handleSaveDraft,
    } = useIdea(newIdeaRef);

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
