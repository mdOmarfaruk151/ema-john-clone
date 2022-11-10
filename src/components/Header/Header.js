import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import logo from "../../images/Logo.svg";
import "./Header.css";

const Header = () => {
   //! get function from UserContext.js
  const {user, logOut} = useContext(AuthContext);

  return (
    <div>
      <nav className="header">
        <img src={logo} alt="" />
        <div>
          <Link to="/">Shop</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/about">About</Link>

          {/* //! conditional option when login it show logout button */}
          { user?.uid ?
            <button className="btn-logout" onClick={logOut}>Log Out</button>
            :
           <>
           <Link to="/login">Login</Link>
           <Link to="/signup">SignUp</Link>
          </>
          }
           {/* //! show user email when log in */}
           <span className="user-name">{user?.email}</span>
           
        </div>
      </nav>
    </div>
  );
};

export default Header;
