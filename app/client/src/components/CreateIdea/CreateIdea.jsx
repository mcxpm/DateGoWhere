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
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRef } from 'react';
import { MdAdd, MdEdit, MdSave, MdUpload } from 'react-icons/md';
import { Form, redirect } from 'react-router-dom';

import { auth } from '../../config/firebase';
import useIdea from '../../hooks/use-idea';
import Map from '../Map';
import ActivityForm from './ActivityForm';
import classes from './CreateIdea.module.css';  

// eslint-disable-next-line react-refresh/only-export-components
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
    return null;
}

const CreateIdea = () => {
    const ref = useRef(null);

    const {
        title,
        activityList,
        isEditingList,
        handleAddActivity,
        handleSaveActivity,
        handleEditActivity,
        handleDiscardActivity,
        handleSubmit,
        handleSaveDraft,
    } = useIdea();

    const form = useForm({
        initialValues:{
            title : '',
            tags: [],
            isPublic :true,
        },
        validate:{
            title: (value) => (value ? null : 'Date must have a title'),
        }
    })

    return (
        <>
            {/* <Form method="post" action="/ideas/create"> */}
            <Paper p={'md'} m={'xs'} withBorder shadow="xl" className={classes.leftPanel}>
                <Stack gap={'sm'}>
                    <Form>
                        <TextInput
                            label="Give your date a name!"
                            placeholder="Date Name"
                            withAsterisk
                            value={title}
                            {...form.getInputProps('title')}
                        />
                        <Flex align="flex-end" gap="xl" >
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
                                {...form.getInputProps('tags')}
                            />

                            <Switch
                                defaultChecked
                                py={6}
                                color="pink"
                                label="Make this date idea public"
                              
                                size='xs'
                                {...form.getInputProps('isPublic')}
                            />
                        </Flex>
                       
                    </Form>
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
                    </Group>
                </Box>
            </Paper>
            {/* </Form> */}
            <Map activityList={activityList} ref={ref} />
        </>
    );
};

export default CreateIdea;
