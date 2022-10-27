import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, deleteShoppingCart, getStoredCart } from "../../utilities/local-storage-db";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const products = useLoaderData();
  // we can crate useState() as we can
  // here state for order summery
  const [cart, setCart] = useState([]);

// for clear cart or delete all 
const clearCart = () => {
  setCart([]);
  // for delete shopping cart
  deleteShoppingCart();
}

  // here we load data from local Storage
  /* Note: useEffect use when we load data outside of the project code */
  useEffect(() => {
    // console.log('Local Storage first line', products)
    //get data from local-storage-db
    const storedCart = getStoredCart();
    // console.log(storedCart);
    // here we store addedProduct evert time it loop
    const savedCart = [];
    //get id from storedCart
    /* Note: for in use in object */
    for (const id in storedCart) {
      //  console.log(id);
      /* Note: .find() use for if the condition is fulfill it show that items (find condition is like map) */
      const addedProduct = products.find((product) => product.id === id);
      //  console.log(addedProduct);
      //here if we get addedProduct we change quantity value
      if (addedProduct) {
        // console.log(addedProduct);
        // here we send id to the storedCart
        const quantity = storedCart[id];
        //now we added quantity to the added product quantity value
        addedProduct.quantity = quantity;
        // console.log(addedProduct);
        //here we push addedProduct data to the savedCart
        savedCart.push(addedProduct);
      }
    }
    //here we set savedCart new value to the setCart
    setCart(savedCart);
    // console.log('local storage finished')
    /* here [] dependency injection if [it empty] it call per component once */
    // [products] ar man joto bar change hoba toto bar call hoba
  }, [products]);

  // add to card function(in this () we can send any item that we want to show when clicked button)
  const handleAddToCart = (selectedProduct) => {
    //  console.log(product);
    let newCart = [];
    //here we want to know that product id and selected product is available we get exists value
    const exists = cart.find((product) => product.id === selectedProduct.id);
    // if not get exists product it change value as 1 .
    if (!exists) {
      selectedProduct.quantity = 1;
      // here we copy data from state array (using [... card,]) to compare old and new data then added that we get from compare
      // do  not do  this: cart.push(product);
      newCart = [...cart, selectedProduct];
    } else {
      //here we want to get remaining items
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      //exists quantity incise by 1
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    // send newCart data to  setCard
    setCart(newCart);
    // set data to local storage database (file> utilities> local-storage-db)
    addToDb(selectedProduct.id);
  };
  return (
    <div className="shop-container">
      {/* .products-container+.card-container */}
      <div className="products-container">
        {/* <h3>This is for products: {products.length}</h3> */}
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            //we can send function too
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart 
        cart={cart}
        clearCart={clearCart}>
          {/* to use link button go another page on click */}
          <Link to={"/orders"}>
            <button>Review Order</button>
          </Link>

        </Cart>
      </div>
    </div>
  );
};

export default Shop;
