import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from './locales/en/translationEn.json';
import translationFI from './locales/fi/translationFi.json';
import translationSV from './locales/sv/translationSv.json';


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({

    resources: {
      en: {translation: translationEN},
      fi: {translation: translationFI},
      sv: {translation: translationSV}
    },
    lng: "fi", 
    fallbackLng: "fi",
    interpolation: { escapeValue: false }
  });

export default i18n;