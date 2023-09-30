import React from 'react';
import styled from "styled-components"
import CategoryItem from './CategoryItem'
import { mobile, smartPhone, tablet } from '../responsive'

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({padding: "0px", flexDirection: "column"})}
    ${smartPhone({padding: "0px", flexDirection: "column"})}
    ${tablet({padding: "0px", flexDirection: "column"})}
`

const Categories = () => {
  return (
    <Container>
        <CategoryItem/>
    </Container>
  )
}

export default Categories