import React from 'react';
import '../common/css/CallToAction.css'; // Import the CSS file

const CallToActionButton = () => {

    const goToShopPage = () => {
        window.location.replace('https://www.laatulakki.fi/ylioppilaslakki');
    };

      
  return (
    <div className="CTAContainer">
      <h2 className="CTAButtonTitle">Et löytänyt sopivaa käytettyä ylioppilaslakkia?</h2>
      <p className="CTAButtonSubtitle">Voit tilata meiltä perinteisen tai kustomoitu ylioppilaslakin</p>
      <button className="CTAButton" onClick={goToShopPage}>Osta nyt</button>
    </div>

  );
};

export default CallToActionButton;
