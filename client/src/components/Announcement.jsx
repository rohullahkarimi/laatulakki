import styled from "styled-components"
import { notificationBar } from "../theme"

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
  return (
    <Container>
        Toimitusaika 2-4 arkipäivää!
    </Container>
  )
}

export default Announcement