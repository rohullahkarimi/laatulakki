import styled from "styled-components"
import { notificationBar } from "../theme"
import { useTranslation } from "react-i18next";

const Container = styled.div`
    height: 30px;
    background-color: #${notificationBar};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Announcement = () => {
  const { t } = useTranslation();
  return (
    <Container>
        {t('announcement_text')}
    </Container>
  )
}

export default Announcement