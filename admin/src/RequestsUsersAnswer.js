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
        console.info('props:', props);
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
                >    
                {this.props.record.usersAnswers.map((userAnswer, index) =>
                    <React.Fragment
                        key={index}
                        >
                        <ListItem button onClick={this.handleClick.bind(this)}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={userAnswer.title}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        <span>esm{userAnswer.name}</span>
                                    </Typography>
                                    {userAnswer.message}
                                    </React.Fragment>
                                }
                            />
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
                    </React.Fragment>
                )}

            </List>
        )
    }
}
export default RequestsUsersAnswer;