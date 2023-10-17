import { Button, Group, Paper, Text, TextInput } from '@mantine/core';
import { useState } from 'react';

import AddActivityForm from './AddActivityForm';
import classes from './CreateIdea.module.css';
import EditActivityForm from './EditActivityForm';

const CreateIdea = () => {
    const [activity, setActivity] = useState({
        start: '',
        end: '',
        name: '',
        location: '',
        description: '',
        budget: '',
        tags: [],
    });
    const emptyActivity = {
        start: '',
        end: '',
        name: '',
        location: '',
        description: '',
        budget: '',
        tags: [],
    };

    const [activityList, setActivityList] = useState([]);
    const [isAddingActivity, setIsAddingActivity] = useState(false);

    const [editShownList, setEditShownList] = useState([]);

    const handleSaveActivity = () => {
        setActivityList(() => [...activityList, activity]);
        setEditShownList(() => [...editShownList, false]);
        setIsAddingActivity(false);
        setActivity(emptyActivity);
    };

    const handleDiscard = () => {
        setActivity(emptyActivity);
        setIsAddingActivity(false);
    };

    const handleAddActivity = () => {
        setIsAddingActivity(true);
    };

    const handleEdit = (idx) => {
        const updatedEditShownList = [...editShownList];
        updatedEditShownList[idx] = !updatedEditShownList[idx];
        setEditShownList(updatedEditShownList);
    };

    const updateActivity = (key, idx, value) => {
        const updatedActivityList = [...activityList];
        updatedActivityList[idx][key] = value;
        setActivityList(updatedActivityList);
    };

    return (
        <Paper shadow="md" radius="lg" h={'100dvh'}>
            <div className={classes.wrapper}>
                <div className={classes.contacts}>
                    <div>
                        <TextInput
                            label="Date Plan Name"
                            placeholder="Date Title"
                            mb={25}
                        />
                        <Text fw={500}>Date Activities</Text>
                        {activityList.map((activity, idx) => (
                            <EditActivityForm
                                key={idx}
                                activity={activity}
                                idx={idx}
                                editShownList={editShownList}
                                handleEdit={handleEdit}
                                updateActivity={updateActivity}
                                activityList={activityList}
                                classes={classes}
                                handleDiscard={handleDiscard}
                            />
                        ))}
                    </div>
                    <div>
                        {isAddingActivity && (
                            <AddActivityForm
                                activity={activity}
                                setActivity={setActivity}
                                handleDiscard={handleDiscard}
                                handleSaveActivity={handleSaveActivity}
                            />
                        )}

                        <Group justify="space-between" mt="md">
                            <Button
                                type="submit"
                                size="xs"
                                color="rgba(255, 77, 77, 0.7)"
                            >
                                Save Draft
                            </Button>
                            <Button onClick={handleAddActivity} size="xs">
                                Add activity
                            </Button>
                            <Button type="submit" size="xs">
                                Submit
                            </Button>
                        </Group>
                    </div>
                </div>
                <div>Insert Google Maps HERE</div>
            </div>
        </Paper>
    );
};

export default CreateIdea;
