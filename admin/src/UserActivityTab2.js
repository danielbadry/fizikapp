import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NumberOfInvitationsChart from './NumberOfInvitationsChart';
import UserTotalOnlineTimeChart from './UserTotalOnlineTimeChart';
import NumberOfWatchedVideosChart from './NumberOfWatchedVideosChart';

class AlignItemsList extends React.Component {

    render() {
        return (
        <List>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar 
                        alt="Remy Sharp" 
                        src="https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary="Number of watched videos"
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        
                        color="textPrimary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                }
                />
                <NumberOfWatchedVideosChart />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                
                    <ListItemAvatar>
                        <Avatar 
                            alt="Remy Sharp" 
                            src="https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary="Number of invitations"
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            
                            color="textPrimary"
                        >
                            Ali Connors
                        </Typography>
                        
                        </React.Fragment>
                    }
                    />
                   <NumberOfInvitationsChart /> 

            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar 
                        alt="Total online time" 
                        src="https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary="Number of registered device"
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        
                        color="textPrimary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                }
                />
                
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar 
                        alt="Total online time" 
                        src="https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary="Total online time"
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        
                        color="textPrimary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                }
                />
                <UserTotalOnlineTimeChart />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar 
                        alt="Total online time" 
                        src="https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary="Number of passed quizes"
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        
                        color="textPrimary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                }
                />
                
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar 
                        alt="Total online time" 
                        src="https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary="Shopping level"
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        
                        color="textPrimary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                }
                />
            </ListItem>
        </List>
        )
    }

}
export default AlignItemsList;