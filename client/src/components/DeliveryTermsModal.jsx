import React from 'react'; // Make sure you have this import
import Col from 'react-bootstrap/Col';
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useTranslation } from "react-i18next";


const InfoContainer = styled.div`
    flex: 1;
`


const H3 = styled.h3`
    
`

const Desc = styled.p`
    margin: 20px 0px;
`

const Strong = styled.strong`
`


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




const DeliveryTermsModal = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {t('deliveryTerms_0')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
          <Col md={12}>
              <InfoContainer>
                  <H3>{t('deliveryTerms_1')}</H3>
                  <Desc>{t('deliveryTerms_2')}</Desc>

                  <H3>{t('deliveryTerms_3')}</H3>

                  <Strong>{t('deliveryTerms_4')}</Strong>
                  <Desc>{t('deliveryTerms_5')}</Desc>

                  <Desc>{t('deliveryTerms_6')}</Desc>
                  <Desc>{t('deliveryTerms_7')}</Desc>

              </InfoContainer>
          </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <PlatformButton onClick={props.onHide}>{t('close')}</PlatformButton>
      </Modal.Footer>
      </Modal>
    </>
  )
}


export default DeliveryTermsModal