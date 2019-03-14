import * as actionTypes from './actionTypes';
import axios from 'axios'
import {API_KEY} from '../../credentials'

export const authStart  = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess  = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail  = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth  = (email, password, isSignup) => {
  const F_API_KEY = API_KEY;
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + F_API_KEY
    if (!isSignup) {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + F_API_KEY;

    }

    axios.post(url, authData)
    .then(res => {
      console.log(res);
      dispatch(authSuccess(res.data.idToken, res.data.localId))
    })
    .catch(err => {
      console.log(err);
      dispatch(authFail(err.response.data.error))
    })
  }
}