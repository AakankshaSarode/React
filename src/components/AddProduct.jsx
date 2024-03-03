import React, { useEffect } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
 navigate('/login');
    }
  },[])
  return (
    <div>
        <Header />
    <h2>ADD PRODUCT HERE:</h2>
    <input type="text" />
    </div>
  );
}

export default AddProduct;
