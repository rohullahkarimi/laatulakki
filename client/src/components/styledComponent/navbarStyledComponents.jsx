import styled from "styled-components";
import { mobile, smartPhone, tablet, laptop, largeLaptop, smallLaptop } from "../../responsive"
import { brandColor } from '../../theme';

export const Container = styled.div`
    height: 60px;
    padding: 0 15%;
    border-bottom: 1px solid #e9e8e8;
    position: relative; /* Add this line */
    z-index: 10; /* Add this line */
    ${largeLaptop({padding: "0px 10%"})}
    ${laptop({padding: "0px 5%"})}
    ${tablet({padding: "0px"})}
    ${smartPhone({flexDirection: "column", padding: "0px"})}
    ${mobile({height: "50px"})}
`

export const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding: "10px 0px"})}
`

export const Left = styled.div`
    flex: 1;
    display: flix;
    align-items: center;
    margin-left: 0;
`;

export const Language = styled.select`
    font-size: 18px;
    cursor: pointer;
    border: none;
    outline: none;
    appearance: none;
    border-bottom: 2px solid #${brandColor};
    ${mobile({fontSize: "14px", marginLeft: "10px"})}


`
export const LogoHiderL = styled.div`
  display: block;
  ${tablet({display: "none"})}
`;

export const LogoHiderC = styled.div`
  display: none;
  ${tablet({display: "block"})}
`;


export const LanguageOption = styled.option`
`

export const Center = styled.div`
    flex: 1;
    text-align: center;
`;

export const Logo = styled.img`
    width: 140px;
    height: "auto";
    cursor: pointer;
    margin: auto;
    ${smartPhone({width:"120px"})}
    ${mobile({width:"93px"})}
`

export const AvainlippuContainer = styled.div`
    display: flex; 
    align-items: center; 
    justify-content: center;
    cursor: pointer;
`
export const Avainlippu = styled.img`
    width: auto;
    height: 30px;
    cursor: pointer;
    margin: 0;
    padding: 0 10px;
    ${tablet({height:"30px", padding: "0 5px"})}
`

export const FinnishService = styled.div`
    font-size: 18px;
    font-weight: 600;
    ${laptop({fontSize:"14px"})}
    ${tablet({fontSize:"12px"})}
`


export const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({marginRight: "15px"})}
`;

export const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 10px;
    ${mobile({fontSize: "12px", marginLeft: "0px"})}
`;

export const LangDiv = styled.div`
    display: flex;
`;


export const Hamburger = styled.div`
  font-size: 16px;
  cursor: pointer;
  display: none; /* Initially hide the hamburger menu on larger screens */
  ${tablet({ display: "block" })} /* Show it on mobile */
  ${mobile({ marginLeft: "15px" })} /* Show it on mobile */
`;

export const ItemsListContainerDesktop = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #e9e8e8;
    padding: 0; /* Reset padding to 0 */
    margin: 0; /* Reset margin to 0 */
    ${tablet({ display: "none" })} /* Show it on mobile */
   
`;