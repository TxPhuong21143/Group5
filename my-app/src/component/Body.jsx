import { Link } from "react-router-dom";
import "../css/Body.css";
import React, { useEffect, useRef, useState } from "react";
import getApiProduct from "../api/ProductAPI";
function Body() {
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const data = await getApiProduct.getProductHome();
      setDataProduct(data);
    };
    getProduct();
  }, []);
  return (
    <div className="main">
      <div className="container">
        <div className="main-column">
          <div className="row row-1"></div>
          <div className="row row-2">
            <div className="product-category">
              <div className="title-category">category</div>
              <div className="category-opt">
                <div className="item-category hoverCategory">Producer</div>
                <div className="item-category hoverCategory">Brand</div>
                <div className="item-category hoverCategory">sale 70%</div>
              </div>
            </div>
            <div className="product-list">
              <div className="title-product">shop</div>
              <div className="product-list-container">
                {dataProduct.map((x) => {
                  return (
                    <Link to={`product-item\\${x.productId}`} key={x.productId}>
                      <ProductItem item={x} />
                    </Link>
                  )
                })}
              </div>
              <div className="next-product-list">
                <div className="next-btn">1</div>
                <div className="next-btn">2</div>
                <div className="next-btn">3</div>
                <div className="next-btn">...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductItem({ item, key }) {
  let price = item.shellPrice + "";
  //3 390 000
  let resultPrice = "";
  let counter = 0;
  for (let i = price.length - 1; i >= 0; i--) {
    if (counter === 3) {
      resultPrice += ".";
      counter = 0;
    }
    resultPrice += price[i];
    counter++;
  }
  let color = item.colorId;
  resultPrice = resultPrice.split("").reverse().join("");
  const thisProduct = useRef(0);
  useEffect(() => {
    thisProduct.current.onmouseover = () => {
      thisProduct.current.childNodes[0].src =
        "data:image/jpeg;base64," + item.productImgs[1].productImg;
    };
    thisProduct.current.onmouseout = () => {
      thisProduct.current.childNodes[0].src =
        "data:image/jpeg;base64," + item.productImgs[0].productImg;
    };
  }, []);
  return (
    <>
      <div
        className="product-item-container"
        ref={thisProduct}
        id={item.productId}
      >
        <img
          className="product-image"
          src={"data:image/jpeg;base64," + item.productImgs[0].productImg}
          alt=""
        ></img>{" "}
        <span className="product-price">{resultPrice + "đ"}</span>
        <br></br>
        <span className="product-detail-name">{item.productName}</span>
        <div
          className={
            color === 1
              ? "product-color red"
              : color === 2
              ? "product-color blue"
              : color === 3
              ? "product-color green"
              : color === 4
              ? "product-color black"
              : color === 5
              ? "product-color white"
              : "product-color pink"
          }
        ></div>
      </div>
    </>
  );
}

export default Body;
