import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';
import axios from 'axios'

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

    useEffect(() => {
       getUserData()
    }, [])


  const classes = useStyles();

  const userdata = [
    {id : "1", name:"sara", lang: "ko",profileImage:""},
    {id : "2", name:"lala", lang: "ko",profileImage:""},
    {id : "3", name:"kaka", lang: "ko",profileImage:""},
    {id : "4", name:"kaka", lang: "ko",profileImage:""},
    {id : "5", name:"kaka", lang: "ko",profileImage:""},
    {id : "6", name:"kaka", lang: "ko",profileImage:""},
    {id : "7", name:"kaka", lang: "ko",profileImage:""},
    {id : "8", name:"kaka", lang: "ko",profileImage:""},
    {id : "9", name:"kaka", lang: "ko",profileImage:""},
    {id : "10", name:"kaka", lang: "ko",profileImage:""},
    {id : "11", name:"kaka", lang: "ko",profileImage:""},
    {id : "12", name:"kaka", lang: "ko",profileImage:""},
    {id : "13", name:"kaka", lang: "ko",profileImage:""},
    {id : "14", name:"kaka", lang: "ko",profileImage:""},
]
    const jwttoken = 'Bearer '+localStorage.getItem('token')

    const config = {
        headers: { "Authorization": jwttoken },
        "topicid": 2,
        "userid": 2,
    }

    // const Data =    {
    //     "topicid": 2,
    //     "userid": 2,
     
    //   }

//     ?userid=2&roomId=asdfa
// 김나영[서울_1반_A102]팀원 님이 모두에게:    오전 9:52
// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })


    const getUserData = () => {
        const request = axios.get(`http://localhost:8080/api/topicusers`,{
                params: {
                    topicid: 4,
                    userid: 47, 
                },
                headers: { "Authorization": jwttoken },
    })
            .then(response => console.log(response))
            .catch((Err) => console.error(Err));
        }
        
        // .then(response => 
        //         {response.data.data.chats.map((chat,chatMessageId) =>
        //             setChatMessages((chatMessages) => [...chatMessages,chat]))
        //         })
    // const getUserData = () => {
    //     const request = axios.get(`http://localhost:8080/api/topicusers/`,config)
    //     // .then(response => 
    //     //         {response.data.data.chats.map((chat,chatMessageId) =>
    //     //             setChatMessages((chatMessages) => [...chatMessages,chat]))
    //     //         })
    //     .then(response => console.log(response))
    //     .catch((Err) => console.error(Err));
    // }

  return (
    <List className={classes.root}>
    {userdata.map((user,id) =>(
      <ListItem style={{border:"1px solid", width: "150%", margin:"10px"}} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={user.name} src={user.profileImage} />
            </ListItemAvatar>
            <ListItemText
            primary={user.name}
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    new message is here
                </Typography>
                </React.Fragment>
            }
            />
            <div style={{position:'relative',top:"15px"}}>
                <NoMeetingRoomIcon />
            </div>
        </ListItem>
        // <Divider variant="inset" component="li" />
          ))}
    </List>
  );
}