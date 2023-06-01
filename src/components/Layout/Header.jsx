import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast, ToastContainer } from 'react-toastify';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import appLogo from './app-logo.png'

const Header = () => {

    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();

    let navigate = useNavigate();

    const logoutHandler = () => {

        toast.success('Logout successfull');

        window.scrollTo(0, 0);

        setAuth({ ...auth, user: null, token: "" });

        // navigate('/login');

        localStorage.removeItem('_ecom_app');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to='/' className="navbar-brand">
                        <img src={appLogo} alt="app-logo" />
                    </Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <SearchInput />
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link">Home</NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link class="dropdown-item" to='/categories'>All Categories</Link></li>
                                {categories?.map((c) => {
                                    return (
                                        <li key={c._id}><Link class="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                                    )
                                })}
                            </ul>
                        </li>


                        {!auth.user ?
                            (
                                <>
                                    <li className="nav-item">
                                        <NavLink to='/register' className="nav-link">Register</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                </>
                            ) :
                            (
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user.name}
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user.role === 1 ? 'admin' : 'user'}`} >Dashboard</NavLink></li>
                                        <li>
                                            <NavLink to='/login' onClick={logoutHandler} className="dropdown-item">Logout</NavLink>
                                        </li>
                                    </ul>
                                </li>
                            )
                        }

                        <li className="nav-item">
                            <NavLink to='/cart' className="nav-link">Cart(<span style={{ color: 'red' }}>{cart?.length}</span>)</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </nav>
    )
}

export default Header