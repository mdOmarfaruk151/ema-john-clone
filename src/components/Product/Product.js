import React from 'react';
// from react fontawsame
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import css file
import './Product.css';

// we can write this as a shortcut way to skip line //*1
const Product = ({product,handleAddToCart}) => {

// const Product = (props) => {
    // we can send function to the props too 
//    const {product,handleAddToCart} =props; //*1 
    const {name, img, seller, price, ratings} =product;

    return (
        <div className='product'>
            <img src={img} alt="" />
           <div className='product-info'>
           <p className='product-name'> {name}</p>
            <p>Price: ${price}</p>
            <p><small>Seller: {seller}</small></p>
            <p><small>Ratings: {ratings} Stars</small></p>
           </div>
           
           <button onClick={() =>handleAddToCart(product)} className='btn-cart'>
            <p className='btn-text'>Add to Cart</p>
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;