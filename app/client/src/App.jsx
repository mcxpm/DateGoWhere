import './App.css';
import { Box, Button, Divider, Link, Stack, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db, googleAuthProvider } from './firebase';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';

function App() {
    const [user, setUser] = useState();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setUser(user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    useEffect(() => {
        const addUser = async () => {
            try {
                const docRef = await addDoc(collection(db, 'users'), {
                    first: 'Alan',
                    middle: 'Mathison',
                    last: 'Turing',
                    born: 1912,
                });

                console.log('Document written with ID: ', docRef.id);
            } catch (e) {
                console.error('Error adding document: ', e);
            }
        };
        addUser();
        const getIdeas = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'ideas'));
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                });
            } catch (e) {
                console.error('Error getting document: ', e);
            }
        };
        getIdeas();
    }, []);

    return (
        <main>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {user ? (
                    <Box
                        sx={{
                            maxWidth: 550,
                            px: 3,
                            py: '100px',
                            width: '100%',
                        }}
                    >
                        <img src={user ? user.photoURL : ''} />
                        <Typography variant="h3">
                            Hello, {user ? user.displayName : 'unknown'}
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Box
                            sx={{
                                maxWidth: 550,
                                px: 3,
                                py: '100px',
                                width: '100%',
                            }}
                        >
                            <div>
                                <Stack spacing={1} sx={{ mb: 3 }}>
                                    <Typography variant="h4">Login</Typography>
                                    <Typography color="text.secondary" variant="body2">
                                        Don&apos;t have an account? &nbsp;
                                        <Link
                                            href="/auth/register"
                                            underline="hover"
                                            variant="subtitle2"
                                        >
                                            Register
                                        </Link>
                                    </Typography>
                                </Stack>
                                <form noValidate>
                                    <Stack spacing={3}>
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            name="password"
                                            type="password"
                                        />
                                    </Stack>
                                    <Button
                                        fullWidth
                                        size="large"
                                        sx={{ mt: 3 }}
                                        type="submit"
                                        variant="contained"
                                    >
                                        Continue
                                    </Button>
                                </form>
                                <Divider sx={{ mt: 3 }}> or </Divider>
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    variant="outlined"
                                    startIcon={<GoogleIcon />}
                                    onClick={handleGoogleSignIn}
                                >
                                    Sign In With Google
                                </Button>
                            </div>
                        </Box>
                    </>
                )}
            </Box>
        </main>
    );
}

export default App;
