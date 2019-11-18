import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class Beyondthebooks extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            beyondthebooks : []
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');

        fetch(process.env.REACT_APP_API_URL+`beyondthebook`, {
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
            .then(request => {
                this.setState((state, props) => {
                    return ({beyondthebooks: request.data});
                });
            });
    }

    render () {
        return (
            <List>
                {this.state.products.map(
                    (item , index) => 
                        <ListItem key={index} alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src={item.thumbnail} />
                            </ListItemAvatar>
                            <ListItemText
                            primary={
                                <Link 
                                    color="inherit"
                                    style={{
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    component={RouterLink} 
                                    to={`/product/${item.id}`}>
                                        {item.name}
                                </Link>
                            }
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="div"
                                    variant="body2"
                                    color="textPrimary"
                                    style={{
                                        fontFamily: 'IranSans'
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    component="div"
                                    variant="body2"
                                    color="textPrimary"
                                    style={{
                                        fontFamily: 'IranSans'
                                    }}
                                >
                                    {item.jalaaliUserFriendlyCreatedDate}
                                </Typography>
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                )}
                
            </List>
        );
    }
}
export default Beyondthebooks;