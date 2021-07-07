import React from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateItemAmount } from '../cartSlice';
import myLocalStorage from '../localStorage';

function Popup({ setPopup }) {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  const totalAmount = cart.reduce(function (acc, item) {
    return acc + parseInt(item.amount);
  }, 0);

  const totalPrice = cart.reduce(function (acc, item) {
    return acc + parseInt(item.amount) * item.price;
  }, 0);

  const shippingPrice = '35';

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <div className="modal">
      <div className="black-out" onClick={() => closePopup()} />
      <div className="modal-container">
        <div className="modal-cart">
          <h2>הסל שלך</h2>
          <div className="modal-cart-list">
            {cart.map((item) => {
              return (
                <CartCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  brandLogo={item.brandLogo}
                  price={item.price}
                  image={item.image}
                  amount={item.amount}
                  color={item.color}
                />
              );
            })}
          </div>
        </div>
        <div className="modal-summary">
          <h2>סיכום</h2>
          <div className="modal-summary-container">
            <div className="cart-card-row">
              <p>מספר מוצרים</p>
              <p>{totalAmount}</p>
            </div>
            <div className="cart-card-row">
              <p>סכום ביניים</p>
              <p>{totalPrice} ₪</p>
            </div>
            <div className="cart-card-row">
              <p>משלוח ועלויות נוספות</p>
              <p>{shippingPrice} ₪</p>
            </div>
            <div className="cart-card-row">
              <h3>סך הכל לתשלום</h3>
              <h3>{parseInt(totalPrice) + parseInt(shippingPrice)} ₪</h3>
            </div>
          </div>
          <div className="modal-btns">
            <button onClick={() => history.goBack()}>המשך קניה</button>
            <button className="dark-button" onClick={() => history.push('/cart')}>מעבר לסל</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CartCard = ({ id, name, brandLogo, price, image, amount, color }) => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    if (event.target.value > 0)
      dispatch(
        updateItemAmount({ id: event.target.name, amount: event.target.value })
      );
    myLocalStorage.updateItemAmount(event.target.name, event.target.value);
  };
  return (
    <div className="cart-card">
      <div className="cart-card-image-logo">
        <img src={image} alt="" className="cart-card-image" />
        <img src={brandLogo} alt="" className="cart-card-logo" />
      </div>
      <div className="cart-card-info">
        <div className="cart-card-info">
          <h3 className="cart-card-name">
            {name}
          </h3>
          <div className="cart-card-row">
            <p className="cart-card-price">מחיר</p>
            <p>₪{price * amount}</p>
          </div>
          <div className="cart-card-row">
            <p className="cart-card-color">צבע</p>
            <div
              className={`card-color`}
              style={{ backgroundColor: color }}
            />
          </div>
          <div className="cart-card-row">
            <p className="cart-card-amount">כמות</p>
            <input
              type="number"
              name={id}
              value={amount}
              onChange={handleChange}
              onKeyDown={event => event.preventDefault()}
              onWheel={event => event.target.blur()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
