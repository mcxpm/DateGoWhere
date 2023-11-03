import {
    Button,
    Container,
    Grid,
    GridCol,
    Image,
    Overlay,
    Text,
    Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';

import datepic from '/images/datepic.png'

import classes from './HeroPage.module.css';


export default function HeroPage() {
    return (
        <div className={classes.hero}>
            <Overlay
                gradient="linear-gradient(90deg, rgba(255, 240, 246, 1) 30%, rgba(0, 0, 0, 0) 90%)"
                opacity={1}
                zIndex={0}
                h={'100%'}
            />
            <Grid className={classes.container} justify='center' align='center'>
                <GridCol span={6} p={80}>
                    
                       <Image
                        radius="md"
                        h={400}
                        w="auto"
                        src={datepic}
                    />   
                </GridCol>
                <GridCol span={6} size="lg">
                    <Title className={classes.title}>DateGoWhere</Title>
                    <Text className={classes.description} mt="xl">
                        Date Ideas by Singaporeans for Singaporeans
                    </Text>

                    <Text className={classes.description2} mt="xl">
                        Upload your own date ideas to share with others, or choose from
                        many date ideas. Your dates will never be boring ever again!
                    </Text>
                    <Link to="/ideas/browse">
                        <Button color="pink" size="xl" className={classes.control}>
                            Browse Ideas
                        </Button>
                    </Link>
                </GridCol>
            </Grid>
        </div>
    );
}
