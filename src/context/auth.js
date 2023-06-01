import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('_ecom_app'));
        if (data) {
            setAuth({ ...auth, user: data.user, token: data.token })
        }
    }, [])

    return (

        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>

    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };