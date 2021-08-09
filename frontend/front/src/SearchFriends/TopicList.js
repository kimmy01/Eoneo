// react_program
import React, {useEffect, useState} from 'react';
import axios from 'axios'
// css
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


export default function TopicList() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
       getUserData()
    }, [])

// 스타일,토큰, id
//# 현재 토큰과 id 모두 세션에서 가져옴
  const classes = useStyles();  
  const jwttoken = 'Bearer '+localStorage.getItem('token')
  const my_id = localStorage.getItem('user_id')

// 해당토픽과 나의 관심사를 일치하는 유저들 가져오기
//# 현재 topic은 4로 고정(수정해야함)
const getUserData = () => {
    axios.get(`http://localhost:8080/api/topicusers`,{
            params: {
                topicid: 4,
                userid: my_id, 
            },
            headers: { "Authorization": jwttoken },
})
        .then(response =>
            {response.data.map((userdata) =>
                setUserList((userList) => [...userList,userdata]))
                console.log(response.data)
            })
        .catch((Err) => console.error(Err));
    }


// 채팅방생성: 해당 채팅방을 생성하는 함수
    // 채팅방 인증 헤더
    const config = {
        headers: { "Authorization": jwttoken },
    }

    // 방생성 함수
    const createChatroom = (opponent_id,e) => {
        // UniqueID 생성함수 
        const randomValue1 = Math.random().toString(36).substr(2,11);
        const randomValue2 = Math.random().toString(36).substr(2,11);

        // 채팅방 데이터
        const roomData =    {
            "user1Id": my_id,
            "user1UId": my_id+ randomValue1,
            "user2Id": opponent_id,
            "user2UId": opponent_id + randomValue2
        }
        
        // 방생성 후 알림
        axios.post(`http://localhost:8080/api/chatroom/create`,roomData, config)
        .then(response => window.location.replace('/chat') )
        .catch((Err) => alert("방 생성의 실패하였습니다"));
    }


  return (
    <List className={classes.root}>

    {userList.map((user) =>(
      <ListItem key={user.id} style={{border:"1px solid", width: "150%", margin:"10px"}} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={user.username} src="1" /> 
                {/* {user.userDetail.profile_image} */}
            </ListItemAvatar>
            <ListItemText
            primary={user.username}
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                </Typography>
                   
                    native: {user.userLanguage.nativeLanguage.language} <br/>
                    want: {user.userLanguage.wantLanguage.language} <br/>
                    topic:  
                </React.Fragment>
            }
            />
            <div style={{position:'relative',top:"15px"}}>
                <MeetingRoomIcon onClick={(e)=>{createChatroom(user.id, e)}} />
            </div>
        </ListItem>
          ))}
    </List>
  );
}