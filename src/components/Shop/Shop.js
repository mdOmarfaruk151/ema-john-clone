import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


const Shop = () => {
  const [products, setProducts] = useState([]);
  // we can crate useState() as we can
  // here state for order summery
  const [cart, setCart] =useState([]);
 
// here we get data from json file public>products.json
  useEffect(()=>{
   fetch('products.json')
   .then(res => res.json())
   .then(data => setProducts(data))

  },[]);

  // add to card function(in this () we can send any item that we want to show when clicked button)
const handleAddToCart = (product)=>{
    //  console.log(product);
     // here we copy data from state array (using [... card,]) to compare old and new data then added that we get from compare
     // do  not do  this: cart.push(product);
    const newCart =[...cart, product];
    // send newCart data to  setCard
    setCart(newCart);

}
    return (
        <div className='shop-container'>
            {/* .products-container+.card-container */}
            <div className="products-container">
               {/* <h3>This is for products: {products.length}</h3> */}
               {
                products.map(product => <Product 
                    product={product} 
                    key={product.id}
                    //we can send function too
                    handleAddToCart={handleAddToCart}
                    ></Product>)
               }
            </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;