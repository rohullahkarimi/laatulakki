import {css} from "styled-components"

export const largeLaptop = (props) => {
  return css`
    @media only screen and (max-width: 1800px) {
      ${props}
    }
  `;
};

export const laptop = (props) => {
  return css`
    @media only screen and (max-width: 1200px) {
      ${props}
    }
  `;
};

export const smallLaptop = (props) => {
  return css`
    @media only screen and (max-width: 950px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 800px) {
      ${props}
    }
  `;
};

export const smartPhone = (props) => {
  return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 390px) {
      ${props}
    }
  `;
};