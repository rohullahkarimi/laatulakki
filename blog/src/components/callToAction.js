// CallToActionButton.jsx

import React from 'react';
import './css/CallToActionButton.css'; // Import the CSS file

const CallToActionButton = () => {

    const goToShopPage = () => {
        window.location.replace('https://www.laatulakki.fi');
    };

      
  return (
    <div className="CTAContainer">
      <h2 className="CTAButtonTitle">KUSTOMOIDUT YLIOPPILASLAKIT</h2>
      <p className="CTAButtonSubtitle">Suomen edullisimmat kustomoidut ylioppilaslakit ilman pitkiä toimitusaikoja</p>
      <button className="CTAButton" onClick={goToShopPage}>Osta Nyt</button>
    </div>
  );
};

export default CallToActionButton;
