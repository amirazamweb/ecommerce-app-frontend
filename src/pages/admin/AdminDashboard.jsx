import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {

    const [auth] = useAuth();

    return (
        <Layout title={'Dashboard - Admin'}>
            <div className="container-fluid p-3 mt-4" style={{ width: '80%', margin: 'auto' }}>
                <div className="row">
                    <div className="col-md-3"><AdminMenu /></div>

                    <div className="col-md-9">
                        <div style={{ width: '80%', margin: 'auto' }}>
                            <h3 className='mb-3 text-center text-primary'>Admin Details</h3>
                            <table className="table table-bordered mt-4">
                                <thead>
                                    <tr>
                                        <th scope="col" className='text-muted'>Adimn</th>
                                        <td >{auth?.user?.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col" className='text-muted'>Email</th>
                                        <td >{auth?.user?.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col" className='text-muted'>Phone</th>
                                        <td >{auth?.user?.phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col" className='text-muted'>Address</th>
                                        <td >{auth?.user?.address}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard