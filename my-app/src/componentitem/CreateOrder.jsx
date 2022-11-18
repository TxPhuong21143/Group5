import '../css/CreateOrder.css'
import { ImLocation } from "react-icons/im";
import { useEffect } from 'react';
import getApiProduct from '../api/ProductAPI';
import { useState } from 'react';
import { ImFileText } from "react-icons/im";
function CreateOrder() {
    const listPay = JSON.parse(localStorage.getItem('listPay'))
    const account = JSON.parse(localStorage.getItem('auth'))
    const [calculResult, setCalculResult] = useState()
    const [priceAfterShip, setPriceAfterShip] = useState(0)
    useEffect(() => {
        const getCalcul = async () => {
            const data = await getApiProduct.getCalculBag(listPay)
            setCalculResult(data)
        }
        getCalcul()
    }, [])
    return (
        <>
            <div className='fix-header'></div>
            {true?"":<OptionShip />}
            <div className='create-order-container'>
                <div className='location-detail'>
                    <ImLocation className='icon-fixmargin' />
                    <span > địa chỉ nhận hàng</span>
                    {calculResult ? <ListContact listContacts={calculResult.accountShipContacts} key={Math.random()} /> : ""}
                </div>
                {calculResult ? <ListProduct calculResult={calculResult} key={Math.random()} /> : ""}
                <ShipMethod priceAfterShip={priceAfterShip} setPriceAfterShip={setPriceAfterShip} />
                <AddVoucherBill />
                <ConfirmContainer />
            </div>
        </>
    )
}
function ShipMethod({ setPriceAfterShip, priceAfterShip }) {
    return (<>
        <div className='ship-method-container'>
            <div className='order-mes'>
                <span className='order-mes-title'>Lời nhắn:</span>
                <input type="text" className='order-mes-input' />
            </div>
            <div className='ship-detail'>
                <div className='column-fix-4'>
                    <span className='ship-title inline-marginleft12px'>Đơn vị vận chuyển:</span>
                </div>
                <div className='column-fix-4'><span className='inline-marginleft12px'>
                    Ship nhanh
                </span></div>
                <div className='column-fix-4 '><span className='inline-marginleft12px change-ship' onClick={() => {
                    setPriceAfterShip(100000000)
                }}>THAY ĐỔI</span></div>
                <div className='column-fix-4'><span className='inline-marginleft12px add-left12px'>đ18.900</span></div>
            </div>
            <div className='total-price-container'>
                <div className='total-price'>
                    <span className='notification-aftership'>Tổng số tiền (2 sản phẩm):  </span>
                    <span className='price-after-ship'>₫{priceAfterShip}</span>
                </div>
            </div>
        </div>
    </>)
}
function AddVoucherBill() {
    return (
        <>
            <div className='voucher-bill-container'>
                <div className='voucher-logo'>
                    <ImFileText className='icon-voucher' />
                    <span className='voucher-title'>SIXDO Voucher</span>
                </div>
                <div></div>
                <div className='chosse-voucher'>   .</div>
                <div className='btn-chosse'><span>Chọn voucher</span></div>
            </div>
        </>
    )
}
function ConfirmContainer() {
    return (
        <>
            <div className='confirm-container'>
                <div className='buy-method-container'>
                    <div className='buy-method-title'><span className='buy-method-title-createorder'>Phương thức thanh toán</span></div>
                    <div className='buy-method-opt-createorder'><span className='buy-method-opt-createorder-detail'>Thanh toán khi nhận hàng</span></div>
                    <div className='btn-change-buy-method'><span className='btn-change-buy-method-btn'>Thay đổi</span></div>
                </div>
                <div className='confirm-show'>
                    <div className='show-opt-confirm'><span>Tổng tiền hàng: </span>
                        <span className='fix-confirm-price'>0dd</span></div>
                    <div className='show-opt-confirm'><span>Phí vận chuyển: </span>
                        <span className='fix-confirm-price'>0dd</span></div>
                    <div className='show-opt-confirm'><span>Tổng thanh toán: </span>
                        <span className='price-result-createorder fix-confirm-priceresult'>1000</span></div>
                </div>
                <div className='create-order-btn'>
                    <div className='create-order-btn-div'>Đặt Hàng</div>
                </div>
            </div>
        </>
    )
}
function ListProduct({ calculResult }) {

    return (
        <>
            <div className='list-container'>
                <div className='table-title-row'>
                    <div className='sanpham'><span className='fix-margin-sanpham'>Sản phẩm</span></div>
                    <div className='dongia'>Đơn giá</div>
                    <div className='soluong'>số lượng</div>
                    <div className='thanhtien'>thành tiền</div>
                </div>
                {calculResult.orderItems.map((item) => {
                    return <Product item={item} sales={calculResult.salesOfBillDetail} key={Math.random()} />
                })}
            </div>
        </>
    )
}
function Product({ item, sales }) {
    return (
        <>
            <div className='item-container'>
                <div className='category-location'>{item.categoryType.categoryTypeDetail + " / " + item.product.productName}</div>
                <div className='order-detail'>
                    <div className='product-detail'>
                        <img src={"data:image/jpeg;base64," + item.product.productImgs[0].productImg} alt="" className='product-img' />
                        <div className='product-name'>{item.product.productDetail}</div>
                    </div>
                    <div className='dongia row-item'>{"đ" + calcul(item.product.price)}</div>
                    <div className='soluong row-item'><span className='fix-alittlebit'>
                        {item.quantity}</span></div>
                    <div className='thanhtien row-item'>thành tiền</div>

                </div>
            </div>
        </>
    )
}
function ListContact({ listContacts }) {
    return (
        <>
            {listContacts.map((contact) => {
                return <Contact contact={contact} key={Math.random()} />
            })}
        </>
    )
}
function Contact({ contact }) {

    return (
        <>
            <div className='contact-container'>
                <input type="radio" name="contact" className='check-contact' />
                <div className='name-sdt'>{contact.receiverName + " " + contact.accountPhoneNumber}</div>
                <span className='contact-detail'>{contact.accountDetailAddress}</span>
            </div>
        </>
    )
}
function OptionShip(){
    return (
        <>
        <div className='full-device'>s</div>
        </>
    )
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
export default CreateOrder