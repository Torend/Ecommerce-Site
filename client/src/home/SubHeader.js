import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

function SubHeader({ categories, orderby, category }) {
  const history = useHistory();

  const CategoryButton = ({ name }) => {
    const onCategoryClick = async () => {
      history.push('/?category=' + name);
    };
    return (
      <button style={{ width: 'initial' }} onClick={() => onCategoryClick()}>
        {name}
      </button>
    );
  };

  const handleChange = (e) => {
    history.push(`/?category=${category}&orderby=${e.target.value}`);
  };

  return (
    <div className="sub-header">
      <h1>{category}</h1>
      <div className="sub-header-container">
        <select
          className="sub-header-select"
          name="sort"
          onChange={handleChange}
          value={orderby}
        >
          <option value="newest-items">הכי חדשים</option>
          <option value="best-selling">הנמכרים ביותר</option>
          <option value="price-high-to-low">מחיר גבוה לנמוך</option>
          <option value="price-low-to-high">מחיר נמוך לגבוה</option>
        </select>
        <div className="sub-header-btns">
          {categories.map((el, index) => {
            return <CategoryButton key={index} name={el} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default SubHeader;
