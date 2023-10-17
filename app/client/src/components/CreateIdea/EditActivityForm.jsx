import {
    Button,
    Grid,
    Group,
    MultiSelect,
    NumberInput,
    Paper,
    SimpleGrid,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { AiFillEdit } from 'react-icons/ai';
import { BiSolidTime } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';

const EditActivityForm = ({
    activity,
    idx,
    editShownList,
    handleEdit,
    updateActivity,
    activityList,
    classes,
}) => {
    return (
        <>
            <Grid key={idx} align="center" mt={10}>
                <Grid.Col span={11}>
                    <Paper key={idx} shadow="md" radius="lg" p="xs">
                        <div key={idx}>
                            <Group justify="space-between">
                                <Group>
                                    <BiSolidTime color="pink" />
                                    <Text
                                        size="sm"
                                        fw={900}
                                        variant="gradient"
                                        gradient={{
                                            from: 'rgba(255, 161, 161, 1)',
                                            to: 'rgba(255, 99, 133, 1)',
                                            deg: 90,
                                        }}
                                    >
                                        {activity.start} - {activity.end}{' '}
                                    </Text>
                                </Group>
                                <Group>
                                    <Text
                                        size="sm"
                                        fw={900}
                                        variant="gradient"
                                        gradient={{
                                            from: 'rgba(255, 161, 161, 1)',
                                            to: 'rgba(255, 99, 133, 1)',
                                            deg: 90,
                                        }}
                                    >
                                        {activity.name} @ {activity.location}
                                    </Text>
                                    <IoLocationSharp color="pink" />
                                </Group>
                            </Group>
                        </div>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={1}>
                    <div>
                        <AiFillEdit onClick={() => handleEdit(idx)} color="grey" />
                    </div>
                </Grid.Col>
            </Grid>
            {editShownList[idx] && (
                <form
                    className={classes.form}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Paper key={idx} shadow="md" radius="lg" p="sm">
                        <SimpleGrid cols={{ base: 1, sm: 3 }}>
                            <TimeInput
                                size="xs"
                                variant="filled"
                                label="Start Time"
                                value={activityList[idx].start}
                                onChange={(e) =>
                                    updateActivity('start', idx, e.target.value)
                                }
                                placeholder="Start"
                                required
                            />
                            <TimeInput
                                size="xs"
                                variant="filled"
                                label="End Time"
                                value={activityList[idx].end}
                                onChange={(e) =>
                                    updateActivity('end', idx, e.target.value)
                                }
                                placeholder="Time"
                                required
                            />
                            <TextInput
                                size="xs"
                                label="Activity Name"
                                placeholder="Activity"
                                value={activityList[idx].name}
                                onChange={(e) =>
                                    updateActivity('name', idx, e.target.value)
                                }
                                required
                            />
                        </SimpleGrid>

                        <TextInput
                            size="xs"
                            placeholder="Location"
                            required
                            mt="8"
                            value={activityList[idx].location}
                            onChange={(e) =>
                                updateActivity('location', idx, e.target.value)
                            }
                        />
                        <Textarea
                            size="xs"
                            radius="xs"
                            placeholder="Description"
                            value={activityList[idx].description}
                            onChange={(e) =>
                                updateActivity('description', idx, e.target.value)
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
                            value={activityList[idx].tags}
                            onChange={(value) => updateActivity('tags', idx, value)}
                        />

                        <Grid align="end">
                            <Grid.Col span={9}>
                                <NumberInput
                                    size="xs"
                                    label="Budget"
                                    placeholder="Cost"
                                    value={activityList[idx].budget}
                                    onChange={(value) =>
                                        updateActivity('budget', idx, value)
                                    }
                                    prefix="$"
                                />
                            </Grid.Col>

                            <Grid.Col span={3}>
                                <Button
                                    onClick={() => handleEdit(idx)}
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
            )}
        </>
    );
};

export default EditActivityForm;
