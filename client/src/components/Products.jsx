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

const Products = ({cat, filters, sort, selectedProduct, cartProductId}) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])



  useEffect(() =>{
    const getProducts = async ()=>{
      try{
        const res = await axios.get(
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



  /*
  useEffect(()=>{
    cat && 
    setFilteredProducts(
      products.filter((item)=> {
        //console.log(item)

        var productSizes = []; 
        item.size.map((size)=>{
          console.log(size.name)
          productSizes.push(size.name)
        })
        console.log(productSizes)


        Object.entries(filters).every(([key, value])=>{
          //console.log(item[key][0].name)
          //console.log(value)
          item[key].includes(value)
        })  
      })
    ); 
  },[products, cat, filters]);
  */
  
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

  console.log(products)
  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => item.visibility === true && item._id !== selectedProduct && <Product item={item} key={item._id} />)}
    </Container>
  );
}

export default Products