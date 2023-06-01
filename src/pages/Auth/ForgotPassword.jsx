import React from 'react'
import Layout from '../../components/Layout/Layout';
import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    let emailRef = useRef();
    let newPasswordRef = useRef();
    let answerRef = useRef();
    let navigate = useNavigate();

    const formHandler = async (e) => {
        e.preventDefault();

        let resetDetails = {};
        resetDetails.email = emailRef.current.value;
        resetDetails.newPassword = newPasswordRef.current.value;
        resetDetails.answer = answerRef.current.value;

        try {
            let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/forgot-password`, resetDetails);

            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }

            else {
                toast.warning(res.data.message)
            }

        } catch (error) {

            toast.error("Something went wrong")

        }
    }

    return (
        <Layout title={'Forgot passord - Ecommerce App'}>
            <div className="form-container" style={{ minHeight: '80vh' }}>
                <form onSubmit={formHandler}>
                    <h4 className="title">RESET PASSWORD</h4>
                    <div>

                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" placeholder='Enter Your Email' ref={emailRef} required />
                        </div>

                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" placeholder='Enter Your New Password' ref={newPasswordRef} required />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" id="answer" placeholder='What is your favourite city?' ref={answerRef} required />
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">RESET</button>
                        </div>

                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword