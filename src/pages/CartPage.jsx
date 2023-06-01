import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-toastify'

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState('');
    const [loading, setLoading] = useState(false);

    // total price
    const totalPrice = () => {
        let total = 0;
        cart?.map((p) => total += p.price);
        return total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    // delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let filteredCart = myCart.filter((p) => p._id !== pid);
            setCart(filteredCart);
            localStorage.setItem('ecommerec_cart', JSON.stringify(filteredCart));
        } catch (error) {
            console.log(error);
        }
    }

    // get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token])

    // handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/braintree/payment`, {
                nonce, cart, _id: auth.user.id
            })
            setLoading(false);
            localStorage.removeItem('ecommerec_cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success('Payment Completed Successfully');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Layout>
            <div>
                <div className="row w-100">
                    <div className="col-md-12">
                        <h3 className='mb-3 mt-4 text-center text-success'>
                            Hello! {auth?.user?.name}
                        </h3>
                        <h6 className='text-center'>
                            {cart.length > 0 ?
                                `You have ${cart?.length} items in your cart. 
                        ${auth?.token ? '' : 'Please login to checkout'}` :
                                'Your cart is empty'
                            }
                        </h6>
                    </div>
                </div>
                {cart.length > 0 && <hr className='w-100'></hr>}
                {cart.length > 0 && (
                    <div className="row mt-4" style={{ width: '85%', margin: 'auto' }}>
                        <div className="col-md-7">
                            {cart?.map((p) => (
                                <div className='row card flex-row mb-2' key={p._id}>
                                    <div className="col-md-4">
                                        <img
                                            src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            height={150} />
                                    </div>
                                    <div className="col-md-8 p-3">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price: ${p.price}</p>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-5 text-center">
                            <h4>Cart Summary</h4>
                            <h6>Total | Checkout | Payment</h6>
                            <hr />
                            <h5 className='mb-3'>Total :{totalPrice()}</h5>
                            {
                                auth?.user?.address ? (
                                    <div className='mb-3'>
                                        <h5>Current Address</h5>
                                        <h6>{auth?.user?.address}</h6>
                                        <button
                                            className='btn btn-outline-warning'
                                            onClick={() => navigate('/dashboard/user/profile')}>
                                            Updtae Address
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className='btn btn-outline-warning mb-3'
                                        onClick={() => navigate('/login', { state: '/cart' })}>
                                        Please Login to checkout
                                    </button>
                                )
                            }
                            <div className="mt-2 mb-3">
                                {auth?.token && clientToken && (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                }
                                            }}
                                            onInstance={instance => setInstance(instance)}
                                        />
                                        <button
                                            className='btn btn-primary'
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}>
                                            {loading ? 'Processing.....' : 'Make Payment'}
                                        </button>
                                    </>
                                )
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout >
    )
}

export default CartPage