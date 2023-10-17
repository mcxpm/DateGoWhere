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

const AddActivityForm = ({
    activity,
    setActivity,
    handleDiscard,
    handleSaveActivity,
}) => {
    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <Paper shadow="md" radius="lg" p="sm">
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <TimeInput
                        size="xs"
                        variant="filled"
                        label="Start Time"
                        value={activity.start}
                        onChange={(e) =>
                            setActivity({
                                ...activity,
                                start: e.target.value,
                            })
                        }
                        placeholder="Time"
                        required
                    />
                    <TimeInput
                        size="xs"
                        variant="filled"
                        label="End Time"
                        value={activity.end}
                        onChange={(e) =>
                            setActivity({
                                ...activity,
                                end: e.target.value,
                            })
                        }
                        placeholder="Time"
                        required
                    />
                    <TextInput
                        size="xs"
                        label="Activity Name"
                        placeholder="Activity"
                        value={activity.name}
                        onChange={(e) =>
                            setActivity({
                                ...activity,
                                name: e.target.value,
                            })
                        }
                        required
                    />
                </SimpleGrid>

                <TextInput
                    size="xs"
                    placeholder="Location"
                    required
                    mt="8"
                    value={activity.location}
                    onChange={(e) =>
                        setActivity({
                            ...activity,
                            location: e.target.value,
                        })
                    }
                />
                <Textarea
                    size="xs"
                    radius="xs"
                    placeholder="Description"
                    value={activity.description}
                    onChange={(e) =>
                        setActivity({
                            ...activity,
                            description: e.target.value,
                        })
                    }
                    mt="8"
                    autosize
                    maxRows={3}
                    required
                />
                <MultiSelect
                    size="xs"
                    label="Date Tags"
                    placeholder="Pick Category"
                    data={['Romantic', 'Outdoor', 'Food', 'Sport', 'Dance', 'Cultural']}
                    searchable
                    nothingFoundMessage="Nothing found..."
                    value={activity.tags}
                    onChange={(value) =>
                        setActivity({
                            ...activity,
                            tags: value,
                        })
                    }
                />

                <Grid align="end">
                    <Grid.Col span={6}>
                        <NumberInput
                            size="xs"
                            label="Budget"
                            placeholder="Cost"
                            value={activity.budget}
                            onChange={(value) =>
                                setActivity({
                                    ...activity,
                                    budget: value,
                                })
                            }
                            prefix="$"
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Button
                            onClick={handleDiscard}
                            variant="light"
                            color="red"
                            size="xs"
                        >
                            Discard
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Button
                            onClick={handleSaveActivity}
                            variant="light"
                            color="green"
                            size="xs"
                        >
                            Save
                        </Button>
                    </Grid.Col>
                </Grid>
            </Paper>
        </form>
    );
};

export default AddActivityForm;
