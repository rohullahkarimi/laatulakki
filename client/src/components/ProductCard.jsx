import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";



const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  text-decoration: none !important;
`;

const Price  = styled.div`
font-size: 16px;
text-align: center;
text-decoration: none !important;
`;

const ProductCard = props => {
  const productTitleForUrl = props.title.replace(/\s+/g, '-').toLowerCase();

  return (
    <Link to={`/product/${productTitleForUrl}/${props.productid}`}>
      <Card style={{ width: "inherit", minHeight: "270px" }}>
        <Card.Img variant="top" src={props.imgSrc} alt={props.imgAlt} height="400" width="600" />
        <Card.Body>
          <Title>
          {
            props.title.length > 40
              ? props.title.substring(0, 40) + "..."
              : props.title
          }
          </Title>
          <Price>
            {props.price.toFixed(2)} €
          </Price>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
