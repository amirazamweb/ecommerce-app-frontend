import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';

const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // get total count
    const getTotalCount = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-app-backend-ygsw.onrender.com/api/v1/product/product-count`);
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page])

    // load more
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://ecommerce-app-backend-ygsw.onrender.com/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // get all products

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://ecommerce-app-backend-ygsw.onrender.com/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-app-backend-ygsw.onrender.com/api/v1/category/get-category`);
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    // filter by category

    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        }
        else {
            all = all.filter((i) => i !== id);
        }
        setChecked(all);
    }

    useEffect(() => {
        if (checked.length || radio.length) {
            filteredProduct();
        }
        else if (!checked.length && !radio.length) {
            getAllProducts();
        }
    }, [checked.length, radio[0]])

    useEffect(() => {
        getAllCategory();
        getTotalCount();
    }, [])

    // get filtered product

    const filteredProduct = async () => {
        try {
            const { data } = await axios.post(`https://ecommerce-app-backend-ygsw.onrender.com/api/v1/product/product-filters`, { checked, radio });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Layout title={'All Products - Best offers'}>
            <div className="row mt-3 mb-4" style={{ width: '100%', margin: 'auto' }}>
                <div className="col-md-12">
                    <img src="images/banner.png" alt="banner" style={{ width: '100%' }} />
                </div>
            </div>
            <div className="row mt-3" style={{ width: '90%', margin: 'auto' }}>
                <div className="col-md-3">
                    {/* filter by category */}
                    <h5 style={{ color: '#f0932b' }}>Filter By Category</h5>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => {
                            return (
                                <div key={c._id}>
                                    <Checkbox onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                                </div>
                            )
                        })}
                    </div>
                    {/* filter by price */}
                    <h5 className='mt-4' style={{ color: '#f0932b' }}>Filter By Price</h5>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => {
                                return (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                )
                            })}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column mt-3">
                        <button className='btn btn-info' onClick={() => window.location.reload()}>RESET FILTERS</button>
                    </div>
                </div>
                <div className="col-md-8" style={{ margin: 'auto' }}>
                    <h3 className='text-center text-secondary mb-3'>All Products</h3>
                    <div className="card-container">
                        {products?.map((p) => {
                            return (
                                <div className='card home-card' key={p._id}>
                                    <img src={`https://ecommerce-app-backend-ygsw.onrender.com/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
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
                                                localStorage.setItem('ecommerec_cart', JSON.stringify([...cart, p]));
                                                toast.success('Item added to cart');
                                            }}
                                        >ADD TO CART</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {
                        !radio.length > 0 && !checked.length > 0 && (
                            <div className='m-2 p-2'>
                                {products && products.length < total && (
                                    <button
                                        className='btn btn-warning'
                                        onClick={(e) => {
                                            setPage(page + 1);
                                        }}
                                    >
                                        {loading ? 'Loading....' : 'Loadmore'}
                                    </button>
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
        </Layout>
    )
}

export default HomePage