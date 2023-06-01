import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [newCategory, setNewCategory] = useState('');

    const modelOpenHandler = (id) => {
        setIsModalOpen(true);
        setCategoryId(id);
    }

    const defaultInputHandler = (e) => {
        setNewCategory(e.target.parentElement.previousElementSibling.innerText);
    }

    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/get-category`);
            if (data.success) {
                setCategories(data.categories);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])


    // edit category 
    const submitEditHandler = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/update-category/${categoryId}`, { name: newCategory });
            if (data.success) {
                toast.success(data.message);
                getAllCategory();
                setIsModalOpen(false);
            }
        } catch (error) {
            console.log('error occured');
            toast.error('Something went wrong');
        }
    }

    // delete category

    const deleteCategoryHandler = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/delete-category/${id}`);
            if (data?.success) {
                toast.success('Category deleted successfully');
                getAllCategory();
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout title={'Dashboard - create category'}>
            <div className="container-fluid p-3 mt-4" style={{ width: '80%', margin: 'auto' }}>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-6" style={{ margin: 'auto' }}>
                        <h3 className='text-primary text-center'>Manage Category</h3>
                        <div className="mt-3 mb-3">
                            <CategoryForm getAllCategory={getAllCategory} />
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {categories.map((elm, i) => {
                                        return <tr key={i}>
                                            <td>{elm.name}</td>
                                            <td className='w-50'>
                                                <button className='btn btn-primary me-3'
                                                    onClick={(e) => {
                                                        modelOpenHandler(elm._id);
                                                        defaultInputHandler(e);
                                                    }}>
                                                    Edit</button>
                                                <button className='btn btn-danger ms-2' onClick={() => deleteCategoryHandler(elm._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>

                        </div>
                        <Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
                            <form onSubmit={submitEditHandler}>
                                <div className="mb-3 w-50">
                                    <input type="text"
                                        value={newCategory}
                                        className="form-control"
                                        placeholder='Enter new category'
                                        required
                                        onChange={(e) => setNewCategory(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary p-1">Submit</button>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory