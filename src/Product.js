import SingleProduct from "./SingleProduct";
import "./Product.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from './config'

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("category");

  const getData = async () => {
    try {
      let url = `${API_URL}/product/list`;

      if (categoryId) {
        url = `${API_URL}/product/by/category?id=${categoryId}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log("Fetched products:", result);

     
      setProducts(result.list || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); 
    }
  };

  useEffect(() => {
    getData();
  }, [categoryId]);

  return (
    <div className="Products">
      <div className="products_container">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((item) => (
            <SingleProduct
              key={item._id}
              id={item._id}
              file={item.image}
              category={item.category}
              brand={item.brand}
              price={item.price}
              name={item.name}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;