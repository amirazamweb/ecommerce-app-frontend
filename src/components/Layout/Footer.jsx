import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer text-center'>
            <h4 className='mt-3'>
                All Right Reserved &copy; Amir Azam
            </h4>
            <p>
                <Link to='/about'>About</Link>|
                <Link to='/contact'>Contact</Link>|
                <Link to='/policy'>Privacy Policy</Link>
            </p>
        </div>
    )
}

export default Footer