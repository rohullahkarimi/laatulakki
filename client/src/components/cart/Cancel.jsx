import { CancelSharp } from "@mui/icons-material";
import styled from "styled-components"
import { mobile } from "../../responsive"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";





const InfoContainer = styled.div`
    text-align: center;
    padding: 0px 50px;
    margin: 10% 0;
    ${mobile({padding: "10px"})}
`

const Title = styled.h2`
    text-align: center;
    margin-bottom: 4%;
`


const IconHolder = styled.div`
    text-align: center;
`

const Desc = styled.p`
    margin: 20px 0px;
`


const Button = styled.button`
  padding: 10px;
  font-weight: 600;
  width: 120px;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Success = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();
 
 
  return (
    <InfoContainer>
      <IconHolder>
          <CancelSharp     
              size="50px"
              sx={{color: "red", fontSize: "60px"}}
          />
      </IconHolder>
      
      <Title>{t("orderCancelled")}</Title>
      <Desc>{t("sorryMessage")}</Desc>
      <Button onClick={() =>navigate("/cart")} type="filled">{t("cart")}</Button>
    </InfoContainer>
  );
};

export default Success;
