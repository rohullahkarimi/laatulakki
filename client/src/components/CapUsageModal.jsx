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

const Desc = styled.p`
    margin: 20px 0px;
`



const H3 = styled.h3`
    
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
      <Modal {...props}   
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {t("capUsage0")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
             <Col md={12}>
                    <InfoContainer>

                        
                        <H3>{t("capUsage1")}</H3>
                        <Desc>{t("capUsage2")}</Desc>
                        <Desc>{t("capUsage2a")}</Desc>

                        <H3>{t("capUsage3")}</H3>
                        <Desc>{t("capUsage4")}</Desc>


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