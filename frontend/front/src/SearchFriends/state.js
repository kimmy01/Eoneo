import axios from 'axios';
import {
    atom,
    selector
  } from 'recoil';

    export const categoryState = atom({
      key: 'categoryState',
      default: []
    })

    export const getCategorySelector = selector({
      key: "category/get",
      get: async() => {
          try{
              const response = await axios.get('http://localhost:8080/data/topic',{
              headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTM0QHNzYWZ5LmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2Mjg1Njk0NjB9.081YttMl6HrLu8PlCFcxudgXkbLpNI-Myw5hFMU__zZ_d7d8PUJBmUtUlU4VWOd_Lqa4cr1e_DkrIp3EV020CA' }
            });
            return response.data;
          }catch(err){
              throw err;
          }
      },
      set: ({set}, newValue) => {
          set(categoryState, newValue)
      }
  })

  export const userListState = atom({
      key: "userlist",
      default: false,
  })

  export const getUserListState = selector({
      key: "userlist/get",
      get: async({get}) => {
          try{
            const response = await axios.get('http://localhost:8080/api/topicusers', {
                headers:{ 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTM0QHNzYWZ5LmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2Mjg1Njk0NjB9.081YttMl6HrLu8PlCFcxudgXkbLpNI-Myw5hFMU__zZ_d7d8PUJBmUtUlU4VWOd_Lqa4cr1e_DkrIp3EV020CA' },
                params:{
                    topicid: get(tempIdState),
                    userid: get(userIdState)
                }
            });
            return response.data;
          }catch(err){
            throw err;
          }
      },
      set: ({set}, newValue) => {
          set(userListState, newValue)
      }
  })

  export const tempIdState = atom({
      key: "id",
      default: 4,
  })

  export const userIdState = atom({
      key: "userid",
      default: 47
  })