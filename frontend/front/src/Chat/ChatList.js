import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';

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

export default function ChatList() {
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