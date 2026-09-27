import { useEffect, useState } from 'react'
import './ProductList.css'
import cross_icon from '../../assets/cross_icon.png'

const ProductList = () => {

  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    await fetch("http://localhost:4000/all-products")
    .then(res => res.json())
    .then(data => {setAllProducts(data)});
  }

  useEffect(() => {fetchAllProducts();},[]);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/remove-product", {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({id:id})
    })
    await fetchAllProducts();
  }

  return (
    <div className='product-list'>
      <h1>All Products List</h1>
      <div className="products-list-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="products-list-allproducts">
        <hr />
        {allProducts.map((product,i) => {
          return <>
            <div key={i} className="products-list-format-main product-list-format">
              <img className='product-list-producticon' src={product.image} alt="" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => removeProduct(product.id)} className='product-list-removeicon' src={cross_icon} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ProductList
