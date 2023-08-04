import React from 'react'; // Make sure you have this import
import Col from 'react-bootstrap/Col';
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useTranslation } from "react-i18next";
import { mobile } from '../responsive';



const InfoContainer = styled.div`
    flex: 1;
`

const Desc = styled.p`
    margin: 20px 0px;
`

const Iframe = styled.iframe`
    width: 560px;
    height: 315px;
    ${mobile({width: "auto", height: "auto"})}
`



const List = styled.ol`
    list-style-type: disclosure-closed; 
`
const ListItem = styled.li`
    
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
        {t("capChoice0")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col md={12}>
                <InfoContainer>
                    
                    <h4>{t("capChoice1a")}</h4>
                    <div>
                        <Iframe src="https://www.youtube.com/embed/FJJ7N287Mjs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                    </div>

                    <Desc>{t("capChoice1")}</Desc>

                    <List>
                        <ListItem>{t("capChoice2")}</ListItem>
                        <ListItem>{t("capChoice3")}</ListItem>
                        <ListItem>{t("capChoice4")}</ListItem>
                        <ListItem>{t("capChoice4a")}</ListItem>
                        <ListItem>{t("capChoice5")}</ListItem>
                    </List>

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