import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api';

const ItemSchema = yup.object().shape({
  name: yup.string().required(),
  master: yup.boolean().required(),
  price: yup.number().required(),
  qnt: yup.number().min(0).required(),
  image: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
});

const CreateNewItem = () => {
  // const [colorSelected, setColorSelected] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ItemSchema) });

  const onSubmit = (newItem) => {
    console.log(newItem);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="submit-form">
        <h2>מוצר חדש</h2>
        <div>
          <div className="form-select">
            <p>מוצר ראשי</p>
            <input
              {...register('master')}
              type="checkbox"
              defaultChecked="true"
            />
          </div>

          <p>שם</p>
          <input {...register('name')} autoComplete="off" />
          <p className="form-error">{errors.name?.message}</p>

          <p>כמות</p>
          <input {...register('qnt')} type="number" style={{ width: '30%' }} />
          <p className="form-error">{errors.qnt?.message}</p>

          <p>מחיר בשקלים</p>
          <input
            {...register('price')}
            type="number"
            style={{ width: '30%' }}
          />
          <p className="form-error">{errors.price?.message}</p>

          <p>תאריך יציאה</p>
          <input {...register('releaseDate')} type="date" />
          <p className="form-error">{errors.releaseDate?.message}</p>

          <SelectColor />
          {/* <p>צבע</p>
          <select multiple={true} onChange={handleChange} value={colorPicked}>
            <option disabled selected value>
              -- select an option --
            </option>
            {items.map((item) => (
              <option value={item._id}>{item.name}</option>
            ))}
          </select> */}

          <p>קטגוריות</p>
          <textarea
            {...register('category')}
            cols="40"
            rows="2"
            type="text"
            name="category"
          />
          <p className="form-error">{errors.category?.message}</p>

          <p>אתר</p>
          <input {...register('site')} style={{ width: '200%' }} />
          <p className="form-error">{errors.site?.message}</p>

          <p>תמונה</p>
          <input {...register('image')} style={{ width: '200%' }} />
          <p className="form-error">{errors.image?.message}</p>

          <p>תמונות נוספות</p>
          <textarea
            {...register('extraImages')}
            style={{ width: '200%' }}
            cols="40"
            rows="2"
            type="text"
            name="extraImages"
          />
          <p className="form-error">{errors.extraImages?.message}</p>

          <p>תיאור המוצר</p>
          <textarea
            {...register('description')}
            style={{ width: '200%' }}
            cols="40"
            rows="3"
            type="text"
            name="description"
          />
          <p className="form-error">{errors.description?.message}</p>

          <p>תכונות עיקריות</p>
          <textarea
            {...register('features')}
            style={{ width: '200%' }}
            cols="40"
            rows="3"
            type="text"
            name="features"
          />
          <p className="form-error">{errors.features?.message}</p>

          <p>מפרטי טכני</p>
          <textarea
            {...register('specs')}
            style={{ width: '200%' }}
            cols="40"
            rows="3"
            type="text"
            name="specs"
          />
          <p className="form-error">{errors.specs?.message}</p>

          <p>מידע נוסף</p>
          <textarea
            {...register('additionalInfo')}
            style={{ width: '200%' }}
            cols="40"
            rows="3"
            type="text"
            name="additionalInfo"
          />
          <p className="form-error">{errors.additionalInfo?.message}</p>
        </div>
        <button className="dark-button" type="submit">
          השלמת ההזמנה
        </button>
      </form>
    </div>
  );
};

export default CreateNewItem;

const SelectColor = ({ addItem }) => {
  const [items, setItems] = useState([]);
  // const [selectedItem, setSelectedItem] = useState('');
  // const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    fetchItemsNames();
  }, []);

  async function fetchItemsNames() {
    const items = await api.getItemsNames();
    setItems(items);
  }

  return (
    <div>
      <select>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
