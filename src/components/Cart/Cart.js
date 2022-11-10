import React from "react";
import "./Cart.css";

const Cart = ({ cart, clearCart, children }) => {
  // show the all data of cart send
  // console.log(cart);

  // here this are starting value
  let total = 0;
  let shipping = 0;
  let quantity = 0;
  /* Note: for of use for loop. it run in array */
  for (const product of cart) {
    //here we want to plus 0 quantity+ product quantity that selected
    quantity = quantity + product.quantity;

    // here we want to plus all the price that cart added to order summary and multiply to product quantity that selected
    total = total + product.price * product.quantity;
    // here we want to plus all the shipping price that cart added to order summary
    shipping = shipping + product.shipping;
  }

  /* Note: 1. toFixed(2) use 2 decimal for show. like - 1.00 */
  /* Note: 2. parseFloat() use for make it string number ('10') to number (10)  and it make fraction (10.00) and if use parseInt() it will remove .00 make it(10) */
  // here we want to set 10 % (10 / 100) or 0.1 tax to the cart total
  const tax = parseFloat((total * 0.1).toFixed(2));
  // here we want to count plus to all total to tax
  const grandTotal = total + shipping + tax;

  return (
    <div className="cart">
      <h4>Order Summary </h4>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${total}</p>
      <p>Total Shipping: ${shipping}</p>
      <p>Tax 10% : ${tax}</p>
      <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
      {/* <button onClick={clearCart}>Clear Cart</button> */}
      {/* show button dynamically */}
      {children}
    </div>
  );
};

export default Cart;
