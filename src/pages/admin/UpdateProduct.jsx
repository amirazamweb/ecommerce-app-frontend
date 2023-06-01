import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
import { useNavigate, useParams } from 'react-router-dom';
import PageLoaderSpinner from '../../components/PageLoaderSpinner';

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    // get single product
    const getSingleProduct = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setId(data.product._id);
            setCategory(data.product.category._id);
            setLoading(false);
        } catch (error) {
            toast.error('Something went wrong');
            setLoading(true);
        }
    }

    // get all category

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.categories);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        getAllCategory();
        getSingleProduct();
    }, [])

    // update product function

    const handleUpdate = async () => {
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('quantity', quantity);
            photo && productData.append('photo', photo);
            productData.append('category', category);
            let { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/update-product/${id}`, productData);
            console.log(data);
            if (data?.success) {
                toast.success(data.message);
                navigate('/dashboard/admin/products')
            }
            else {
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong')
        }
    }

    // delete a product

    const handleDelete = async () => {
        let answer = window.confirm(`Are you sure want to delete ${name} product?`);
        if (!answer) return;
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/delete-product/${id}`);
            toast.success(data.message);
            navigate('/dashboard/admin/products');
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout title={'Dashboard - create product'}>
            <div className="container-fluid p-3 mt-4" style={{ width: '80%', margin: 'auto' }}>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    {loading ? (<PageLoaderSpinner left={63} />) :
                        (
                            <div className="col-md-9">
                                <h3 className='text-center text-primary'>Update Product</h3>
                                <div className="m-1 w-75 m-auto">
                                    <Select bordered={false}
                                        placeholder={'Select a category'}
                                        size='large'
                                        showSearch
                                        value={category}
                                        className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
                                        {categories?.map((c) => {
                                            return <Option key={c._id} value={c._id}>{c.name}</Option>
                                        })}
                                    </Select>
                                    <div className="mb-3">
                                        <label className='btn btn-outline-secondary col-md-12'>
                                            {photo ? photo.name : 'Upload Photo'}
                                            <input type="file" name='photo' accept='image/*'
                                                onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                        </label>
                                    </div>
                                    <div className="mb-3">
                                        {
                                            photo ? (
                                                <div className="text-center">
                                                    <img
                                                        src={URL.createObjectURL(photo)}
                                                        alt='product-photo'
                                                        height={'200px'}
                                                        className='img img-responsive' />
                                                </div>
                                            ) :
                                                (
                                                    <div className="text-center">
                                                        <img
                                                            src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${id}`}
                                                            alt='product-photo'
                                                            height={'200px'}
                                                            className='img img-responsive' />
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={name}
                                            placeholder='write a name'
                                            className='form-control'
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <textarea type="text"
                                            value={description}
                                            placeholder='write a description'
                                            className='form-control'
                                            onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="number"
                                            value={price}
                                            placeholder='write a price'
                                            className='form-control'
                                            min='0'
                                            onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="number"
                                            value={quantity}
                                            placeholder='write a quantity'
                                            className='form-control'
                                            min='0'
                                            onChange={(e) => setQuantity(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <Select
                                            bordered={false}
                                            placeholder='Select Shipping'
                                            size='large'
                                            showSearch
                                            className='form-select mb-3'
                                            onChange={(value) => setShipping(value)}
                                            value={shipping ? 'Yes' : 'No'}>
                                            <Option value='0'>No</Option>
                                            <Option value='1'>Yes</Option>
                                        </Select>
                                    </div>
                                    <div className="mb-3">
                                        <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
                                    </div>
                                    <div className="mb-3">
                                        <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT</button>
                                    </div>
                                </div>
                            </div>
                        )}

                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct