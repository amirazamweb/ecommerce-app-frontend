import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { useCart } from '../context/cart.js';
import PageLoaderSpinner from '../components/PageLoaderSpinner';

const CategoryProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);

  // get product by category
  const getProductByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-category/${slug}`)
      setCategory(data?.category);
      setProducts(data?.products);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    if (slug) {
      getProductByCat();
    }
  }, [slug])
  return (
    <Layout>
      {loading ? (<PageLoaderSpinner left={48} />) :
        (
          <div className="container mt-4 mb-3">
            {products.length > 0 ? (
              <>
                <h3 className='text-center'>
                  <span style={{ color: '#227093' }}>Category</span> - <span style={{ color: '#cc8e35' }}>{category?.name}</span>
                </h3>
                <h6 className='text-center mb-4'>{products?.length} result found</h6>
              </>
            ) :
              (
                <>
                  <h2
                    className='text-center' style={{ marginTop: '60px', color: '#ffb142' }}
                  >No Category Product Found!</h2>
                </>
              )
            }
            <div className="card-container" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {products?.map((p) => {
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
        )}
    </Layout>
  )
}

export default CategoryProduct