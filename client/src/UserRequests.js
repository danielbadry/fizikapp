import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class Requests extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            requests : [],
            tags: [],
            activeTags: []
        }
    }

    fetchRequests = () => {
        
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`requests/getuserrequests`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            })
            .then(response => response.json())
            .then(requests => {
                this.setState((state, props) => {
                    return {requests: requests.data};
                });
            }); 
    }

    render() {
        
        return (
            
          <List>    
              {this.state.requests.map(
              (request, index) => 
              <ListItem 
                  alignItems="flex-start"
                  key={index}
                  >
                  
                  <ListItemText
                      primary={
                          <Link 
                              component={RouterLink} 
                              to={`/request/${request.id}`}
                              style={{ fontFamily: 'IranSans_Light' }}
                              >
                      {request.title}
                  </Link>}
                  secondary={
                      <React.Fragment>
                      <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                      >
                        <div
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            {request.jalaaliUserFriendlyCreatedDate}
                        </div>
                          {/* <Link 
                            component={RouterLink} 
                            to={'https://google.com'}
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                              {request.userInfo.fullName}
                          </Link> */}
                      </Typography>
                        <div
                        style={{ fontFamily: 'IranSans_Light' }}
                        >{request.message}</div>
                      </React.Fragment>
                  }
                  />
              </ListItem>
              )}
            </List>

        );
    }
}

export default Requests;