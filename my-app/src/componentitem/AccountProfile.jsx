import "../css/AccountProfile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getApiProduct from "../api/ProductAPI";
function AccountProfile() {
  const [opt, setOpt] = useState(0);
  const { id } = useParams();
  function handleOpt(opt) {
    setOpt(opt);
  }
  const [account, setContacts] = useState(undefined);
  useEffect(() => {
    const getContacts = async () => {
      const data = await getApiProduct.getContacts(id);
      setContacts(data);
    };
    getContacts();
  }, [id]);
  return (
    <>
      <div className="fix-header"></div>
      <div className="my-profile-container">
        <div className="left-nav">
          <div className="profile-manager">Quản lý tài khoản</div>
          <div
            className="profile-nav"
            onClick={() => {
              handleOpt(0);
            }}
          >
            Thông tin cá nhân
          </div>
          <div
            className="profile-nav"
            onClick={() => {
              handleOpt(1);
            }}
          >
            Địa chỉ nhận hàng
          </div>

          <div
            className="profile-nav"
            onClick={() => {
              handleOpt(2);
            }}
          >
            Thêm địa chỉ nhận hàng
          </div>
        </div>
        <div className="right-profile-status">
          {account ? (
            opt === 0 ? (
              <Profile account={account} />
            ) : opt === 1 ?(
              account.shipContacts.map((contact) => {
                return <AccountShipContact contact={contact} />;
              })
            ):
            <BtnOpt />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
function Profile(account) {
  let name = "";
  let born = "";
  let address = "";
  if (account) {
    name = account.account.name;
    born = account.account.born;
    address = account.account.address;
  }
  return (
    <>
      <div className="profile-container">
        <div className="fix-margin-left">
          <div className="accountDetail ">
            <span className="title">Tên: </span>
            <span className="detail">{name}</span>
          </div>
          <div className="accountDetail add-margin">
            <span className="title">Ngày sinh: </span>
            <span className="detail">{born}</span>
          </div>
          <div className="accountDetail add-margin">
            <span className="title">Địa chỉ: </span>
            <span className="detail">{address}</span>
          </div>
        </div>
      </div>
    </>
  );
}
function AccountShipContact(contact) {
  let name = contact.contact.receiverName;
  let address = contact.contact.accountDetailAddress;
  let sdt = contact.contact.accountPhoneNumber;
  return (
    <>
      <div className="profile-container">
        <div className="fix-margin-left">
          <div className="accountDetail">
            <span className="title">Người nhận: </span>
            <span className="detail">{name}</span>
          </div>
          <div className="accountDetail add-margin">
            <span className="title">địa chỉ nhận hàng: </span>
            <span className="detail">{address}</span>
          </div>
          <div className="accountDetail add-margin">
            <span className="title">Số điện thoại: </span>
            <span className="detail">{sdt}</span>
          </div>
          <div className="delete-contact">Xóa địa chỉ</div>
        </div>
      </div>
    </>
  );
}

function BtnOpt() {
  return (
    <>
      <div className="profile-container">
        <div className="fix-margin-left"></div>
        <div className="btn-add">Thêm địa chỉ nhận hàng</div>
      </div>
    </>
  );
}
export default AccountProfile;
