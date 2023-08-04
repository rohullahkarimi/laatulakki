import React from 'react'; // Make sure you have this import
import Col from 'react-bootstrap/Col';
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import CartProduct from '../components/cart/CartProduct';


const PlatformButton = styled.button`
  padding: ${(props) =>
    props.type === "filled" ? "10px" : "8px"};
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;






const EmptyCartText = styled.div`
  text-align: center;
  font-size: 20px;
`;



const CartModal = (props) => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate()
  const { t } = useTranslation();
 

  
 
  function CartNotEmpty() {
    return (
      
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {t("cart")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
          <Row>
            <Col xs={12} md={12}>
              <div>
                <CartProduct/>
              </div>
            </Col>
          </Row>
      </Modal.Body>
      <Modal.Footer>
        <PlatformButton onClick={props.onHide}>{t("continue_shopping")}</PlatformButton>
        <PlatformButton type="filled" onClick={()=>navigate("/cart")}>{t("checkout")}</PlatformButton>
      </Modal.Footer>
    </Modal>
  
    )
  }
  
  function CartEmpty() {
    return (
    
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {t("cart")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={12}>
              <div>
              <EmptyCartText>{t("yourCartIsEmpty")}</EmptyCartText>
              </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <PlatformButton onClick={props.onHide}>{t("continue_shopping")}</PlatformButton>
        </Modal.Footer>
        </Modal>
      
    )
  }
  
  return (
    <div>
    {cart.quantity === 0 
      ? <CartEmpty/>
      : <CartNotEmpty/>
    }
    </div>
  );
}


export default CartModal