import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

//import Divider from '@material-ui/core/Divider';


class UserSciencechallenges extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            sciencechallenges : []
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+'sciencechallenge/showmysciencechallenge', {
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
        .then(sciencechallenges => {
            console.info('my science challenge:', sciencechallenges);
            this.setState((state, props) => {
            return {sciencechallenges: sciencechallenges.data};
            });
        });
    }

    render() {
        return (
            <List>
                {this.state.sciencechallenges.map(
                (item, index) => 
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={
                        <Link 
                            component={RouterLink} 
                            to={`/sciencechallenge/${item.id}`}
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                        name
                        </Link>}
                        // primary={item.recordData.name}
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
                                {item.jalaaliUserFriendlyCreatedDate}
                            </div>
                            </Typography>
                            <div
                                style={{ fontFamily: 'IranSans_Light' }}
                                >
                                {item.description}
                            </div>
                        </React.Fragment>
                        }
                    />
                    </ListItem>
                )}
            </List>
        )
    }
}
export default UserSciencechallenges;