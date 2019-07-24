import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Thumbnail from './ThumbnailImage';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class RequestsUsersAnswer extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            open : false
        }
    }

    handleClick() {
        this.setState((state, props) => {
            return {open: !state.open};
          });
    }

    render () {
        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                // subheader={
                //     <ListSubheader component="div" id="nested-list-subheader">
                //     Nested List Items
                //     </ListSubheader>
                // }
                >
                
                <ListItem button>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
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
                
                <ListItem button>
                    <ListItemIcon>
                        <Thumbnail source="thumbnail" label="thumbnail" />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItem>
                
                <ListItem button onClick={this.handleClick.bind(this)}>
                    <ListItemIcon>
                        <Thumbnail source="thumbnail" label="thumbnail" />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem button>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItem>
                    </List>
                </Collapse>

                </List>
        )
    }
}
export default RequestsUsersAnswer;