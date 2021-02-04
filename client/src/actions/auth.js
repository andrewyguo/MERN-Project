import axios from 'axios'; 
import { setAlert } from './alert';
import { 
  REGISTER_SUCCESS, 
  REGISTER_FAIL, 
  USER_LOADED, 
  AUTH_ERROR, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  LOGOUT 
} from './types'; 
import setAuthToken from '../utils/setAuthToken'; 

// Load User 
export const loadUser = () => async dispatch => {
  if(localStorage.token !== undefined) {
    console.log('Retreiving token from local storage...');
    setAuthToken(localStorage.token); 
  }
  try {
    console.log("lele"); 
    const res = await axios.get('http://localhost:5000/api/auth'); 

    dispatch({
      type: USER_LOADED, 
      payload: res.data 
    }); 
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    }); 
  }
}

// Register User 
export const register = ({ name, email, password }) => async dispatch => { 
  const config = {
    headers: { 
      'Content-Type': 'application/json' 
    }
  };
  const body = JSON.stringify({ name, email, password }); 

  try {
    const res = await axios.post('http://localhost:5000/api/users', body, config); 
    console.log(`res: ${res}`); 
    dispatch({
      type: REGISTER_SUCCESS, 
      payload: res.data 
    });

    dispatch(loadUser()); 
  } catch (error) {
    const err = error.response.data.errors; 

    if(err) { 
      err.forEach(e => dispatch(setAlert(e.msg, 'danger'))); 
    }

    dispatch({
      type: REGISTER_FAIL
    }); 
  }
}

// Login User 
export const login = ( email, password ) => async dispatch => { 
  console.log(`email: ${email}`); 

  const config = {
    headers: { 
      'Content-Type': 'application/json' 
    }
  }; 
  const body = JSON.stringify({ email, password }); 

  try {
    const res = await axios.post('http://localhost:5000/api/auth', body, config); 

    dispatch({
      type: LOGIN_SUCCESS, 
      payload: res.data 
    });
    
    console.log('LOGIN_SUCCESS, calling loadUser() now from within login '); 
    dispatch(loadUser()); 
  } catch (error) {
    const err = error.response.data.errors; 

    if(err) { 
      err.forEach(e => dispatch(setAlert(e.msg, 'danger'))); 
    }

    dispatch({
      type: LOGIN_FAIL
    }); 
  }
}

// Logout and Clear 
export const logout = () => dispatch => { 
  dispatch({ type: LOGOUT }); 
}