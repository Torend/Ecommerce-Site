import './style.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CartRow from './CartRow';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const [shipmentPrice, setShipmentPrice] = useState(0);
  const [err, setErr] = useState(false);

  useEffect(() => {
    calculateShipment();
  }, [cart]);

  const totalAmount = cart.reduce(function (acc, item) {
    return acc + parseInt(item.amount);
  }, 0);

  const totalPrice = cart.reduce(function (acc, item) {
    return acc + parseInt(item.amount) * item.price;
  }, 0);

  const calculateShipment = () => {
    //TODO api call to calculate the shipment price
    setShipmentPrice(20 * totalAmount);
  };

  const onPaymentClick = () => {
    if (!err)
      history.push({
        pathname: '/cart/submit',
        state: {
          totalAmount: totalAmount,
          totalPrice: totalPrice,
          shipmentPrice: shipmentPrice,
        },
      });
    else {
      // TODO
    }
  };

  if (cart.length === 0)
    return (
      <div className="empty-cart-page">
        <h2>סל הקניות ריק</h2>
        <button onClick={() => history.push('/')}>חזרה לחנות</button>
      </div>
    );

  return (
    <div className="cart-page">
      <h1>סל הקניות</h1>
      <table className="cart-table">
        <thead className="table-header">
          <tr>
            <th>שם המוצר</th>
            <th>צבע</th>
            <th>מחיר</th>
            <th>כמות</th>
            <th>סכום</th>
          </tr>
        </thead>
        <tbody className="cart-list">
          {cart.map((item, index) => {
            return (
              <CartRow
                key={index}
                id={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                image={item.image}
                color={item.color ? item.color : 'black'}
                setErr={setErr}
              />
            );
          })}
        </tbody>
      </table>
      <div className="cart-summary-container">
        <div className="cart-summary">
          <div className="cart-summary-row">
            <p>מספר מוצרים</p>
            <p>{totalAmount}</p>
          </div>
          <div className="cart-summary-row">
            <p>סכום ביניים</p>
            <p>{totalPrice} ₪</p>
          </div>
          <div className="cart-summary-row">
            <p>משלוח</p>
            <p>{shipmentPrice} ₪</p>
          </div>
          <div className="cart-summary-row">
            <h3>סך הכל לתשלום</h3>
            <h3>{totalPrice + shipmentPrice} ₪</h3>
          </div>
        </div>
        <button className="dark-button" onClick={onPaymentClick}>
          לתשלום ופרטי משלוח
        </button>
      </div>
    </div>
  );
}

export default Cart;
