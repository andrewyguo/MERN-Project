import React, { Fragment, useState } from 'react'
// import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import { setAlert } from '../../actions/alert'; 
import { register, loadUser } from '../../actions/auth'; 

// Redux 
import { connect } from 'react-redux'; 
import propTypes from 'prop-types'; 

export const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    password: '', 
    password2: ''
  }); 

  const { name, email, password, password2 } = formData; 

  // Enables form to be filled for all fields 
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); 

  const onSubmit = async e => {
    e.preventDefault(); 
    console.log('Registering user... :) '); 
    
    if(password !== password2) {
      setAlert('Passwords do not match :(', 'danger'); 
    } else {
      register({ name, email, password }); 
      /* The following code is implemented in the line above 
      const newUser = {  
        name, 
        email, 
        password, 
      }
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const body = JSON.stringify(newUser); 
        const res = await axios.post('/api/users', body, config); 

        console.log(res.data); 
      } catch (error) {
        console.error(error.response.data)
      } 
      */ 
    }
  }

  return (  
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
            type="text"   
            placeholder="Name" 
            name="name" 
            value={name} 
            onChange={e => onChange(e)}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email} 
            onChange={e => onChange(e)}
            required 
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} 
            onChange={e => onChange(e)}
            required 
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2" 
            minLength="6"
            value={password2} 
            onChange={e => onChange(e)}
            required 
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  ); 
}

Register.propTypes = {
  setAlert: propTypes.func.isRequired, 
  register: propTypes.func.isRequired // Add to prop types  
}; 
export default connect(null, { setAlert, register })(Register); // Add actions 