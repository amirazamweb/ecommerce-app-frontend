import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
import PageLoaderSpinner from '../../components/PageLoaderSpinner';

const AdminOrders = () => {
    const status = ['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true);

    // get all orders
    const getOrders = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/all-orders`);
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

    // handle change
    const handleChange = async (orderId, value) => {
        setLoading(true);
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/order-status/${orderId}`, { status: value });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={'Dashboard - orders'}>
            <div className="container-fluid p-3 mt-4" style={{ width: '80%', margin: 'auto' }}>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    {loading ? (<PageLoaderSpinner left={63} />) :
                        (
                            <div className="col-md-9 m-auto">
                                <h3 className='text-center text-primary'>All Orders</h3>
                                {
                                    orders?.map((o, i) => {
                                        return (
                                            <div className='border' key={o._id}>
                                                <table className='table text-center'>
                                                    <thead className='bg-secondary text-light'>
                                                        <tr>
                                                            <th scope='col'>#</th>
                                                            <th scope='col'>Order ID</th>
                                                            <th scope='col'>Status</th>
                                                            <th scope='col'>Buyer</th>
                                                            <th scope='col'>Date</th>
                                                            <th scope='col'>Payment</th>
                                                            <th scope='col'>Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope='row'>{i + 1}</th>
                                                            <td>{o?._id.slice(-10)}</td>
                                                            <td>
                                                                <Select
                                                                    bordered={false}
                                                                    onChange={(value) => handleChange(o._id, value)}
                                                                    defaultValue={o?.status}>
                                                                    {status.map((s, i) => (
                                                                        <Option key={i} value={s}>{s}</Option>
                                                                    ))}
                                                                </Select>
                                                            </td>
                                                            <td>{o?.buyer?.name}</td>
                                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                                            <td>{o?.payment.success ? 'Success' : 'Failed'}</td>
                                                            <td>{o?.products.length}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                {o?.products?.map((p) => {
                                                    return (
                                                        <div className='row card flex-row mb-2 w-100 m-auto' key={p._id}>
                                                            <div className="col-md-4">
                                                                <img
                                                                    src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${p._id}`}
                                                                    className="card-img-top"
                                                                    alt={p.name}
                                                                    height={150} />
                                                            </div>
                                                            <div className="col-md-8 pt-3">
                                                                <p><b>{p.name}</b></p>
                                                                <p>{p.description.substring(0, 30)}</p>
                                                                <p>Price: ${p.price}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )}
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders