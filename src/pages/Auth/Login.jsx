import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';

const Login = () => {

    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    if (auth.user) {
        navigate('/');
    }

    let emailRef = useRef();
    let passwordRef = useRef();

    const handleSubmit = async (e) => {

        e.preventDefault();

        let userCredential = {};
        userCredential.email = emailRef.current.value;
        userCredential.password = passwordRef.current.value;

        try {

            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, userCredential);

            if (data.success) {
                toast.success(data.message);
                localStorage.setItem('_ecom_app', JSON.stringify({ ...auth, user: data.user, token: data.token }));
                setAuth({ ...auth, user: data.user, token: data.token });
                window.scrollTo(0, 0);
                setTimeout(() => {
                    navigate(location.state || '/');
                }, 1000)
            }
            else {
                toast.warning(data.message);
            }

        } catch (error) {
            toast.error('Something went wrong');
        }

    }

    return (
        <Layout title={'Login - Ecommerce App'}>
            <div className="form-container" style={{ minHeight: '80vh' }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>
                    <div>

                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" placeholder='Enter Your Email' ref={emailRef} required />
                        </div>

                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" placeholder='Enter Your Password' ref={passwordRef} required />
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary" onClick={() => navigate('/forgot-password')}>Forgot Password</button>
                        </div>

                        <button type="submit" className="btn btn-primary">LOGIN</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login