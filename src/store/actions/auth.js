import * as actionTypes from './actionTypes';
import axios from 'axios'
import {API_KEY} from '../../credentials'

export const authStart  = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess  = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
}

export const authFail  = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth  = (email, password) => {
  const F_API_KEY = API_KEY;
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    console.log(authData);
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + F_API_KEY, authData)
    .then(res => {
      console.log(res);
      dispatch(authSuccess(res.data))
    })
    .catch(err => {
      console.log(err);
      dispatch(authFail(err))
    })
  }
}
