

 import axiosClient from "./AxiosApi";

const getApiProduct = {
  getProductHome: () => {
    const url = "/api/product1.0/getproducthome";
    return axiosClient.get(url);
  },
  getOneId: (id) => {
    const url = `/api/product1.0/getproductid?id=${id}`;
    return axiosClient.get(url);
  },
  getOrder: (id) => {
    const url = `/api/product1.0/getbilldetailbyaccountid?accountId=${id}`;
    return axiosClient.get(url);
  },
  getProductBagByAccountId: (id) => {
    const url = `/api/product1.0/getproductbagbyaccountid?accountId=${id}`;
    return axiosClient.get(url);
  },
  getContacts: (id) => {
    const url = `/api/product1.0/getcontacts?accountId=${id}`;
    return axiosClient.get(url);
  },
  addItem2Bag: (data, params = null) => {
    const url = `/api/product1.0/addproduct2bag?accountId=${data.accountId}&productId=${data.productId}&quantity=${data.quantity}`;
    return axiosClient.post(url, data, {});
  },
  getCalculBag: (data) => {
    const url = `/api/product1.0/getcalculbag`;
    return axiosClient.post(url, data, {});
  },
  deleteBag: (accountBagId) => {
    const url = `/api/product1.0/deleteaccountbag?accountBagId=${accountBagId}`;
    return axiosClient.delete(url);
  },
  updateStatus: (data) => {
    const url = `/Todo`;
    return axiosClient.put(url, data);
  },
};

export default getApiProduct