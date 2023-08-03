import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import JuicerFeed from 'react-juicer-feed';
import {
    Container, Row, Col
} from 'react-bootstrap';
const demoFeedId = 'laatulakki';


  

const ContainerDiv = styled.div`
`

const Instagram = () => {
  

  return (
    <ContainerDiv>
        <Navbar/>
            <Container id="starter" style={{padding: "2% 0px 5% 0"}}>
                <Row>
                <Col md={12}>
                    <JuicerFeed feedId={demoFeedId} />
                </Col>
                </Row>
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default Instagram