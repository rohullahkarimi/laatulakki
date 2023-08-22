import React from 'react'; // Make sure you have this import
import Announcement from '../components/Announcement'
//import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import ReactPixel from 'react-facebook-pixel';
import { hotjar } from 'react-hotjar';
import {getCookie} from "../common/js/common.js";
import ReactGA from "react-ga4";
import Slider2023 from '../components/Slider2023'
import GoogleReviews from '../components/GoogleReviews';

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
        <Slider2023/>
        
        <Products/>
        <GoogleReviews/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home