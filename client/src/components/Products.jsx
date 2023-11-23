import React from 'react'; // Make sure you have this import
import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
//import { popularProducts } from "../data"
import Product from "./Product"
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({used, cat, filters, selectedProduct, cartProductId}) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])


  

  useEffect(() =>{
    const getProducts = async ()=>{
      try{
        const res = await axios.get(
          used 
            ?  process.env.REACT_APP_API_URL+`/products?category=used`
            : cat 
              ? process.env.REACT_APP_API_URL+`/products?category=${cat}` 
              : process.env.REACT_APP_API_URL+`/products`
        );
        setProducts(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getProducts()
  },[cat]);


  useEffect(() => {
    if (cat || filters && Object.keys(filters).length > 0) {
      setFilteredProducts(
        products.filter((item) => {
          //const productSizes = item.size.map((size) => size.name);
  
          // Check if the selected size has storage greater than 0
          const selectedSizeHasStorage = filters.size && item.size.find((size) => size.name === filters.size)?.storage > 0;
  
          // Check other filter conditions (you can add more conditions as needed)
          const otherFiltersPassed = Object.entries(filters).every(
            ([key, value]) => {
              if (key === 'size') {
                // Skip the size filter condition here since it's already checked
                return true;
              }
              if (key === 'brand') {
                // Check if the selected brand is included in the product's categories
                return item.categories.includes(value);
              }
              if (Array.isArray(item[key])) {
                // Check if item[key] is an array before using the includes method
                return item[key].includes(value);
              }
              // Handle other cases where item[key] is not an array
              return item[key] === value;
            }
          );
  
          // Return true if all filter conditions are met, including size, storage, and other conditions
          return (selectedSizeHasStorage || !filters.size) && otherFiltersPassed;
        })
      );
    }
  }, [products, cat, filters]);
  
  
  
  /*
  useEffect(() => {
    if (filters) {
      if (filters.sort === "newest") {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.createdAt - b.createdAt)
        );
      } else if (filters.sort === "cheapest") {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        );
      } else if(filters.sort === "most_expensive") {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
      } 
    }
  }, [filters]);
  */


  return (
    <Container>
    {(cat || filters && Object.keys(filters).length > 0)  // Check if cat or filters exist
      ? filteredProducts.map((item) => <Product used={used} item={item} key={item._id} />)
      : products
          .slice(0, 8)
          .filter((item) => used || !item.categories.includes("used")) // Exclude used products when used is false
          .map((item) => item.visibility === true && item._id !== selectedProduct && <Product used={used} item={item} key={item._id} />)}
    </Container>
  );
}

export default Products