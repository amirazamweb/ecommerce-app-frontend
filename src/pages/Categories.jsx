import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory';
import { Link, useNavigate } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
    const navigate = useNavigate();
    const compStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '30px',
        width: '75%',
        margin: '90px auto'
    }
    const buttonStyle = {
        padding: '15px',
        borderRadius: '5px',
        borderStyle: 'none',
        backgroundColor: '#227093',
        color: '#fff'
    }
    return (
        <Layout title={'All Categories'}>
            <div style={compStyle}>
                {categories?.map((c) => {
                    return (
                        <button
                            style={buttonStyle}
                            onClick={() => navigate(`/category/${c.name}`)}
                        >{c?.name}</button>
                    )
                })}
            </div>
        </Layout>
    )
}

export default Categories