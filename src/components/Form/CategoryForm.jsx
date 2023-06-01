import React, { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const CategoryForm = ({ getAllCategory }) => {
    const nameRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/create-category`, { name: nameRef.current.value });
            if (data.success) {
                toast.success(`${nameRef.current.value} is created`)
                getAllCategory();
                nameRef.current.value = "";
            }
            else {
                toast.success(data.message)
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    }

    return (
        <>
            <ToastContainer />
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Enter new category' required ref={nameRef} />
                </div>
                <button type="submit" className="btn btn-primary p-1" style={{ width: '100%' }}>Submit</button>
            </form>

        </>
    )
}

export default CategoryForm