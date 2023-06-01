import React, { useRef } from 'react'
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/authStyle.css'

const Register = () => {

    let nameRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();
    let phoneRef = useRef();
    let addressRef = useRef();
    let answerRef = useRef();

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userInfo = {};
        userInfo.name = nameRef.current.value;
        userInfo.email = emailRef.current.value;
        userInfo.password = passwordRef.current.value;
        userInfo.phone = phoneRef.current.value;
        userInfo.address = addressRef.current.value;
        userInfo.answer = answerRef.current.value;

        try {

            let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/register`, userInfo);

            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
            else {
                toast.warning(res.data.message);
            }

        } catch (error) {
            toast.warning('Something went wrong');
        }
    }

    return (
        <Layout title={'Register - Ecommerce App'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="name" placeholder='Enter Your Name' ref={nameRef} required />
                        </div>

                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" placeholder='Enter Your Email' ref={emailRef} required />
                        </div>

                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" placeholder='Enter Your Password' ref={passwordRef} required />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" id="phone" placeholder='Enter Your Phone' ref={phoneRef} required />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" id="address" placeholder='Enter Your Address' ref={addressRef} required />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" id="answer" placeholder='What is your favourite city?' ref={answerRef} required />
                        </div>
                        <button type="submit" className="btn btn-primary">REGISTER</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Register