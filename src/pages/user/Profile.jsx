import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios';
import { toast } from 'react-toastify';
import PageLoaderSpinner from '../../components/PageLoaderSpinner';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(true);

    // get user data
    useEffect(() => {
        setLoading(true);
        const { name, email, phone, address } = auth.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
        setLoading(false);
    }, [auth?.user])

    // handle submit 
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        let userInfo = { name, email, password, phone, address };
        try {
            let { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/profile`, userInfo);
            if (data?.success) {
                toast.success(data?.message);
                setAuth({ ...auth, user: data?.updatedUser });
                toast.success(data.message);
                let ls = JSON.parse(localStorage.getItem('_ecom_app'));
                ls.user = data?.updatedUser;
                localStorage.setItem('_ecom_app', JSON.stringify(ls));
                setLoading(false);
            }
        } catch (error) {
            toast.warning('Something went wrong');
            setLoading(true);
        }
    }
    return (
        <Layout title={'Your profile'}>
            <div className="container-fluid p-3 mt-4" style={{ width: '80%', margin: 'auto' }}>
                <div className="row">
                    <div className="col-md-3"><UserMenu /></div>
                    {loading ? (<PageLoaderSpinner left={63} />) :
                        (
                            <div className="col-md-9">
                                <div className="form-container">
                                    <form onSubmit={handleSubmit}>
                                        <h4 className="title">USER PROFILE</h4>
                                        <div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder='Enter Your Name'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)} />
                                            </div>

                                            <div className="mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder='Enter Your Email'
                                                    value={email}
                                                    required
                                                    disabled
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder='Enter Your Password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                            </div>

                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder='Enter Your Phone'
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)} />
                                            </div>

                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder='Enter Your Address'
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                            <button type="submit" className="btn btn-primary">UPDATE</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </Layout>
    )
}

export default Profile