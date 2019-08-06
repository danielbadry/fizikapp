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
import NumberOfRegisteredDevice from './NumberOfRegisteredDevice';
import InvitationList from './InvitationsList';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

class AlignItemsList extends React.Component {

    render() {
        return (
        <List>
            <ListItem alignItems="flex-start">

                <ListItemText
                primary="Number of watched videos"
                secondary={
                    <React.Fragment>
                    {/* <Typography
                        component="span"
                        variant="body2"
                        
                        color="textPrimary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"} */}
                    </React.Fragment>
                }
                />
                <NumberOfWatchedVideosChart />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemText
                primary="Number of invitations"
                secondary={
                    <NumberOfInvitationsChart /> 
                }
                />
                <InvitationList />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemText
                primary="Number of registered device"
                secondary={
                    <NumberOfRegisteredDevice /> 
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemText
                primary="Total online time"
                secondary={
                    <UserTotalOnlineTimeChart /> 
                }
                />
                {/* <UserTotalOnlineTimeChart /> */}
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">

                <ListItemText
                primary="Number of passed quizes"
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        
                        color="textPrimary"
                    >
                        <Link component={RouterLink} to="/">quiz1</Link>
                        &nbsp;-&nbsp;
                        <Link component={RouterLink} to="/">quiz2</Link>
                        &nbsp;-&nbsp;
                        <Link component={RouterLink} to="/">quiz3</Link>
                    </Typography>
                    </React.Fragment>
                }
                />
                
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">

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