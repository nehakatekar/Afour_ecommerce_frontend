import React, { Fragment, useEffect } from 'react';
import './Home.css'
import ProductCard from './ProductCard.js'
import {clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const { error, products} = useSelector(
    (state) => state.products
  )
  useEffect(() => {
    if(error){
       return alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  }, [dispatch,error,alert]);
  return (
  <Fragment>
    <div className='banner'>
      <h1>Welcome to Ecommerce</h1>
    </div>
    <h2 className='homeHeading'>Featured Product</h2>
    <div className="container" id="container">
      {products &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
  </Fragment>
  )
};
export default Home;
