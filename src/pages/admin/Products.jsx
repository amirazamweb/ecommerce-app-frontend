
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PageLoaderSpinner from '../../components/PageLoaderSpinner';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // get all products 

    const getAllProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-product`);
            if (data?.success) {
                setProducts(data.products);
                setLoading(false);
            }
            else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            toast.error('Something went wrong');
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout title={'Dashboard - Products'}>
            <div className="container-fluid p-3 mt-4" style={{ width: '80%', margin: 'auto' }}>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    {loading ? (<PageLoaderSpinner left={63} />) :
                        (
                            <div className="col-md-9">
                                <h3 className='text-center text-primary mb-3'>All Products List</h3>
                                {
                                    products.length === 0 ?
                                        (<h6 className='text-center mt-3'>No products added</h6>) :
                                        (<div className="row">
                                            {products?.map((p) => {
                                                return (
                                                    <Link to={`/dashboard/admin/product/${p.slug}`} className="col-md-3 mb-2 product-link" key={p._id}>
                                                        <div className='card home-card'>
                                                            <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                                                            <hr />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{p.name}</h5>
                                                                <p className="card-text">{p.description}
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </Link>)
                                            })}
                                        </div>)
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Products