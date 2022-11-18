import "../css/MyOrder.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getApiProduct from "../api/ProductAPI";
function MyOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(undefined);
  const [showWhich, setOrderShow] = useState(0);
  useEffect(() => {
    const getOrder = async () => {
      const data = await getApiProduct.getOrder(id);
      setOrder(data);
    };
    getOrder();
  }, [id]);
  function orderShow(opt) {
    setOrderShow(opt);
  }
  console.log(showWhich);
  return (
    <>
      <div className="fix-header"></div>
      <div className="my-order-container">
        <div className="left-nav">
          <div className="order-manager">Đơn hàng</div>
          <div
            className="btn order-nav all-order"
            onClick={() => {
              orderShow(0);
            }}
          >
            tất cả
          </div>
          <div
            className="btn order-nav order-waitting"
            onClick={() => {
              orderShow(1);
            }}
          >
            chờ xác nhận
          </div>
          <div
            className="btn order-nav order-shipping"
            onClick={() => {
              orderShow(2);
            }}
          >
            đang giao
          </div>
          <div
            className="btn order-nav order-done"
            onClick={() => {
              orderShow(3);
            }}
          >
            đã giao
          </div>
          <div
            className="btn order-nav order-cancel"
            onClick={() => {
              orderShow(4);
            }}
          >
            đã hủy
          </div>
        </div>
        <div className="right-order-status">
          {order
            ? showWhich === 0
              ? order.map((order) => {
                  return <AllOrderType order={order} key={order.bill.billId} />;
                })
              : showWhich === 1
              ? order
                  .filter((item) => {
                    return item.billStatus.billStatusId === 1;
                  })
                  .map((order) => {
                    return (
                      <AllOrderType order={order} key={order.bill.billId} />
                    );
                  })
              : showWhich === 2
              ? order
                  .filter((item) => {
                    return item.billStatus.billStatusId === 2;
                  })
                  .map((order) => {
                    return (
                      <AllOrderType order={order} key={order.bill.billId} />
                    );
                  })
              : showWhich === 3
              ? order
                  .filter((item) => {
                    return item.billStatus.billStatusId === 3;
                  })
                  .map((order) => {
                    return (
                      <AllOrderType order={order} key={order.bill.billId} />
                    );
                  })
              : showWhich === 4
              ? order
                  .filter((item) => {
                    return item.billStatus.billStatusId === 4;
                  })
                  .map((order) => {
                    return (
                      <AllOrderType order={order} key={order.bill.billId} />
                    );
                  })
              : ""
            : ""}
        </div>
      </div>
    </>
  );
}

function AllOrderType({ order }) {
  let shipMethod = "";
  let buyMethod = "";
  let billStatus = "";
  let productBillDetail = [];
  let total = "";
  let accountShipContact = order.accountShipContact;
  if (order) {
    shipMethod = order.shipMethod;
    buyMethod = order.buyMethod;
    billStatus = order.billStatus;
    productBillDetail = order.productBillDetails;
    total = productBillDetail.reduce((item, next) => {
      return item + next.billDetail.quantity * next.billDetail.price;
    }, 0);
  }
  return (
    <>
      <div className="order-container">
        <div className="order-product-title">
          <div className="ship-buy-type">
            {shipMethod.shipMethodName} | {buyMethod.buyMethodName} |{" "}
            {"Giao hàng đến: " + accountShipContact.accountDetailAddress}
          </div>
          <div className="this-order-status">{billStatus.billStatusDetail}</div>
        </div>
        {productBillDetail.map((item) => {
          return <BillDetail item={item} key={Math.random()} />;
        })}
        <Option total={total} />
      </div>
    </>
  );
}

function Option(total) {
  return (
    <>
      <div className="total-container">
        <div className="fix-total">
          <div className="fix-wid"></div>
          <div className="total-price-myorder">
            <span className="total-text">
              Total: {calcul(total.total) + "đ"}
            </span>
          </div>
        </div>
        <div className="btn-opt">
          <div className="fix-widbtn"></div>
          <div className="btn-item">
            <span className="btn_title">Trả Hàng</span>
          </div>
          <div className="btn-item">
            <span className="btn_title">Hủy Đơn</span>
          </div>
        </div>
      </div>
    </>
  );
}

function BillDetail(item) {
  let product = item.item.product;
  let billDetail = item.item.billDetail;
  let price = product.price * billDetail.quantity;
  let realPrice = billDetail.price * billDetail.quantity;
  return (
    <>
      <div className="order-product-detail">
        <div className="product-detail-myorder">
          <div className="img-center">
            <img
              alt=""
              src={
                "data:image/jpeg;base64," + product.productImgs[0].productImg
              }
              className="product-img"
            ></img>
          </div>
          <div className="product-name">
            <spam className="product-name-quantity">
              {product.productName}
              {" x"}
              {billDetail.quantity}
            </spam>
          </div>
        </div>
        <div className="bill-price">
          <del className="del-price">{calcul(price) + "đ"}</del>{" "}
          <span className="real-price">{calcul(realPrice) + "đ"}</span>
        </div>
      </div>
      <div className="line-bottom"></div>
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

export default MyOrder;
