import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItemAmount, removeItem } from '../cartSlice';
import myLocalStorage from '../localStorage';
import api from '../api';

const CartRow = ({ id, name, amount, price, image, setErr }) => {
  const [qnt, setQnt] = useState();
  const [itemErr, setItemErr] = useState(false);

  useEffect(async () => {
    const itemQnt = await api.getProductQnt(id);
    setQnt(itemQnt);
    if (amount > itemQnt) {
      setErr(true);
      setItemErr(true);
    }
  }, [qnt]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.value > 0 && event.target.value <= qnt) {
      dispatch(
        updateItemAmount({ id: event.target.name, amount: event.target.value })
      );
      myLocalStorage.updateItemAmount(event.target.name, event.target.value);
      setErr(false);
      setItemErr(false);
    }
  };

  return (
    <tr className="cart-item">
      <td className="cell-item">
        <img src={image} />
        <p>{name}</p>
      </td>
      <td>
        <p>₪{price}</p>
      </td>
      <td>
        <input type="number" name={id} value={amount} onChange={handleChange} />
      </td>
      <td>
        <p>₪{amount * price}</p>
      </td>
      {itemErr ? ( // TODO style
        <td>
          <p style={{ color: 'red' }}>אין מספיק יחידות במלאי</p>
        </td>
      ) : null}
      <td
        onClick={() => {
          dispatch(removeItem({ id: id }));
          myLocalStorage.removeItem(id);
          setErr(false);
        }}
        style={{ cursor: 'pointer' }}
      >
        X
      </td>
    </tr>
  );
};

export default CartRow;
