import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import "./ProductDetails.css"
import { useAlert } from 'react-alert';
import { addItemsToCart } from '../../actions/cartAction';
const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert()
    const { product, error } = useSelector
    (state => state.productDetails)
   const[quantity]=useState(1)
  const addToCartHandler=()=>{
dispatch(addItemsToCart(match.params.id, quantity))
alert.success(product.name+" Added To Cart")
  }
    useEffect(() => {
        if (error) {
            return alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, match.params.id, error, alert])
    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel>
                        {product.images &&
                            product.images.map((item, i) => (
                                <img
                                    className="CarouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))}
                    </Carousel>
                </div>
                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <button
                                disabled={product.Stock < 1 ? true : false}
                            onClick={addToCartHandler}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <p>
                            Status:
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock-4">
                        Description : <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};
export default ProductDetails;
