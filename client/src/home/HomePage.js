import React from 'react';
import './style.css';
import SubHeader from './SubHeader';
import ItemsView from './ItemsView';
import { useState, useEffect } from 'react';
import api from '../api';
import { useLocation, useHistory } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const history = useHistory();
  const category = useQuery().get('category') || 'כל המוצרים';
  const page = useQuery().get('page') || '1';
  const orderby = useQuery().get('orderby') || 'newest-items';
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch();
  }, [category, orderby, page]);

  async function fetch() {
    const data = await api.getItems(category, orderby, page);
    setItems(data.items);
    setNumOfPages(data.numOfPages);
    setCategories(data.categories);
  }

  const changePage = (num) => {
    const newPage = parseInt(page) + num;
    document.getElementById('root').scrollIntoView();
    history.push(`/?category=${category}&orderby=${orderby}&page=${newPage}`);
  };

  // if (loading) return <div></div>;

  return (
    <div className="home-page">
      <SubHeader
        categories={categories}
        category={category}
        orderby={orderby}
      />
      <ItemsView items={items} />
      <PageButtons
        currPage={page}
        numOfPages={numOfPages}
        changePage={changePage}
      />
    </div>
  );
}

export default HomePage;

const PageButtons = ({ currPage, numOfPages, changePage }) => {
  return (
    <div>
      {numOfPages > currPage ? (
        <button className="dark-button" onClick={() => changePage(1)}>
          דף הבא
        </button>
      ) : null}
      {currPage > 1 ? (
        <button className="dark-button" onClick={() => changePage(-1)}>
          דף הקודם
        </button>
      ) : null}
    </div>
  );
};
