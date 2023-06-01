
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner';

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {

        const authCheck = async () => {

            let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/user-auth`, {
                headers: {
                    authorization: `Bearer ${auth.token}`
                }
            });

            if (res.data.ok) {
                setOk(true)
            }
            else {
                setOk(false);
            }
        }

        auth.token && authCheck();

    }, [auth.token])

    return ok ? <Outlet /> : <Spinner />
}

export default PrivateRoute