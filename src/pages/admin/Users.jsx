import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import PageLoaderSpinner from '../../components/PageLoaderSpinner';
import { toast } from 'react-toastify';
import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
import { useAuth } from '../../context/auth';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();

    // get All users
    const getAllUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/all-users/${auth?.user.id}`);
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    }

    // user role update
    const userRoleUpdateHandler = async (id, role) => {
        setLoading(true);
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/user/${id}`, { role });
            if (data?.success) {
                getAllUsers();
                toast.success(data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])
    return (
        <Layout title={'Dashboard - all users'}>
            <div className="container-fluid p-3 mt-4" style={{ width: '80%', margin: 'auto' }}>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    {loading ? (<PageLoaderSpinner left={63} />) :
                        (
                            <div className="col-md-8" style={{ margin: '6px auto' }}>
                                <h3 className='text-center text-primary'>All Users</h3>
                                <div className='border'>
                                    <table className='table text-center'>
                                        <thead className='bg-warning'>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>User ID</th>
                                                <th scope='col'>User</th>
                                                <th scope='col'>Role</th>
                                                <th scope='col'>Email</th>
                                                <th scope='col'>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users?.map((u, i) => (
                                                <tr key={u._id}>
                                                    <th scope='row'>{i + 1}</th>
                                                    <td>{u?._id.slice(-10)}</td>
                                                    <td>{u?.name}</td>
                                                    <td>
                                                        <Select
                                                            bordered={false}
                                                            defaultValue={u?.role === 0 ? 'User' : 'Admin'}
                                                            onChange={(value) => userRoleUpdateHandler(u?._id, value)}>
                                                            <Option value='0'>User</Option>
                                                            <Option value='1'>Admin</Option>
                                                        </Select>
                                                    </td>
                                                    <td>{u?.email}</td>
                                                    <td>{u?.address}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </Layout>
    )
}

export default Users