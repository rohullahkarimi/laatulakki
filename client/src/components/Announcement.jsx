import styled from "styled-components"
import { notificationBar } from "../theme"
import { useTranslation } from "react-i18next";
import { smartPhone } from "../responsive"
import { useEffect, useRef, useState } from "react";
import { publicRequest } from "../requestMethods";
import { format } from 'date-fns';

const Container = styled.div`
    height: 30px;
    background-color: #${notificationBar};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    ${smartPhone({height: "47px", textAlign: "center"})}
`

const Announcement = () => {
  const { t } = useTranslation();
  const freeDelivery = useRef(false);
  const [setting, setSetting] = useState({
    "status": false,
    "expire": "2023-02-22",
  })


  useEffect(() => {
    // get setting data
    const getSetting = async ()=> {
      try{
          const res = await publicRequest.get("/setting");
          
          let updatedValue = {};
          updatedValue = {
            status: res.data[0].status,
            expire: res.data[0].expire,
          };
          
          setSetting(setting => ({
            ...setting,
            ...updatedValue
          }));
          
      }catch(err){
          console.log(err)
      }
    }
    getSetting()
  }, [])

  // check delivery price
  const checkDeliveryCost = () => {
    if(setting.status === true){
      var ExpireDate =  setting.expire;
      var CurrentDate = new Date();
      ExpireDate = new Date(ExpireDate);

      if(CurrentDate > ExpireDate){
        freeDelivery.current = false;
      }else{
        freeDelivery.current = true;
      }
    }else{
      freeDelivery.current = false;
    }
  }
  checkDeliveryCost()


  return (
    <Container>
        {freeDelivery.current === true ? t("freeDeliveryMessage", {deliveryDateExpire : format(new Date(setting.expire), 'dd.MM.yyyy')}) : t('announcement_text')}
    </Container>
  )
}

export default Announcement