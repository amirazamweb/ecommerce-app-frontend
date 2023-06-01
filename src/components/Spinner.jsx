import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({ path = 'login' }) => {

    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const interval = setInterval(() => {
            setCount((preVal) => --preVal)
        }, 1000)

        count === 0 && navigate(`/${path}`, { state: location.pathname });

        return () => {
            clearInterval(interval);
        }

    }, [count])


    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <h2 className='text-center'>redirecting to you in {count}</h2>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner