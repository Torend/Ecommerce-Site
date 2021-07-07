import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import Cart from './cart/Cart';
import About from './about/About';
import Header from './header/Header';
import Product from './product/Product';
import Footer from './footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './cartSlice';
import myLocalStorage from './localStorage';
import api from './api';
import Login from './login/Login';
import Admin from './admin/Admin';
import SubmitPage from './cart/SubmitPage';

function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const myStorage = myLocalStorage.getAllItems();
    if (myStorage.length > cart.length) getCartFromServer(myStorage);
  }, []);

  const getCartFromServer = async (items) => {
    await Promise.all(
      items.map(async (el) => {
        const item = await api.getItemById(el.id);
        dispatch(
          addItem({
            id: el.id,
            name: item.name,
            price: item.price,
            amount: el.amount,
            image: item.image,
            brandLogo: item.brand.imgURL,
          })
        );
      })
    );
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Switch>
            <Route path="/item/:id">
              <Product />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/cart/submit">
              <SubmitPage />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
