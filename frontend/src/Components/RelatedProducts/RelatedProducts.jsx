import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'

const RelatedProducts = (props) => {

  const [relatedProducts, setRelatedProducts] = useState([]);
  const {product} = props;

  useEffect(() => {
    console.log(product)
    // var category = props.product.category;
    // console.log(category.toLowerCase());
    fetch(`http://localhost:4000/related-${product.category}`)
    .then(res => res.json())
    .then(data => setRelatedProducts(data));
  }, [product]);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item,i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
