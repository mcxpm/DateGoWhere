import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateIdea } from '../utils/IdeaUtils';

const useIdea = (newIdeaRef) => {
    const navigate = useNavigate();

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

    const handleSaveActivity = (idx, values) => {
        console.log('Adding activity: ', values);
        const id = idx == -1 ? activityList.length - 1 : idx;
        setActivityList((prev) => {
            const newActivityList = [...prev];
            newActivityList[id] = values;
            return newActivityList;
        });
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
            newActivityList.splice(id, 1);
            return newActivityList;
        });
    };

    const handleSaveDraft = async () => {
        console.log('Saving Idea Draft', newIdeaRef.id);
        if (activityList.length == 0) {
            notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Dates must have at least one activity',
                autoClose: 2000,
            });
            return;
        }
        if (title == '') {
            notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Dates must have a name',
                autoClose: 2000,
            });
            return;
        }
        try {
            updateIdea(newIdeaRef, {
                title: title,
                activities: activityList.map((obj) => {
                    return Object.assign({}, obj);
                }),
            });
            notifications.show({
                color: 'green',
                title: 'Success',
                message: 'Draft has been saved successfully',
                autoClose: 2000,
            });
        } catch (e) {
            console.log('Error saving idea: ', e);
        }
    };

    const handleSubmit = async () => {
        console.log('Submitting Idea', newIdeaRef.id);
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
                isPublished: true,
            }).then(() => {
                notifications.show({
                    color: 'green',
                    title: 'Success',
                    message: 'Your date idea has been published successfully',
                    autoClose: 2000,
                });
                navigate('/ideas/view/' + newIdeaRef.id, { replace: true });
            });
        } catch (e) {
            console.log('Error submitting idea: ', e);
        }
    };

    return {
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
    };
};

export default useIdea;
