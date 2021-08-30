import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { firebaseClient, persistenceMode } from '../../config/firebase/client'

const AuthContext = React.createContext([{}, () => { }])

export const logout = () => firebaseClient.auth().signOut()

export const login = async ({ email, password }) => {

    firebaseClient.auth().setPersistence(persistenceMode)

    try {
        await firebaseClient.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        console.log('LOGIN ERROR ', error)
    }
}

export const signUp = async ({ email, password, username }) => {
    try {
        await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
        await login({ email, password })
    } catch (error) {
        console.log('SIGNUP ERROR ', error)
    }
}

export const useAuth = () => {
    const [auth] = useContext(AuthContext)

    return [auth, { login, logout, signUp }]
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        loading: true,
        user: false
    })

    useEffect(() => {
        const unsubscribe = firebaseClient.auth().onAuthStateChanged(user => {
            setAuth({
                loading: false,
                user,
            });
        });

        return ( ) => unsubscribe()
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}