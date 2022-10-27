import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../utilities/local-storage-db";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Orders = () => {
  // to get loader files use -
  const { products, initialCart } = useLoaderData();
  //get this {products: products, initialCart: initialCart};

  // here use state to remove cart
  const [cart, setCart] = useState(initialCart);

  // for remove cart id item
  const handleRemoveItem = (id) => {
    //  console.log(id);
    // find use for get one item
    // filter use for skip one and take all
    const remaining = cart.filter((product) => product.id !== id); //here condition is, if product id and removing id is not == than it take but if == then skip or remove
    setCart(remaining);
    // use for remove local storage save data id
    removeFromDb(id);
  };

// for clear cart or delete all 
const clearCart = () => {
    setCart([]);
    // for delete shopping cart
    deleteShoppingCart();
  }
  
  return (
    <div>
      {/* <h2>This is orders: {products.length}</h2>
            <p>Initial Cart: {cart.length}</p> */}

      <div className="shop-container">
        {/* products container */}
        <div className="orders-container">
          {cart.map((product) => (
            <ReviewItem
              key={product.id}
              product={product}
              handleRemoveItem={handleRemoveItem}
            ></ReviewItem>
          ))}

           {/* if empty page then show it */}
          {
             cart.length === 0 && <h2>No Items for Review. please <Link to={'/'}>Shop more.</Link> </h2>
          }

        </div>
        {/* cart container*/}
        <div className="cart-container">
          <Cart 
          cart={cart}
          clearCart={clearCart}
          ></Cart>
        </div>
      </div>
    </div>
  );
};

export default Orders;
