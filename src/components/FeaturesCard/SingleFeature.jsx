import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../Products/Products';

export default function SingleFeature() {
  const { name } = useParams();
  const [singleFeature, setSingleFeature] = useState([]);

  useEffect(() => {
    const fetchSingleFeature = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setSingleFeature(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchSingleFeature();
  }, [name]);

  if (singleFeature.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <Products products={singleFeature} />
    </div>
  );
}
