import {
    Button,
    Grid,
    NumberInput,
    Paper,
    SimpleGrid,
    Textarea,
    TextInput,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';

import LocationAutocomplete from '../LocationAutocomplete';

const ActivityForm = ({ idx, activity, handleDiscardActivity, handleSaveActivity }) => {
    const form = useForm({
        initialValues: activity,
        validate: {
            start: (value) => (value ? null : 'Activity must have a start time'),
            end: (value) => (value ? null : 'Activity must have an end time'),
            name: isNotEmpty('Name cannot be empty'),
            location: {
                description: (value) => {
                    if (value == null) return ' Location cannot be empty';
                    if (form.values.location.name != '') {
                        return null;
                    }
                    if (form.values.location.name == '') {
                        return 'Please choose a valid location';
                    }
                },
                name: (value) => {
                    if (value != '') {
                        form.clearFieldError('location.description');
                    }
                },
            },
            description: isNotEmpty('Description cannot be empty'),
            budget: (value) => {
                if (value < 0) {
                    return 'Budget cannot be negative';
                } else if (value != 0 && !value) {
                    return 'Budget cannot be empty';
                } else {
                    return null;
                }
            },
        },
        validateInputOnChange: true,
    });

    return (
        <form
            onSubmit={form.onSubmit((values) => {
                if (form.isValid) {
                    handleSaveActivity(idx, values);
                }
            })}
        >
            <Paper shadow="none" p="sm" withBorder>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <TimeInput
                        size="xs"
                        variant="filled"
                        label="Start Time"
                        placeholder="Time"
                        required
                        {...form.getInputProps('start')}
                    />
                    <TimeInput
                        size="xs"
                        variant="filled"
                        label="End Time"
                        placeholder="Time"
                        required
                        {...form.getInputProps('end')}
                    />
                    <TextInput
                        variant="filled"
                        size="xs"
                        label="Activity Name"
                        placeholder="Activity"
                        required
                        {...form.getInputProps('name')}
                    />
                </SimpleGrid>
                <LocationAutocomplete form={form} />
                <Textarea
                    label="Description"
                    variant="filled"
                    size="xs"
                    radius="xs"
                    placeholder="Description"
                    autosize
                    maxRows={3}
                    required
                    {...form.getInputProps('description')}
                />

                <Grid align="end">
                    <Grid.Col span={6}>
                        <NumberInput
                            variant="filled"
                            size="xs"
                            label="Budget"
                            placeholder="Cost"
                            min={0}
                            prefix="$"
                            required
                            {...form.getInputProps('budget')}
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Button
                            onClick={() => handleDiscardActivity(idx)}
                            variant="light"
                            color="red"
                            size="xs"
                            fullWidth
                        >
                            Discard
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Button
                            onClick={() => {
                                form.validate();
                            }}
                            variant="light"
                            color="green"
                            size="xs"
                            fullWidth
                            type="submit"
                        >
                            Save
                        </Button>
                    </Grid.Col>
                </Grid>
            </Paper>
        </form>
    );
};

export default ActivityForm;
