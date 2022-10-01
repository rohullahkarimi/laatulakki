import Col from 'react-bootstrap/Col';
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { mobile, tablet} from "../responsive";
import { useTranslation } from "react-i18next";


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


const Hr = styled.hr`
  background-color: #b0b0b0;
  border: none;
  height: 1px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${tablet({ flexDirection: "column", alignItems: "center" })}
`;

const Image = styled.img`
  width: 40%;
  height: auto;
  object-fit: contain;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;


const ProductColor = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;

const ProductQuantity = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;


const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;



const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;


const ProductPriceText = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;

const CartModal = (props) => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate()
  const { t } = useTranslation();

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
            <div >
              {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img[0].thumbnail} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title?.replace("<br>"," / ")}
                    </ProductName>
                    <ProductColor><b>Color:</b> {product.color}</ProductColor>
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                    <ProductQuantity>
                      <b>Kpl:</b> {product.quantity}
                    </ProductQuantity>
                    <ProductPriceText>
                      <b>Price per piece:</b> {product.price.toFixed(2)} €
                    </ProductPriceText>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice>
                    {(product.price * product.quantity).toFixed(2)} €
                  </ProductPrice>
                </PriceDetail>
                <Hr/>
              </Product>
              ))}
            </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <PlatformButton onClick={props.onHide}>{t("continue_shopping")}</PlatformButton>
        <PlatformButton type="filled" onClick={()=>navigate("/cart")}>{t("checkout")}</PlatformButton>
      </Modal.Footer>
    </Modal>
  );
}


export default CartModal