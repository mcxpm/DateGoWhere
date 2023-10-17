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

import LocationAutocomplete from '../LocationAutocomplete';

const ActivityForm = ({
    idx,
    activity,
    handleChangeActivity,
    handleDiscardActivity,
    handleSaveActivity,
}) => {
    return (
        <form onSubmit={(event) => event.preventDefault()}>
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
                    />
                    <TimeInput
                        size="xs"
                        variant="filled"
                        label="End Time"
                        value={activity.end}
                        onChange={(e) => handleChangeActivity('end', idx, e.target.value)}
                        placeholder="Time"
                        required
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
                    />
                </SimpleGrid>
                <LocationAutocomplete
                    value={activity.location.description}
                    handleChangeActivity={handleChangeActivity}
                    idx={idx}
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
                />

                <Grid align="end">
                    <Grid.Col span={6}>
                        <NumberInput
                            variant="filled"
                            size="xs"
                            label="Budget"
                            placeholder="Cost"
                            value={activity.budget}
                            onChange={(value) =>
                                handleChangeActivity('budget', idx, value)
                            }
                            prefix="$"
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
                            onClick={() => handleSaveActivity(idx)}
                            variant="light"
                            color="green"
                            size="xs"
                            fullWidth
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
