import React from 'react'; // Make sure you have this import
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar"; 
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import OrderPage from "./pages/orderPage/Orderpage";
import Login from "./pages/login/Login";
import jwt_decode from "jwt-decode";


function App() {
  
  const CheckIfTokenExpired = () => {
    const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser?.accessToken;
    if(token){
      if (jwt_decode(token).exp < Date.now() / 1000) {
        console.log("expired")
        localStorage.clear();
      }else{
        console.log("not expired")
      }
    }
  }

  const isAdmin = () => {
    CheckIfTokenExpired();
    const persistRoot = JSON.parse(localStorage.getItem('persist:root'));

    if (persistRoot) {
      return JSON.parse(persistRoot.user).currentUser?.isAdmin;
    }else{
      return false;
    }
  }

  //const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.isAdmin;


  
  
  return (
    <Router>
      <Switch>
    

      { isAdmin() ? (
        <>
      <Topbar />
      <div className="container">
        <Sidebar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/orderPage">
            <OrderPage />
          </Route>
          

        </div>
        </>
      )
      :   <Login />
      }
      </Switch>
    </Router>
  );
}

export default App;
