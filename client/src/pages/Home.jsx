import Announcement from '../components/Announcement'
//import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'
import ReactPixel from 'react-facebook-pixel';
import { hotjar } from 'react-hotjar';
import {getCookie} from "../common/js/common.js";
import ReactGA from "react-ga4";

// page view
ReactPixel.pageView(); // For tracking page view

/* Juicer
import styled from "styled-components";
import JuicerFeed from 'react-juicer-feed';
const demoFeedId = 'laatulakki';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

<Container>
<JuicerFeed feedId={demoFeedId} />
</Container>
*/

// <Categories/>
const Home = () => {

  // call hotjar if user accepted preferences cookie
  if(getCookie("rcl_preferences_consent") === "true"){
      hotjar.initialize(3220042, 6)
      hotjar.identify('USER_ID', { userProperty: 'value' });

      // Send pageview with a custom path
      ReactGA.send({ hitType: "pageview", page: "/home" });
    
  }

  return (
    <div>
        <Announcement/>
        <Navbar/>
        <Slider/>
        
        <Products/>
        <div className="commonninja_component pid-5f13afcd-6d5d-46d5-b13e-04033b8c7ede"></div>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home