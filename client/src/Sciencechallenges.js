import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class Sciencechallenges extends React.Component {
    
    constructor(props){
        super (props);
        this.state = {
            sciencechallenges: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:1337/sciencechallenge`, {
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
            data: JSON.stringify({name:'milad'}), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(sciencechallenge => {
                this.setState((state, props) => {
                    return {sciencechallenges: sciencechallenge.data};
                });
            });
    }
    
    render() {
        return(
            <List>
                {this.state.sciencechallenges.map(
                    (item, index) => 
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar 
                            alt = "Remy Sharp" 
                            src = {item.thumbnail} 
                            />
                        </ListItemAvatar>
                        <ListItemText
                        primary = {item.name}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                // className={classes.inline}
                                color="textPrimary"
                            >
                                Ali Connors
                            </Typography>
                            {item.description}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                )}
            </List>
        )
    }
}
export default Sciencechallenges;