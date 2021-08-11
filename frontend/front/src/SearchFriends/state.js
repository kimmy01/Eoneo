import axios from 'axios';
import {
    atom,
    selector
  } from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const token = 'Bearer ' + localStorage.getItem('token');
const userid = localStorage.getItem('user_id'); 

    export const categoryState = atom({
      key: 'categoryState',
      default: []
    })

    export const getCategorySelector = selector({
      key: "category/get",
      get: async() => {
          try{
              const response = await axios.get('http://localhost:8080/data/topic',{
                headers:{ 'Authorization': token},
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
                headers:{ 'Authorization': token },
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
      effects_UNSTABLE: [persistAtom]
  })

  export const userIdState = atom({
      key: "userid",
      default: 47,
      effects_UNSTABLE: [persistAtom]
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
      default: "",
      effects_UNSTABLE: [persistAtom]
  })

  export const user2IdState = atom({
      key: "user2Id",
      default: 0,
      effects_UNSTABLE: [persistAtom]
  })

  export const user2UIdState = atom({
      key: "user2UId",
      default: "",
      effects_UNSTABLE: [persistAtom]
  })