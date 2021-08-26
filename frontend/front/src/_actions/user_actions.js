import axios from 'axios'
import {LOGIN_USER, REGISTER_USER} from './types'
import swal from '@sweetalert/with-react'

const MoodButton = ({ rating, onClick }) => (
  <button 
    data-rating={rating}
    className="mood-btn" 
    onClick={() => onClick(rating)}
  />
)

const onPick = value => {
  swal("Thanks for your rating!", `You rated us ${value}/3`, "success")
}

export function loginUser(dataToSubmit) {
  const request = axios.post('/api/authenticate', dataToSubmit)
      .then(response => response.data)
      .catch(
        
        swal({
          text: "How was your experience getting help with this issue?",
          buttons: {
            cancel: "Close",
          },
          content: (
            <div>
              <MoodButton 
                rating={1} 
                onClick={onPick}
              />
              <MoodButton 
                rating={2} 
                onClick={onPick}
              />
              <MoodButton 
                rating={3} 
                onClick={onPick}
              />
            </div>
          )
        })
        
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