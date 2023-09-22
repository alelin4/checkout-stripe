import { createContext, useState, useEffect } from "react";

// Create a context for product-related data
export const ProductContext = createContext();

// ProductContextProvider component manages product and cart state
// eslint-disable-next-line react/prop-types
const ProductContextProvider = ({ children }) => {
    // State for products and cart
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);

    // Fetch products when the component mounts
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch('/api/all-products');
                const data = await response.json();
                setProduct(data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        // Call the function to fetch products
        getProducts();
    }, []); // Empty dependency array to run this effect only once when component mounts

    // Provide the product and cart data to the children components
    return (
        <ProductContext.Provider value={{ product, setProduct, cart, setCart }}>
            {children} {/* Render the children components */}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
