import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from '../layout/Header/Header.js'
const Profile = ({ history }) => {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
        if (isAuthenticated === false) {
            history.push("/login");
        }
    }, [history, isAuthenticated]);
    return (
        <Fragment>
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt={user.name} />
                </div>
                <div>
                    <div></div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(user.createdAt).substr(0, 10)}</p>
                    </div>
                    <div>
                        <Link to="/orders">My Orders</Link>
                    </div>
                </div>
            </div>
            <Header/>  
        </Fragment>
    );
};
export default Profile;
