import React, { useContext } from 'react';
import { useState } from 'react';
import { Link} from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import './SignUp.css';

const SignUp = () => {

    const [error, SetError]=useState(null);

    //! get createUser function from UserContext.js
    const {createUser} = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
       const form = event.target;
       const email = form.email.value;
       const password = form.password.value;
       const confirm = form.confirm.value;
       console.log(email,password, confirm);
      //! if password length is less then 6 show this msg
       if(password.length < 6){
        SetError("Password must have at least 6 characters");
        return;
       }
       //! if password and confirm password not match, show this error msg
       if(email !==  confirm){
            SetError("Email and password do not match");
            return;
       }

       //! create User
       createUser(email, password)
       .then(result=>{
        const user = result.user;
        console.log(user);
        form.reset();
       })
       .catch(err => console.error(err));

    }

   
    return (
        <div className='form-container'>
        <h2 className='form-title'>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor='email'>Email</label>
            <input type="email" name='email'  required/>
          </div>
          <div className="form-control">
            <label htmlFor='password'>Password</label>
            <input type="password" name='password' required/>
          </div>
          <div className="form-control">
            <label htmlFor='confirm'>Confirm Password</label>
            <input type="password" name='confirm' required/>
          </div>
          <p className='text-error'>{error}</p>

          <input className='btn-submit' type="submit" value="Sign Up" />
        </form>
        <p>Already Have an Account ? <Link to='/login'>Login</Link></p>
    </div>
    );
};

export default SignUp;