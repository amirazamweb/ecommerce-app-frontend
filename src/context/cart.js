import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('ecommerec_cart'));
        if (data) {
            setCart(data);
        }
    }, [])

    return (

        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>

    )
}

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };