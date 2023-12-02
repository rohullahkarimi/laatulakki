import React from 'react';
import '../common/css/callToAction.css'; // Import the CSS file
import { useTranslation } from 'react-i18next';

const CallToActionButton = () => {
  const { t } = useTranslation();

    const goToShopPage = () => {
        window.location.replace('https://www.laatulakki.fi/ylioppilaslakki');
    };

      
  return (
    <div className="CTAContainer">
      <h2 className="CTAButtonTitle">{t('usedTitle')}</h2>
      <p className="CTAButtonSubtitle">{t('usedP')}</p>
      <button className="CTAButton" onClick={goToShopPage}>{t('buy_now')}</button>
    </div>

  );
};

export default CallToActionButton;
