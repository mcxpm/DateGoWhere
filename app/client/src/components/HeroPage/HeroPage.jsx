import { Box, Button, Center, Grid, Image, Overlay, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import HeroImage from '/images/hero-image.png';

import classes from './HeroPage.module.css';

export default function HeroPage() {
    const navigate = useNavigate();
    return (
        <Box h={'100dvh'}>
            <Overlay
                gradient="linear-gradient(90deg, rgba(255, 240, 246, 1) 30%, rgba(0, 0, 0, 0) 90%)"
                opacity={1}
                zIndex={-1}
                h={'100%'}
            />
            <Center h={'100%'}>
                <Grid justify="center" align="center" p={'xl'}>
                    <Grid.Col span={{ base: 12, md: 6 }} className={classes.image}>
                        <Image radius="md" maw={'24rem'} mx={'auto'} src={HeroImage} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Box maw={'30rem'} mx={'auto'}>
                            <Text
                                fz={'3rem'}
                                fw={'bolder'}
                                variant="gradient"
                                gradient={{ from: 'pink', to: 'red', deg: 45 }}
                            >
                                DateGoWhere
                            </Text>
                            <Text mt="xl" fw={'bold'}>
                                Date Ideas by Singaporeans for Singaporeans
                            </Text>

                            <Text mt="xl">
                                Upload your own date ideas to share with others, or choose
                                from many date ideas. Your dates will never be boring ever
                                again!
                            </Text>

                            <Button
                                mt={'xl'}
                                color="pink"
                                size="md"
                                onClick={() => navigate('/ideas/browse')}
                            >
                                Browse Ideas
                            </Button>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Center>
        </Box>
    );
}
