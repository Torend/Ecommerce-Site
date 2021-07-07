import React, { useState, useEffect } from 'react';
import ProductDescription from './ProductDescription';
import './style.css';
import { useDispatch } from 'react-redux';
import { addItem } from '../cartSlice';
import { useHistory, useParams } from 'react-router-dom';
import PopUp from './PopUp';
import api from '../api';
import myLocalStorage from '../localStorage';

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const history = useHistory();
  const [item, setItem] = useState();

  useEffect(() => {
    fetchItem(id);
  }, [id]);

  const fetchItem = async (id) => {
    const newItem = await api.getItemById(id);

    setItem(newItem);
  };

  const addToCart = () => {
    if (myLocalStorage.idExist(id)) return;
    const newItem = {
      id: id,
      name: item.name,
      price: item.price,
      amount: 1,
      image: item.image,
      brandLogo: item.brand.imgURL,
    };
    myLocalStorage.addItem(id, 1);
    dispatch(addItem(newItem));
  };

  const goToProduct = (id) => {
    history.replace(`/item/${id}`);
  };

  const colorRow = () => {
    return (
      <div className="product-color-contain">
        <p className="product-color-title">צבעים זמינים</p>
        <div className="product-color-list">
          {item.colors.map((color, index) => {
            return (
              <div
                key={index}
                className={`product-color ${color.id === id ? 'selected' : ''}`}
                style={{ backgroundColor: color.hexCode }}
                onClick={() => goToProduct(color.id)}
              ></div>
            );
          })}
        </div>
      </div>
    );
  };

  if (item === undefined) return <div></div>; // TODO loading component
  return (
    <div className="product-view">
      {popup ? <PopUp setPopup={setPopup} /> : null}
      <section className="product-section">
        <div className="product-image-logo">
          <img src={item.image} alt="" className="product-image" />
          <img src={item.brand.imgURL} alt="" className="product-logo" />
        </div>
        <div className="product-info">
          <h2 className="product-name">{item.name}</h2>
          <div className="product-price-color">
            <div className="product-price-contain">
              <p className="product-price-title">מחיר</p>
              <p className="product-price-number">{item.price} ₪</p>
            </div>
            {item.colors.length ? colorRow() : null}
          </div>
          <div className="product-cta">
            <button
              onClick={() => {
                addToCart();
                setPopup(true);
              }}
            >
              הוסף לסל
            </button>
            <button
              className="dark-button"
              onClick={() => {
                addToCart();
                history.push('/cart');
              }}
            >
              קנייה מהירה
            </button>
          </div>
        </div>
      </section>
      <ProductDescription item={item} />
    </div>
  );
}

export default Product;
