import React, { useEffect, useState } from 'react';
import './RelatedProducts.css';
import Item from '../Item/Item';
import { backend_url } from '../../App';

const RelatedProducts = ({ category, id }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`${backend_url}/relatedproducts`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch related products');
        }
        const data = await response.json();
        setRelated(data);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, [category]); 

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.length > 0 ? (
          related.map((item, index) => {
            if (id !== item.id) {
              return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
            }
            return null; 
          })
        ) : (
          <p>Loading related products...</p> 
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
