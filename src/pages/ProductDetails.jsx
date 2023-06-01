import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';
import PageLoaderSpinner from '../components/PageLoaderSpinner';

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [loading, setLoading] = useState(true);

    // get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-product/${slug}`);
            setProduct(data?.product);
            getSimilarProducts(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    }

    // get similar products
    const getSimilarProducts = async (pid, cid) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    }

    useEffect(() => {
        if (slug) {
            getProduct();
        }
    }, [slug])

    return (
        <Layout>
            {loading ? (<PageLoaderSpinner left={48} />) :
                (
                    <>
                        <div className="row mt-5" style={{ width: '80%', margin: 'auto' }}>
                            {product._id && (
                                <div className="col-md-6">
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${product?._id}`}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{ width: '70%', height: '300px', margin: 'auto', display: 'block' }} />
                                </div>
                            )}
                            <div className="col-md-6">
                                <h3 className='text-center' style={{ color: '#227093' }}>Product Details</h3>
                                <table className="table table-bordered mt-4">
                                    <thead>
                                        <tr>
                                            <th scope="col" className='text-muted'>Name</th>
                                            <td >{product.name}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" className='text-muted'>Description</th>
                                            <td >{product.description}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" className='text-muted'>Price</th>
                                            <td >${product.price}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" className='text-muted'>Category</th>
                                            <td >{product?.category?.name}</td>
                                        </tr>
                                    </thead>
                                </table>
                                <button
                                    className='btn btn-secondary mt-2'
                                    onClick={() => {
                                        setCart([...cart, product]);
                                        localStorage.setItem('ecommerec_cart', JSON.stringify([...cart, product]))
                                        toast.success('Product added to cart')
                                    }}
                                >ADD TO CART</button>
                            </div>
                        </div>
                        <hr />
                        <div className="mt-4 mb-3" style={{ width: '80%', margin: 'auto' }}>
                            <h3 className='text-center mb-3' style={{ color: '#218c74' }}>Similar Products</h3>
                            {relatedProducts.length < 1 && (
                                <p className='text-center'>No similar products found</p>
                            )}
                            <div className="card-container" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                                {relatedProducts?.map((p) => {
                                    return (
                                        <div className='card home-card' key={p._id}>
                                            <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                                            <hr />
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {p.name?.length < 21 ? p.name :
                                                        p.name.substring(0, 17) + '....'}
                                                </h5>
                                                <p className="card-text">
                                                    {p.description?.length < 30 ? p.description :
                                                        p.description.substring(0, 25) + '.....'}
                                                </p>
                                                <p className="card-text">
                                                    <span style={{ color: '#b8e994', fontWeight: '300' }}>
                                                        <i className="fa-solid fa-star me-1"></i>
                                                        <i className="fa-solid fa-star me-1"></i>
                                                        <i className="fa-solid fa-star me-1"></i>
                                                        <i className="fa-solid fa-star me-1"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                    </span>
                                                    <span
                                                        style={{ float: 'right', color: '#e55039', fontWeight: '600' }}>
                                                        ${p.price}</span>
                                                </p>
                                                <button onClick={() => {
                                                    navigate(`/product/${p.slug}`)
                                                    window.scrollTo(0, 0)
                                                }}>MORE DETAILS</button>
                                                <button
                                                    onClick={() => {
                                                        setCart([...cart, p]);
                                                        localStorage.setItem('ecommerec_cart', JSON.stringify([...cart, p]))
                                                        toast.success('Product added to cart')
                                                    }}
                                                >ADD TO CART</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )
            }

        </Layout >
    )
}

export default ProductDetails