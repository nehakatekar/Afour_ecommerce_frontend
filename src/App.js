import "./App.css";
import Header from './component/layout/Header/Header.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import { useState, useEffect } from "react";
import Home from './component/Home/Home.js'
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import Cart from "./component/Cart/Cart.js"
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store"
import { loadUser } from "./actions/userAction"
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from "react-redux"
import Profile from "./component/User/Profile.js"
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment"
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js"
import OrderList from "./component/Admin/OrderList.js"
import ProcessOrder from "./component/Admin/ProcessOrder.js"
function App() {
    const { isAuthenticated, user } = useSelector(state => state.user)
    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey")

        setStripeApiKey(data.stripeApiKey)
    }
    useEffect(() => {
        store.dispatch(loadUser())
        getStripeApiKey();

    }, [])
    return <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/search" component={Search} />
         {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute exact path="/process/payment" component={Payment} />
            </Elements>
        )} 
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <Switch>
            <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
            <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        </Switch>
        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />
        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={ProcessOrder} />   
    </Router>
}

export default App;
