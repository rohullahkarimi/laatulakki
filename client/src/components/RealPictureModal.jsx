import React, { useEffect, useState } from 'react'; // Make sure you have this import
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from "react-i18next";
import ImageGallery from 'react-image-gallery';
import { publicRequest } from '../requestMethods';




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
  const [graduationCapCustomizationOptions, setGraduationCapCustomizationOptions] = useState({});

  useEffect(() =>{
    const productId = "123456789"
    const getProduct = async ()=> {
      try {
          const res = await publicRequest.get("/products/findCustomProduct/" + productId);
          setGraduationCapCustomizationOptions(res.data);

      } catch (err) {
          console.log(err);
      }
    
    }
    getProduct()
  }, []);

  return (
    <>
      <Modal {...props}   
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {t("images")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <ImageGallery  items={graduationCapCustomizationOptions?.img}  showFullscreenButton={false} showPlayButton={false} showBullets={true} loading="lazy"/>
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