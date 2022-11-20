//import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Product from "./pages/Product";
//import Contact from "./pages/CartProduct";
import ProductList from "./pages/ProductList";
import Paytrail from "./pages/paytrail-example";
import Terms from "./pages/Terms_and_condition";
import RegistrationStatement from "./pages/Registration_statement";
import ChangeAndRefund from "./pages/Change_and_refund";
import TermsOfDelivery from "./pages/Terms_of_delivery";
import CapChoice from "./pages/Cap_choice";
import CapUsage from "./pages/Cap_usage";
import Receipt from "./pages/Receipt";
import PaymentPage from "./pages/Payment_response";
import { CookieBanner } from "@palmabit/react-cookie-law";
import { useTranslation } from 'react-i18next';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

import ReactGA from "react-ga4";
ReactGA.initialize("G-D2D2QPJM81");

const App = () => {
  const { t } = useTranslation();
  const user = useSelector((state)=> state.user.currentUser);


  
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />

        <Route path="/login" element={
          user ? <Navigate to="/" />: <Login/>
        }/>
        <Route path="/register" element={
          user ? <Navigate to="/" />: <Register/>
        }/>

        <Route path="/pay" element={<Paytrail />} />
        <Route path="/terms_and_condition" element={<Terms />} />
        <Route path="/registration_statement" element={<RegistrationStatement />} />
        <Route path="/change_and_refund" element={<ChangeAndRefund />} />
        <Route path="/cart/success" element={<PaymentPage/>} />
        <Route path="/cart/cancel" element={<PaymentPage/>} />
        <Route path="/terms_of_delivery" element={<TermsOfDelivery/>} />
        <Route path="/cap_choice" element={<CapChoice/>} />
        <Route path="/cap_usage" element={<CapUsage/>} />
        <Route path="/receipt" element={<Receipt/>} />
      </Routes>
      <CookieBanner
        message={t('cookies_Message')}
        wholeDomain={true}
        policyLink="/terms_and_condition"
        privacyPolicyLinkText= {t('cookies_privacyPolicyLinkText')}

        necessaryOptionText= {t('cookies_necessaryOptionText')}
        preferencesOptionText = {t('cookies_preferencesOptionText')}
        statisticsOptionText = {t('cookies_statisticsOptionText')}
        marketingOptionText = {t('cookies_marketingOptionText')}
      
        showDeclineButton = {true}
        acceptButtonText = {t('cookies_acceptButtonText')}
        declineButtonText = {t('cookies_declineButtonText')}
        managePreferencesButtonText = {t('cookies_managePreferencesButtonText')}
        savePreferencesButtonText= {t('cookies_savePreferencesButtonText')}
        
        
        

        onAccept={() => {}}
        onAcceptPreferences={() => {}}
        onAcceptStatistics={() => {}}
        onAcceptMarketing={() => {}}

        styles={{
          dialog: { 
            backgroundColor: "#8effff", 
            position: "fixed",
            top: "35%",
            left: "0px",
            right: "0px",
            zIndex: 100000,
            padding: "10px",
            width: "fit-content",
            margin: "auto",
          },
          buttonWrapper: {
            float: "right",
            marginTop: "10px",
          },
          button: {
            display: "inline-block",
            backgroundColor: "#000",
            padding: "5px",
            minWidth: "80px",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "400",
            marginRight: "5px",
            marginLeft: "5px",
            textAlign: "center",
            whiteSpace: "nowrap",
            cursor: "pointer",
            border: "none",
          },
          optionLabel: {
            height: "auto",
            width: "auto",
            minHeight: "14px",
            fontSize: "12pt",
            color: "#000",
            display: "inline-block",
            padding: "1px 0px 0px 20px",
            position: "relative",
            top: "0px",
            left: "0px",
            zIndex: 1,
            cursor: "default",
            verticalAlign: "top",
          },
          policy: {
            fontSize: "14px",
            color: "#000",
            textDecoration: "underline",
          }
        }}
      />
    </Router>
  );
};

// <Route path="/paytail" element={<Paytrail />} />

export default App;