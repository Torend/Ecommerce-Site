import React, { useEffect } from 'react';
import { useState } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../cartSlice';
import api from '../api';
import myLocalStorage from '../localStorage';

function Card({ id, name, price, brand, imageURL, colors, inStock }) {
  const [itemId, setItemId] = useState(id);
  const [itemPrice, setItemPrice] = useState(price);
  const [img, setImg] = useState(imageURL);
  const [itemInStock, setItemInStock] = useState(inStock);
  const [selectedColor, setSelectedColor] = useState(
    colors[0] ? colors[0].hexCode : null
  );
  const [added, setAdded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (myLocalStorage.idExist(itemId)) setAdded(true);
  });

  const goToProduct = () => {
    if (itemInStock) history.push(`/item/${itemId}`);
  };

  const switchColor = async (id, color) => {
    const newItem = await api.getItemById(id);
    setItemId(newItem._id);
    setItemPrice(newItem.price);
    setImg(newItem.image);
    setSelectedColor(color);
    setItemInStock(newItem.qnt > 0 ? true : false);

    setAdded(false);
  };

  const addToCart = () => {
    if (myLocalStorage.idExist(itemId)) return;
    const newItem = {
      id: itemId,
      name: name,
      price: price,
      amount: 1,
      image: img,
      brandLogo: brand.imgURL,
    };
    dispatch(addItem(newItem));
    myLocalStorage.addItem(itemId, 1);
    setAdded(true);
  };

  return (
    <div className="card">
      <div className="card-image-logo" onClick={() => goToProduct()}>
        <img className="card-image" src={img} alt="" />
        <img className="card-logo" src={brand.imgURL} alt="" />
      </div>
      <div className="card-info">
        <p className="card-name" onClick={() => goToProduct()}>
          {name}
        </p>
        <div className="card-price-color">
          {itemInStock ? (
            <p className="card-price">{itemPrice} ₪</p>
          ) : (
            <p className="card-price">אין במלאי</p>
          )}
          <div className="card-color-list">
            {colors
              ? colors.map((color) => {
                  return (
                    <div
                      key={color._id}
                      className={`card-color ${
                        selectedColor === color.hexCode ? 'selected' : ''
                      }`}
                      style={{ backgroundColor: color.hexCode }}
                      onClick={() => switchColor(color.id, color.hexCode)}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
      {itemInStock ? (
        <button className="clear-button" onClick={() => addToCart()}>
          {added ? (
            <p style={{ color: 'green' }}>✓ נוסף לעגלה</p>
          ) : (
            <p>+ הוסף לעגלה</p>
          )}
        </button>
      ) : null}
    </div>
  );
}

export default Card;
