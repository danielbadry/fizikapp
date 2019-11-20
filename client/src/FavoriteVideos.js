import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class FavoritesList extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      favoritesList : []
    }
  }

  componentDidMount () {
    let token = localStorage.getItem('token');
    fetch(process.env.REACT_APP_API_URL+'favorites/', {
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
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(favoritesList => {
        this.setState((state, props) => {
          return {favoritesList: favoritesList.data};
        });
    });
  }
  
  render() {
    return (
      <List>
        {this.state.favoritesList.map(
          (favorite, index) => 
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
              primary={
                <Link 
                    component={RouterLink} 
                    to={`/product/${favorite.recordData.id}`}
                    style={{ fontFamily: 'IranSans_Light' }}
                    >
                  {favorite.recordData.name}
                </Link>}
                // primary={favorite.recordData.name}
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
                        {favorite.jalaaliUserFriendlyCreatedDate}
                      </div>
                    </Typography>
                    <div
                      style={{ fontFamily: 'IranSans_Light' }}
                      >{favorite.recordData.description}</div>
                  </React.Fragment>
                }
              />
            </ListItem>
          )}
      </List>
    )
  };
}
export default FavoritesList;