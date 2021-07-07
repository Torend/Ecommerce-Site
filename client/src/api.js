const axios = require('axios');
const URL = 'http://localhost:8080';

const api = () => {
  return {
    getItemById: (id) => {
      return axios.get(`${URL}/item/${id}`).then((res) => res.data);
    },
    getProductQnt: (id) => {
      return axios.get(`${URL}/item/qnt/${id}`).then((res) => res.data);
    },
    getItems: (category, sort, page) => {
      return axios
        .get(`${URL}/items/${category}/${sort}/${page}`)
        .then((res) => res.data);
    },
    getItemsNames: () => {
      return axios.get(`${URL}/items/names`).then((res) => res.data);
    },
    getCategories: (category) => {
      return axios.get(`${URL}/category/${category}`).then((res) => res.data);
    },
    order: (items, userDetails, shipmentPrice, totalPrice) => {
      return axios
        .post(`${URL}/order`, {
          items: items,
          userDetails: userDetails,
          shipmentCost: shipmentPrice,
          totalItemsPrice: totalPrice,
        })
        .then((res) => res.data);
    },
    login: (username, password) => {
      return axios
        .post(`${URL}/users/login`, { name: username, password: password })
        .then((res) => res);
    },
    // admin: () => {
    //   return axios
    //     .get(`${URL}/users/admin`, { withCredentials: true })
    //     .then((res) => res);
    // },
  };
};

export default api();
