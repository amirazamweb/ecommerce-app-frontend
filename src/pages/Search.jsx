import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify'

const Search = () => {
    const [values] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    return (
        <Layout title={'Search results'}>
            <div className="container mt-4 mb-3" style={{ width: '80%', margin: 'auto' }}>
                <h3 className='text-center text-info'>Search Results</h3>
                <h6 className='mb-3 text-center'>
                    {values?.results.length < 1 ?
                        'No Products Found' :
                        `Found ${values.results.length}`}
                </h6>
                <div className="card-container" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    {values?.results?.map((p) => {
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
                                            localStorage.setItem('ecommerec_cart', JSON.stringify([...cart, p]));
                                            toast.success('Item added to cart');
                                        }}
                                    >ADD TO CART</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout >
    )
}

export default Search