import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import "../css/Product.css";
import Login from './Login';
import Checkout from './Checkout';
import { FaShoppingBasket } from 'react-icons/fa';

const ProductPage = () => {
  // Retrieve product and cart data from the ProductContext
  const { product, cart, setCart } = useContext(ProductContext);

  // Function to add a product to the cart
  const addToCart = (productId) => {
    const productPrice = productId.default_price.id; // Not sure if this is the intended use
    const existingProduct = cart.find(item => item.id === productId.id);

    if (existingProduct) {
      // If the product is already in the cart, update the quantity
      const updatedCart = cart.map(item =>
        item.id === productId.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCart([...cart, { ...productId, productPrice, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If the product is in the cart
      if (existingProduct.quantity > 1) {
        // Decrease the quantity by 1
        const updatedCart = cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
      } else {
        // Remove the product from the cart if the quantity is 1 or less
        const updatedCart = cart.filter(item => item.id !== product.id);
        setCart(updatedCart);
      }
    }
  };

  return (
    <>
      <Login />
      <Checkout />
      <div className='header-products'>
        <h1>Products in the Webshop:</h1>
      </div>
      <div className='product'>
        <div>
          {product.map((product, idx) => (
            <div key={idx} className='lef'>
              <h2>{product.name}</h2>
              <img src={product.images} alt={product.name} />
              <p>{product.description}</p>
              <p>{(parseFloat(product.default_price.unit_amount) / 100).toFixed(2)} {product.default_price.currency}</p>
              <div className='store-btn'>
                <button className='buy_btn' onClick={() => addToCart(product)}>Buy now</button>
                <button onClick={() => removeFromCart(product)}>Remove from cart</button>
              </div>
            </div>
          ))}
        </div>
        <div className='header'>
          <h1><FaShoppingBasket />Shopping Cart:</h1>
          <div>
            {cart.map((c, index) => (
              <div key={index} className='right'>
                <p><span>{c.name}</span> X {c.quantity}</p>
                <img src={c.images} alt={`${c.name} Cart`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
