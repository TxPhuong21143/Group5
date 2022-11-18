import "../css/Header.css";
import { React, useRef, useState } from "react";
import { Link } from "react-router-dom";
function Header({ changeHideLogin, isLoginInstance, handleLogin }) {
  return (
    <div className="header">
      <div className="app-header">
        <HeaderLeft />
        <HeaderRight changeHideLogin={changeHideLogin} isLoginInstance={isLoginInstance} handleLogin={handleLogin} />
      </div>
    </div>
  );
}

function HeaderLeft() {
  return (
    <>
      <div className="app-header-left float-left">
        <Link to={"/"}>
          <img id="logo-header" src={require("../resour/logo.png")} alt="" /></Link>
      </div>
    </>
  );
}
function HeaderRight({ changeHideLogin, isLoginInstance, handleLogin }) {
  function removeAuth() {
    localStorage.removeItem("auth");
    handleLogin(false)
  }
  return (
    <>
      <div className="app-header-right float-left">
        <div className="web-option">
          <div className="header-webOpt">
            <div className="header-goForm loGin-after hoverCommon">
              {isLoginInstance ? (
                <LoginAccessed removeAuth={removeAuth} />
              ) : (
                <Login changeHideLogin={changeHideLogin} />
              )}
            </div>
            <div className="header-goForm afterRight-1px header-fb">
              <span>FB: Team 5</span>
            </div>
          </div>
        </div>
        <div className="navigator-header">
          <div className="header-webOpt">
            <Link to="/" className="nav-item hoverNav hoverCommon">SẢN PHẨM</Link>
            <div className="nav-item hoverNav hoverCommon">BỘ SƯU TẬP</div>
            <div className="nav-item hoverNav hoverCommon">FASHION SHOW</div>
            <div className="nav-item hoverNav hoverCommon">SIXCLUB</div>
            <div className="nav-item hoverNav hoverCommon">GIỚI THIỆU</div>
            <div className="nav-item hoverNav hoverCommon">CỬA HÀNG</div>
          </div>
        </div>
      </div>
    </>
  );
}
function Login({ changeHideLogin }) {
  return <span onClick={() => changeHideLogin()}>Login</span>;
}
function LoginAccessed({ removeAuth }) {
  const account = JSON.parse(localStorage.getItem("auth"));

  const accountNavs = useRef(0);
  function handleAccountNav(opt) {
    if (opt === 1) {
      accountNavs.current.classList.add("active");
    }
    if (opt === 2) {
      accountNavs.current.classList.remove("active");
    }
  }
  return (
    <>
      <span
        className="account-accsessed"
        onMouseOver={function () {
          handleAccountNav(1);
        }}
        onMouseLeave={function () {
          handleAccountNav(2);
        }}
      >
        {account.name}
        <div className="account-navs" ref={accountNavs}>
          <Link to={"account-bag\\" + account.id} className="account-nav bag">
            Giỏ hàng
          </Link>
          <Link to={"my-order\\" + account.id} className="account-nav order">
            Đơn Hàng
          </Link>
          <Link
            to={"my-profile\\" + account.id}
            className="account-nav account"
          >
            Tài Khoản
          </Link>
          <Link to="/" className="account-nav account">
            <div
              onClick={function () {
                removeAuth();
              }}
              className="account-nav logout"
            >
              Đăng xuất
            </div>
          </Link>
        </div>
      </span>
    </>
  );
}
export default Header;
