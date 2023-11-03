import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '../config/firebase';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const listener = onAuthStateChanged(auth, async (user) => {
            setLoading(false);
            if (user) {
                setUser(user);
            }
        });
        return () => {
            listener();
        };
    }, []);

    return {
        user,
        loading,
    };
};

export default useAuth;
