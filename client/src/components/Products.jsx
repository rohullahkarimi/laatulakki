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

const Products = ({cat, filters, sort, selectedProduct}) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });


  
  useEffect(() =>{
    const getProducts = async ()=>{
      try{
        const res = await axiosInstance.get(
          cat 
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

  useEffect(()=>{
    cat && 
    setFilteredProducts(
      products.filter(item=>
        Object.entries(filters).every(([key, value])=>
          item[key].includes(value)
        )  
      )
    ); 
  },[products, cat, filters]);

  useEffect(()=>{
    cat && 
    setFilteredProducts(
      products.filter(item=>
        Object.entries(filters).every(([key, value])=>
          item[key].includes(value)
        )  
      )
    ); 
  },[products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "cheapest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if(sort === "most_expensive") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    } 
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => item._id !== selectedProduct && <Product item={item} key={item._id} />)}
    </Container>
  );
}

export default Products