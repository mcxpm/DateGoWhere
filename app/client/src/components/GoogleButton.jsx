import { Button } from '@mantine/core';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';

const GoogleButton = (props) => {
    return (
        <Button leftSection={<GoogleIcon />} variant="default" color="gray" {...props} />
    );
};

export default GoogleButton;
