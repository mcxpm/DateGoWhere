import {
    Button,
    Grid,
    MultiSelect,
    NumberInput,
    Paper,
    SimpleGrid,
    Textarea,
    TextInput,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';

import LocationAutocomplete from '../LocationAutocomplete';

const ActivityForm = ({
    idx,
    activity,
    handleChangeActivity,
    handleDiscardActivity,
    handleSaveActivity,
}) => {
    const form = useForm({
        initialValues: {
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
        },
        validate: {
            start: (value) => (value ? null : 'Activity must have a start time'),
            end: (value) => (value ? null : 'Activity must have an end time'),
            name: isNotEmpty('Name cannot be empty'),
            location: {
                description: isNotEmpty('Location cannot be empty'),
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
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Paper shadow="none" p="sm">
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <TimeInput
                        size="xs"
                        variant="filled"
                        label="Start Time"
                        value={activity.start}
                        onChange={(e) =>
                            handleChangeActivity('start', idx, e.target.value)
                        }
                        placeholder="Time"
                        required
                        {...form.getInputProps('start')}
                    />
                    <TimeInput
                        size="xs"
                        variant="filled"
                        label="End Time"
                        value={activity.end}
                        onChange={(e) => handleChangeActivity('end', idx, e.target.value)}
                        placeholder="Time"
                        required
                        {...form.getInputProps('end')}
                    />
                    <TextInput
                        variant="filled"
                        size="xs"
                        label="Activity Name"
                        placeholder="Activity"
                        value={activity.name}
                        onChange={(e) =>
                            handleChangeActivity('name', idx, e.target.value)
                        }
                        required
                        {...form.getInputProps('name')}
                    />
                </SimpleGrid>
                <LocationAutocomplete
                    value={activity.location.description}
                    handleChangeActivity={handleChangeActivity}
                    idx={idx}
                    inputProps={form.getInputProps('location.description')}
                />
                <Textarea
                    label="Description"
                    variant="filled"
                    size="xs"
                    radius="xs"
                    placeholder="Description"
                    value={activity.description}
                    onChange={(e) =>
                        handleChangeActivity('description', idx, e.target.value)
                    }
                    autosize
                    maxRows={3}
                    required
                    {...form.getInputProps('description')}
                />
                <MultiSelect
                    variant="filled"
                    size="xs"
                    label="Date Tags"
                    placeholder="Pick Category"
                    data={['Romantic', 'Outdoor', 'Food', 'Sport', 'Dance', 'Cultural']}
                    searchable
                    nothingFoundMessage="Nothing found..."
                    value={activity.tags}
                    onChange={(value) => handleChangeActivity('tags', idx, value)}
                    {...form.getInputProps('tags')}
                />

                <Grid align="end">
                    <Grid.Col span={6}>
                        <NumberInput
                            variant="filled"
                            size="xs"
                            label="Budget"
                            placeholder="Cost"
                            min={0}
                            value={activity.budget}
                            onChange={(value) =>
                                handleChangeActivity('budget', idx, value)
                            }
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
                                if (form.isValid) {
                                    handleSaveActivity(idx);
                                }
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