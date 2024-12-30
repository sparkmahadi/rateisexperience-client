import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';


export const AuthContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile = profile => {
        return updateProfile(auth.currentUser, profile);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user state updated', currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    const authInfo =
    {
        user, loading, setLoading,
        createNewUser, logIn,
        logInWithGoogle, 
        updateUserProfile, logOut, resetPassword
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;