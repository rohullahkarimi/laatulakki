import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translationEn.json';
import translationFI from './locales/fi/translationFi.json';
import translationSE from './locales/se/translationSe.json';

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage']
};

i18n
   // detect user language
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({

    resources: {
      en: {translation: translationEN},
      fi: {translation: translationFI},
      se: {translation: translationSE}
    },
    //lng: "fi", 
    fallbackLng: "fi",
    detection: DETECTION_OPTIONS,
    interpolation: { escapeValue: false }
  });

export default i18n;