import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getApiProduct from "../api/ProductAPI.js";
import "../css/Bag.css";

function Bag() {
  const { id } = useParams();
  const [productBagByAccountId, setProduct] = useState(undefined);
  useEffect(() => {
    const data2 = JSON.parse(localStorage.getItem("auth"));
    if (data2) {
    }
    const getProduct = async () => {
      const data = await getApiProduct.getProductBagByAccountId(id);
      setProduct(data);
    };
    getProduct();
  }, []);
  const [total, setTotal] = useState(0);
  const [listIdTotal, setListIdTotal] = useState([])

  function handleTotalCheckBox(productId) {
    console.log('id chuyen vao '+productId)
    if (listIdTotal.includes(productId)) {
      setTotal(total - productBagByAccountId.find((item) => {
        return item.product.productId === productId
      }).product.shellPrice)
      listIdTotal.splice(listIdTotal.indexOf(productId),1)
      setListIdTotal(listIdTotal)
      return
    }
    setListIdTotal([...listIdTotal, productId])
    setTotal(total + productBagByAccountId.find((item) => {
      return item.product.productId === productId
    }).product.shellPrice)
  }
  console.log(listIdTotal)


  async function deleteBag(accountBagId) {
    const index = productBagByAccountId.findIndex((x) => { return x.accountBag.accountBagId === accountBagId })
    await getApiProduct.deleteBag(accountBagId);
    productBagByAccountId.splice(index, 1)
    setProduct(await getApiProduct.getProductBagByAccountId(id))
  }
  const [listPay, setListPay] = useState([]);
  function add2ListPay(bagId) {
    if (listPay.includes(bagId)) {
      listPay.splice(listPay.indexOf(bagId), 1);
      setListPay(listPay);
      return;
    }
    setListPay([...listPay, bagId]);
  }
  function pushData2BackEnd() {
    localStorage.setItem('listPay', JSON.stringify(listPay));
  }

  return (
    <>
      <div className="fix-header"></div>
      <div className="bag-table">
        <div className="title-row">
          <div className="bag-column long-column">sản phẩm</div>
          <div className="bag-column short-column">đơn giá</div>
          <div className="bag-column short-column">số lượng</div>
          <div className="bag-column short-column">thành tiền</div>
          <div className="bag-column short-column">thao tác</div>
        </div>
        {productBagByAccountId
          ? productBagByAccountId.map((item) => {
            return (
              <Item
                item={item}
                key={item.accountBag.accountBagId}
                deleteBag={deleteBag}
                add2ListPay={add2ListPay}
                handleTotalCheckBox={handleTotalCheckBox}
              />
            );
          })
          : ""}
        <div className="pay-container">
          <Link to="/create-order">
            <div
              className="pay-it"
              onClick={function () {
                pushData2BackEnd();
              }}
            >
              Mua hàng
            </div>
          </Link>
          <div className="total-pay">{calcul(total) + "đ"}</div>
        </div>
      </div>
    </>
  );
}

function Item({ item, deleteBag, add2ListPay, handleTotalCheckBox }) {
  const a = item.accountBag;
  const p = item.product;
  const c = item.categoryType;
  return (
    <>
      <div className="item-row">
        <div className="category-type-location">
          {c.categoryTypeDetail + ` / ${p.productName}`}
        </div>
        <div className="product-row">
          <div className="bag-row long-column">
            <input
              type="checkbox"
              className="choose-product2pay"
              value={a.accountBagId}
              onChange={function () {
                add2ListPay(a.accountBagId);
                handleTotalCheckBox(p.productId)
              }}
            ></input>
            <img
              src={"data:image/jpeg;base64," + p.productImgs[0].productImg}
              alt=""
              className="product-img"
            ></img>
            <div className="product-name">{p.productDetail}</div>
          </div>
          <div className="bag-row short-column">{calcul(p.shellPrice) + "đ"}</div>
          <div className="bag-row short-column">{a.quantity}</div>
          <div className="bag-row short-column">
            {calcul(p.shellPrice * a.quantity) + "đ"}
          </div>
          <div className="bag-row short-column">
            <div
              className="handle-bag delete-item"
              onClick={function () {
                deleteBag(a.accountBagId);
              }}
            >
              Xóa{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function calcul(number) {
  let price = number + "";
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
  return resultPrice.split("").reverse().join("");
}
export default Bag;
