import { v4 as uuid } from 'uuid'; 
import { SET_ALERT, REMOVE_ALERT } from './types'; 

export const setAlert = (msg, alertType, timeout = 3600) => dispatch => {
  const id = uuid; 
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  }); 
  console.log('Alert has been sent. '); 

  // Remove alert 
  setTimeout(() => dispatch( { type: REMOVE_ALERT, payload: id }), timeout)
}   