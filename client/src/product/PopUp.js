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

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <div className="modal">
      <div className="black-out" onClick={() => closePopup()} />
      <div className="modal-container">
        <button onClick={() => closePopup()}>X</button>
        <div className="modal-cart">
          <p>הסל שלך</p>
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
                />
              );
            })}
          </div>
        </div>
        <div className="modal-summary">
          <div className="modal-summary-container">
            <p>סיכום</p>
            <div className="cart-card-row">
              <p>מספר מוצרים</p>
              <p>{totalAmount}</p>
            </div>
            <div className="cart-card-row">
              <p>סכום</p>
              <p>{totalPrice} ₪</p>
            </div>
          </div>
          <div className="modal-btns">
            <button onClick={() => history.push('/cart')}>מעבר לסל</button>
            <button onClick={() => history.goBack()}>המשך קניה</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CartCard = ({ id, name, brandLogo, price, image, amount }) => {
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
      <div className="cart-card-image">
        <img alt="" src={image} className="cart-card-img" />
        <img alt="" src={brandLogo} className="cart-card-logo" />
      </div>

      <div className="cart-card-desc">
        <p>{name}</p>
        <div className="cart-card-row">
          <p>מחיר</p>
          <p>₪{price * amount}</p>
        </div>
        <div className="cart-card-row">
          <p>כמות</p>
          <input
            type="number"
            name={id}
            value={amount}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
