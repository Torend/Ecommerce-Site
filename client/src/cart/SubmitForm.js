import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().min(9).max(10).required(),
  city: yup.string().required(),
  address: yup.string().required(),
});

const SubmitForm = ({ submitOrder }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (client) => {
    submitOrder(client);
  };

  return (
    <form className="submit-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>פרטי לקוח</h2>
      <div>
        <p>שם פרטי</p>
        <input {...register('firstName')} />
        <p className="form-error">{errors.firstName?.message}</p>
        <p>שם משפחה</p>
        <input {...register('lastName')} />
        <p className="form-error">{errors.lastName?.message}</p>
        <p>אימייל</p>
        <input {...register('email')} />
        <p className="form-error">{errors.email?.message}</p>
        <p>פלאפון</p>
        <input {...register('phone')} />
        <p className="form-error">{errors.phone?.message}</p>
        <p>עיר</p>
        <input {...register('city')} />
        <p className="form-error">{errors.city?.message}</p>
        <p>רחוב</p>
        <input {...register('address')} />
        <p className="form-error">{errors.address?.message}</p>
        <p>מספר בית</p>
        <input {...register('homeNumber')} />
        <p className="form-error">{errors.homeNumber?.message}</p>
        <p>דירה</p>
        <input {...register('apartment')} />
        <p className="form-error">{errors.apartment?.message}</p>
        <p>מיקוד</p>
        <input {...register('zipCode')} />
        <p className="form-error">{errors.zipCode?.message}</p>
      </div>

      <button className="dark-button" type="submit">
        השלמת ההזמנה
      </button>
      <p>עם השלמת ההזמנה, תיפתח חלונית תשלום מאובטחת להזנת פרטי האשראי</p>
    </form>
  );
};

export default SubmitForm;
