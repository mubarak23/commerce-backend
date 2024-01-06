import axios from 'axios'

import { apiBaseUrl, getAxiosConfig } from './utils'
import {
  LOGIN_SUCCESS, LOGIN_ATTEMPT_FAIL, LOGIN_ATTEMPT,
  SIGNUP_ATTEMPT, SIGNUP_ATTEMPT_FAIL, SIGNUP_SUCCESS,
  
  PROFILE_FETCH_SUCCESS,
  PROFILE_FETCH_FAIL,
  PROFILE_FETCH_ATTEMPT,

} from '../actionTypes'
import { handleAxiosRequestError, LocalStorageKeys } from '../utils/core'


export function loginUserSuccess(token) {
  // const localStorageKeys = Object.keys(LocalStorageKeys)
  // for(let key of localStorageKeys) {
  //   localStorage.removeItem(key)
  // }
  localStorage.setItem(LocalStorageKeys.token, token)

  return (dispatch, getState) => {
    dispatch({
      type: LOGIN_SUCCESS,
      accessToken: token,
      loginErrorMessage: null,
      showLogin: false,
      loginUserIdentifier: '',
      loginPassword: '',
      showHeaderLoginRegisterLinks: false
    })

    dispatch(performProfileFetch())
  }
}

export function loginUserFailure(message) {
  localStorage.removeItem(LocalStorageKeys.token)
  return {
    type: LOGIN_ATTEMPT_FAIL,
    showLoading: false,
    // loginErrorMessage: message,
    showHeaderLoginRegisterLinks: true,
  }
}

export const performLogin = (userIdentifier, password, history) => {
  const postData = {
    userIdentifier: userIdentifier,
    password: password
  }

  return async (dispatch, getState) => {
    dispatch({
      type: LOGIN_ATTEMPT
    })

    try {
      const res = await axios.post(`${apiBaseUrl}/api/login`, postData, getAxiosConfig())
      const serverResponse = res.data
      if (serverResponse && serverResponse.status) {
        const accessToken = serverResponse.data.token

        dispatch(loginUserSuccess(accessToken))
      } else {
        dispatch(loginUserFailure(serverResponse.error))
      }
    } catch(err) {
      const isSilent = true
      const errorMessage = handleAxiosRequestError(err, isSilent)
      dispatch(loginUserFailure(errorMessage))
    }
  }
}

export const performSignup = (username, emailAddress, password, referrerCode, history) => {
  const postData = {
    username, emailAddress, password,
  }
  if(referrerCode && referrerCode !== '') {
    postData.referrerCode = referrerCode
  }

  return async (dispatch, getState) => {
    dispatch({
      type: SIGNUP_ATTEMPT, showLoading: true
    })

    try {
      const res = await axios.post(`${apiBaseUrl}/api/signup`, postData, getAxiosConfig())
      const serverResponse = res.data
      console.log(serverResponse)
      if (serverResponse && serverResponse.status) {
        dispatch({
          type: SIGNUP_SUCCESS, showLoading: false, showSignup: false, showLogin: true, 
        })
        alert('Signup was successful')
        // history.push('/login')
      } else {
        alert(serverResponse.error)
        dispatch({
          type: SIGNUP_ATTEMPT_FAIL, showLoading: false
        })
      }
    } catch(err) {
      const errorMessage = handleAxiosRequestError(err)
      dispatch({
        type: SIGNUP_ATTEMPT_FAIL, showLoading: false
      })
    }
  }
}

export function performProfileFetch() {
  const accessToken = localStorage.getItem(LocalStorageKeys.token)

  return async (dispatch, getState) => {
    dispatch({
      type: PROFILE_FETCH_ATTEMPT
    })

    try {
      const res = await axios.get(`${apiBaseUrl}/api/profile`, getAxiosConfig(accessToken))
      const serverResponse = res.data
      if (serverResponse && serverResponse.status) {
        localStorage.setItem(LocalStorageKeys.profile, JSON.stringify(serverResponse.data))

        dispatch({
          type: PROFILE_FETCH_SUCCESS, profile: serverResponse.data
        })
      } else {
        dispatch({
          type: PROFILE_FETCH_FAIL
        })
      }
    } catch(err) {
      dispatch({
        type: PROFILE_FETCH_FAIL
      })
    }
  }
}

export function performLogout() {
  return async (dispatch, getState) => {
    // const localStorageKeys = Object.keys(LocalStorageKeys)
    // for(let key of localStorageKeys) {
    //   localStorage.removeItem(key)
    // }
    localStorage.removeItem(LocalStorageKeys.token)
    localStorage.removeItem(LocalStorageKeys.profile)

    dispatch({
      type: 'showHeaderLoginRegisterLinks',
      showHeaderLoginRegisterLinks: true,
      accessToken: null,
    })
  }
}
