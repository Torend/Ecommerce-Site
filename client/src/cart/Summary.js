import './style.css';
import React from 'react';

function Summary({ items, totalPrice, totalAmount, shipmentPrice }) {
  return (
    <div className="cart-summary">
      {items.map((item) => {
        return (
          <div className="item-summary-row" key={item.id}>
            <CartCard
              name={item.name}
              brandLogo={item.brandLogo}
              price={item.price}
              image={item.image}
              amount={item.amount}
            />
          </div>
        );
      })}
      <h2>סיכום הזמנה</h2>
      <div className="cart-summary-row">
        <p>מספר מוצרים</p>
        <p>{totalAmount}</p>
      </div>
      <div className="cart-summary-row">
        <p>משלוח</p>
        <p>{shipmentPrice} ₪</p>
      </div>
      <div className="cart-summary-row">
        <p>סכום כללי</p>
        <p>{totalPrice + shipmentPrice} ₪</p>
      </div>
    </div>
  );
}

const CartCard = ({ name, brandLogo, price, image, amount }) => {
  return (
    <div className="cart-card">
      <div className="cart-card-image">
        <img src={image} className="cart-card-img" />
        <img src={brandLogo} className="cart-card-logo" />
      </div>

      <div className="cart-card-desc">
        <p>{name}</p>
        <div className="cart-card-row">
          <p>מחיר</p>
          <p>₪{price * amount}</p>
        </div>
        <div className="cart-card-row">
          <p>כמות</p>
          <p>{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
