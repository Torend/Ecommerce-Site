import React, { useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import myLocalStorage from '../localStorage';
import { useSelector, useDispatch } from 'react-redux';
import SubmitForm from './SubmitForm';
import Summary from './Summary';
import { clearCart } from '../cartSlice';
import api from '../api';

const SubmitPage = () => {
  const [submit, setSubmit] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [prevCart, setPrevCart] = useState([]);
  const myStorage = myLocalStorage.getAllItems();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { totalAmount, totalPrice, shipmentPrice } =
    (location && location.state) || {};

  function submitSuccess() {
    setPrevCart(cart);
    setSubmit(true);
    myLocalStorage.clearStorage();
    dispatch(clearCart());
    // TODO send invoice
  }

  function submitFail(err) {
    console.log('order fail');
    console.log(err.err);
  }

  async function checkQnt() {
    const res = await Promise.all(
      cart.map(async (item) => {
        const qnt = await api.getProductQnt(item.id);
        return qnt >= item.amount;
      })
    );
    return res.every((x) => x);
  }

  const submitOrder = async (userDetails) => {
    const res = await checkQnt();
    if (!res) {
      history.replace('/cart');
      return;
    }

    const items = [];
    cart.forEach((item) => {
      items.push({
        id: item.id,
        name: item.name,
        amount: item.amount,
        price: item.price,
      });
    });

    api
      .order(items, userDetails, shipmentPrice, totalPrice)
      .then((result) => {
        console.log(result);
        submitSuccess();
      })
      .catch((err) => {
        submitFail(err);
      });
  };

  if (!totalPrice || (!cart.length && !myStorage.length)) {
    if (!submit) return <Redirect to="/cart" />;
  }

  if (submit)
    return (
      <div className="submit-page">
        <div>
          <h1>תודה שקניתם אצלנו :)</h1>
          <h2>חשבנוית תשלח למייל</h2>
        </div>
        <Summary
          items={prevCart}
          totalAmount={totalAmount}
          totalPrice={totalPrice}
          shipmentPrice={shipmentPrice}
        />
      </div>
    );
  else
    return (
      <div className="submit-page">
        <SubmitForm items={cart} submitOrder={submitOrder} />
        <Summary
          items={cart}
          totalAmount={totalAmount}
          totalPrice={totalPrice}
          shipmentPrice={shipmentPrice}
        />
      </div>
    );
};

export default SubmitPage;
