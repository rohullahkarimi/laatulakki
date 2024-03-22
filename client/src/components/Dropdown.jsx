import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import "../common/css/slider2023.css"
import { Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const DropdownContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
  z-index: 1003;
`;

const DropdownContent = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%; /* Adjust as needed */
  max-width: 400px; /* Set a maximum width for the dropdown */
  height: 100%; /* Adjust as needed */
  display: flex;
  flex-direction: column;
  pointer-events: auto; /* Enable click events on the content */
`;

const DropdownHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
`;

const DropdownTitle = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #333;
`;

const CategoryContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  width: 100%;
  position: relative;
`;


const ActionButton = styled.button`
  position: absolute;
  width: 80%;
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Center the button within its container */
  background-color: #1b1b1b; /* Background color on hover */
  border: 1px solid white; /* Border style */
  padding: 5px 10px; /* Padding for button */
  cursor: pointer;
  font-size: 14px;
  color: white;
  z-index: 2;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;


  &:hover {
    background-color: #1b1b1b; /* Background color on hover */
    color: #fff; /* Text color on hover */
    border-color: transparent; /* Border color on hover */
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  filter: brightness(95%); /* Apply brightness filter to darken the image */
`;
const CategoryTitle = styled.h4`
  font-size: 14px;
  margin: 0;
`;

const DropdownList = styled.ul`
  list-style: none;
  padding: 0 10px;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto; /* Enable scrolling for long lists */
`;

const DropdownItem = styled.li`
  padding:  10px 0;
  border-top: 1px solid rgb(156, 160, 156);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownItemA = styled.a`
  color: inherit;
  font-weight: 500;
  font-size: 18px;
`;

const Dropdown = ({ isOpen, onClose, items, logoSrc, categoryTitle, categoryImageUrl }) => {
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  const handleBackgroundClick = (e) => {
    if (e.target === dropdownRef.current) {
      onClose();
    }
  };


  if (!isOpen) {
    return null;
  }

  return (
    <DropdownContainer ref={dropdownRef} onClick={handleBackgroundClick}>
      <DropdownContent>
        <DropdownHeader>
          <img src={logoSrc} alt="Logo" style={{ maxHeight: '35px' }} />
          <CloseButton onClick={onClose}>
            <Close/>
          </CloseButton>
        </DropdownHeader>
        <CategoryContainer>
        <CategoryImage src={categoryImageUrl} alt="Category Image" />
          <Link to="/ylioppilaslakki">
            <ActionButton>{t('designYours').toUpperCase()} <i className="bx bx-right-arrow-alt"></i></ActionButton>
          </Link>
          <CategoryTitle>{categoryTitle}</CategoryTitle>
        </CategoryContainer>
        <DropdownList>
          {items.map((item, index) => (
            <DropdownItemA key={index} href={item.url}>
              <DropdownItem>
                <DropdownItemA href={item.url}>{item.text}</DropdownItemA>
              </DropdownItem>
            </DropdownItemA>
          ))}
        </DropdownList>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
