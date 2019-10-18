import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class Inbox extends React.Component {
  
  constructor (props) {
    super (props);
    this.state = 
    {
      messages : []
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL+'messages', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(messages => {
            console.info('messages:', messages);
            this.setState((state, props) => {
              return {messages: messages};
            });
        });
  }

  render() {
    return (
      <List>
        {this.state.messages.map(
          
          (message, index) => 
          <ListItem 
            alignItems="flex-start"
            key = {index}
            >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={message.message}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Iman Arghamy
                  </Typography>
                  {" — how are you …"}
                </React.Fragment>
              }
            />
          </ListItem>
        )}
        
      </List>
    )
  };
}
export default Inbox;