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
              const response = await axios.get('http://localhost:8080/api/data/topic',{
                headers:{ 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTM0QHNzYWZ5LmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2Mjg2NTgyMDF9.P03QrLzWmX-NLh9bSzBS0xDPeZH3Zstsmz3rOW9pue_SdbAIYeVi8z9n9M2PmHYEkQW0bf5-NTbbRC4yzsYGKg' },
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
                headers:{ 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTM0QHNzYWZ5LmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2Mjg2NTgyMDF9.P03QrLzWmX-NLh9bSzBS0xDPeZH3Zstsmz3rOW9pue_SdbAIYeVi8z9n9M2PmHYEkQW0bf5-NTbbRC4yzsYGKg' },
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

//   export const roomDataState = atom({
//       key: "roomData",
//       default: {
//         'user1Id':'',
//         'user1UId': '',
//         'user2Id': '',
//         'user2UId': ''
//       }
//   })

  export const user1UIdState = atom({
      key: "user1UId",
      default: ""
  })

  export const user2IdState = atom({
      key: "user2Id",
      default: 0
  })

  export const user2UIdState = atom({
      key: "user2UId",
      default: ""
  })