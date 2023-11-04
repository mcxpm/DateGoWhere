import { Button, Group, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';

import { createReport } from '../../utils/IdeaUtils';

const CreateReport = () => {
    const { id: ideaId } = useParams();
    const { user, loading } = useAuthState();

    const form = useForm({
        initialValues: {
            reason: '',
        },
        validate: {
            reason: isNotEmpty('Please enter a reason'),
        },
    });

    const handleAddReport = async (values) => {
        try {
            createReport(ideaId, values).then(() => {
                notifications.show({
                    color: 'green',
                    title: 'Success',
                    message: 'Report has been added successfully',
                    autoClose: 2000,
                });
            });
        } catch (e) {
            console.log('Error adding report: ', e);
            notifications.show({
                color: 'red',
                title: 'Error adding report',
                message: 'Please try again',
                autoClose: 2000,
            });
        }
    };

    if (loading) {
        return <div className="">loading...</div>;
    }

    if (!user) {
        return <div className="">please sign in...</div>;
    }

    return (
        <form
            onSubmit={form.onSubmit(async (values) => {
                if (form.isValid) {
                    await handleAddReport(values);
                }
            })}
        >
            <Textarea
                label="Reason for reporting"
                placeholder="Explain why you are reporting this date idea"
                required
                {...form.getInputProps('reason')}
            />
            <Group justify="flex-end">
                {/* To settle submit report to firebase */}
                <Button type="submit" variant="outline" mt={10}>
                    Submit
                </Button>
            </Group>
        </form>
    );
};

export default CreateReport;
