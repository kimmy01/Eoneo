import axios from 'axios'
import {LOGIN_USER, REGISTER_USER} from './types'


export function loginUser(dataToSubmit) {
  const request = axios.post('/api/authenticate', dataToSubmit)
      .then(response => response.data)
      .catch(
        
        alert("confirm email or password")
        )

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit) {
  const request = axios.post('/api/signup', dataToSubmit)
      .then(response => response.data)
      .catch(Error => console.log(Error), alert("Email duplicated or incorrect entry form"))

  return {
    type: REGISTER_USER,
    payload: request
  }
}