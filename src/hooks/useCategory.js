import { useEffect, useState } from "react";
import axios from 'axios';

const useCategory = () => {
    const [categories, setCategories] = useState([]);

    // get all category

    const getCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/get-category`);
            setCategories(data?.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return categories;

}

export default useCategory;