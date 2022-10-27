import { getStoredCart } from "../utilities/local-storage-db";
// here we make this function to export it through A loader -
export const productsAndCartLoader = async () =>{
    // async use for await 
   // get Products
   const productsData = await fetch('products.json');
   // we convart this products data as json to use down functions
  const products = await productsData.json();

  // get cart
  const savedCart = getStoredCart();
  // normal array 
  const initialCart = [];
//  console.log('savedCart', savedCart);
// get id from saved cart
for(const id in savedCart){
    // console.log(id);
    // find id from product and if equal to saved cart id it show
    const addedProduct = products.find(product => product.id === id);
    // console.log(id, addedProduct);
    if(addedProduct){
        const quantity = savedCart[id];
    //    console.log(id, quantity);
    // set savedCart quantity to quantity
    addedProduct.quantity = quantity;
    // push use only normal array not a state
    initialCart.push(addedProduct);
    }
}
// return a object 
  return {products, initialCart};
  // it can be write this way too
//   return {products: products, initialCart: initialCart};
}