import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CreateNewItem from './CreateNewItem';

const Admin = () => {
  const auth = useSelector((state) => state.auth);
  if (!auth) return <Redirect to="login" />;
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CreateNewItem />
    </div>
  );
};

export default Admin;
