import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Body from "./Body";
import Bag from "../componentitem/Bag";
import Footer from "./Footer";
import LoginAndSignIn from "./LoginAndSignIn";
import { React, useState } from "react";
import AppItem from "../componentitem/AppItem";
import MyOrder from "../componentitem/MyOrder";
import CreateOrder from "../componentitem/CreateOrder";
import AccountProfile from "../componentitem/AccountProfile";
function App() {
  let auth = JSON.parse(localStorage.getItem("auth"));
  if (auth === null) {
    auth = false;
  } else {
    auth = true;
  }
  const [isLoginInstance, setLogin] = useState(auth);
  function handleLogin(opt) {
    console.log(opt)
    setLogin(opt)
  }
  const [hideLogin, setHideLogin] = useState(false);
  const changeHideLogin = () => {
    setHideLogin(!hideLogin);
  };
  const [loginAndSign, setLoginSignIn] = useState(false);
  const loginSignin = (type) => {
    if (type === 1) {
      const login = document.querySelector(".login");
      if (!login.classList.contains("activeLoginSignin")) {
        document.querySelector(".signin").classList.remove("activeLoginSignin");
        login.classList.add("activeLoginSignin");
        setLoginSignIn(false);
      }
    }
    if (type === 2) {
      const login = document.querySelector(".signin");
      if (!login.classList.contains("activeLoginSignin")) {
        document.querySelector(".login").classList.remove("activeLoginSignin");
        login.classList.add("activeLoginSignin");
        setLoginSignIn(true);
      }
    }
  };
  return (
    <>
      <Header changeHideLogin={changeHideLogin} isLoginInstance={isLoginInstance} handleLogin={handleLogin} />
      <Routes>
        <Route path="/" element={<Body />}></Route>
        <Route path="/product-item/:id" element={<AppItem changeHideLogin={changeHideLogin} />}></Route>
        <Route path="/account-bag/:id" element={<Bag />}></Route>
        <Route path="/my-order/:id" element={<MyOrder />}></Route>
        <Route path="/my-profile/:id" element={<AccountProfile />}></Route>
        <Route path="/create-order" element={<CreateOrder />}></Route>
      </Routes>
      <Footer />
      <LoginAndSignIn
        hideLogin={hideLogin}
        changeHideLogin={changeHideLogin}
        loginAndSign={loginAndSign}
        loginSignin={loginSignin}
        handleLogin={handleLogin}
      />
    </>
  );
}
export default App;
