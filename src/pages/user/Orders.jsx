import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import moment from 'moment';
import PageLoaderSpinner from '../../components/PageLoaderSpinner';
const Orders = () => {
    const [auth] = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // get orders
    const getOrders = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/orders/${auth?.user.id}`);
            setOrders(data)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <Layout title={'Your orders'}>
            <div className="container-fluid p-3 mt-4" style={{ width: '80%', margin: 'auto' }}>
                <div className="row">
                    <div className="col-md-3"><UserMenu /></div>
                    {loading ? (<PageLoaderSpinner left={63} />) :
                        (
                            <div className="col-md-9">
                                <h3 className='text-center text-info'>My Orders</h3>
                                {orders.length === 0 && <h6 className='text-center'>You have not placed any order yet</h6>}
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
                                                            <td className={o?.status === 'Delivered' && 'text-success'}>{o?.status}</td>
                                                            <td>{o?.buyer.name}</td>
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

export default Orders