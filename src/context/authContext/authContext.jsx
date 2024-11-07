import {createContext, useContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase/firebase.js";


const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider ({children})  {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console?.log(user);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);