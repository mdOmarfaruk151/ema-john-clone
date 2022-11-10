import React from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/UserContext";
import "./Login.css";

const Login = () => {
  //! function get from UserContext.js
  const { signIn } = useContext(AuthContext);
  //! use for navigate by call
  const navigate = useNavigate(); 
  //! for get user location page
  const location = useLocation();
  //! if location get use path name or if not get path name use home page '/'
  const from = location.state?.from?.pathname || '/' ; 

  //! for get value from login form
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    //! for user sign in 
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate(from, {replace: true}) /* //! set active page when log in */
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <p>
        New to ema jhon <Link to="/signup">Create a New Account</Link>
      </p>
    </div>
  );
};

export default Login;
