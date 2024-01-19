import React from 'react'; // Make sure you have this import
import '../common/css/style.css';
import styled from 'styled-components';
import {Helmet} from "react-helmet";


const ReviewContainer  = styled.div`
  width: 100%;
`;
const Reviews  = styled.div`
`;
const GoogleReviews = () => { 

   return (
    <ReviewContainer>
        <Helmet>
            <script src="https://cdn.commoninja.com/sdk/latest/commonninja.js" defer></script>
        </Helmet>
         
        <Reviews className="commonninja_component pid-5f13afcd-6d5d-46d5-b13e-04033b8c7ede"></Reviews>
    </ReviewContainer>
  )
}

export default GoogleReviews