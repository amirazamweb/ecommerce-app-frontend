import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/admin/AdminOrders';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/search' element={<Search />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/orders' element={<AdminOrders />} />
          <Route path='admin/products' element={<Products />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
