import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createIdea, getIdeaRefFromId, updateIdea } from '../utils/IdeaUtils';

const useIdea = (idea, id) => {
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
    };

    const [ideaRef, setIdeaRef] = useState(null);
    const [info, setInfo] = useState(
        idea
            ? {
                  title: idea.title,
                  description: idea.description,
                  image: idea.image,
                  isPublic: idea.isPublic,
                  isPublished: idea.isPublished,
                  tags: idea.tags,
              }
            : {
                  title: '',
                  description: '',
                  image: '',
                  isPublic: true,
                  isPublished: false,
                  tags: [],
              },
    );
    const [activityList, setActivityList] = useState(idea ? idea.activities : []);
    const [isEditingList, setIsEditingList] = useState(
        idea ? new Array(idea.activities.length).fill(false) : [],
    );

    const getIdeaRef = async () => {
        if (ideaRef) {
            return ideaRef;
        }
        if (id) {
            const newIdeaRef = await getIdeaRefFromId(id);
            setIdeaRef(newIdeaRef);
            return newIdeaRef;
        }
        const newIdeaRef = await createIdea();
        setIdeaRef(newIdeaRef);
        return newIdeaRef;
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
        const newIdeaRef = await getIdeaRef();
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
        if (info.title == '') {
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
                ...info,
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
            console.log('Error saving draft: ', e);
            notifications.show({
                color: 'red',
                title: 'Error saving draft',
                message: 'Please try again',
                autoClose: 2000,
            });
        }
    };

    const handleSubmit = async () => {
        const newIdeaRef = await getIdeaRef();
        console.log('Submitting Idea', newIdeaRef.id);
        if (activityList.length == 0) {
            return notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Dates must have at least one activity',
                autoClose: 2000,
            });
        }
        if (info.title == '') {
            return notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Dates must have a name',
                autoClose: 2000,
            });
        }
        try {
            updateIdea(newIdeaRef, {
                ...info,
                activities: activityList.map((obj) => {
                    return Object.assign({}, obj);
                }),
                isPublished: true,
            }).then(() => {
                notifications.show({
                    color: 'green',
                    title: 'Success',
                    message: `Your date idea has been ${
                        idea ? 'updated' : 'published'
                    } successfully`,
                    autoClose: 2000,
                });
                navigate(`/ideas/${newIdeaRef.id}/view`, { replace: true });
            });
        } catch (e) {
            console.log('Error submitting idea: ', e);
            notifications.show({
                color: 'red',
                title: `Error ${idea ? 'updating' : 'publishing'} date idea`,
                message: 'Please try again',
                autoClose: 2000,
            });
        }
    };

    return {
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
    };
};

export default useIdea;
