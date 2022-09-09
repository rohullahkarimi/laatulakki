//import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Paytrail from "./pages/paytrail-example";
import Terms from "./pages/Terms_and_condition";
import RegistrationStatement from "./pages/Registration_statement";
import ChangeAndRefund from "./pages/Change_and_refund";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state)=> state.user.currentUser);


  
  return (
    <Router>
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

        <Route path="/paytrail" element={<Paytrail />} />
        <Route path="/terms_and_condition" element={<Terms />} />
        <Route path="/registration_statement" element={<RegistrationStatement />} />
        <Route path="/change_and_refund" element={<ChangeAndRefund />} />
        
      </Routes>
    </Router>
  );
};

// <Route path="/paytail" element={<Paytrail />} />

export default App;