import React from 'react';
import './style.css';
import Card from './Card';

function ItemsView({ items }) {
  return (
    <div className="items-view">
      {items.map((item) => {
        return (
          <Card
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            brand={item.brand}
            imageURL={item.image}
            colors={item.colors}
            inStock={item.qnt > 0 ? true : false}
          />
        );
      })}
    </div>
  );
}

export default ItemsView;
