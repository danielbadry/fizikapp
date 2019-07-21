import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SlowMotionVideo from '@material-ui/icons/SlowMotionVideo';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import QuizOptionsList from './QuizOptionsList';

class NestedList extends React.Component {
 
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
        //     quiz items
        //     </ListSubheader>
        // }
        >
        <ListItem button>
            <ListItemIcon>
            <SlowMotionVideo />
            </ListItemIcon>
            <ListItemText primary="question 1" />
            <Tooltip title="visible">
                <IconButton>
                    <VisibilityOffIcon />
                </IconButton>
            </Tooltip>
            
            <Tooltip title="add option">
                <IconButton>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            
            <Tooltip title="delete">
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            {this.state.open ? <ExpandLess onClick={this.handleClick.bind(this)} /> : <ExpandMore onClick={this.handleClick.bind(this)} />}
        </ListItem>
        <ListItem button>
            <ListItemIcon>
            <SlowMotionVideo />
            </ListItemIcon>
            <ListItemText primary="question 2" />
            <Tooltip title="visible">
                <IconButton>
                    <VisibilityOffIcon />
                </IconButton>
            </Tooltip>
            
            <Tooltip title="add option">
                <IconButton>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            
            <Tooltip title="delete">
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            {this.state.open ? <ExpandLess onClick={this.handleClick.bind(this)} /> : <ExpandMore onClick={this.handleClick.bind(this)} />}
        </ListItem>
        <ListItem button>
            <ListItemIcon>
            <SlowMotionVideo />
            </ListItemIcon>
            <ListItemText primary="question 3" />
            
            <Tooltip title="visible">
                <IconButton>
                    <VisibilityOffIcon />
                </IconButton>
            </Tooltip>
            
            <Tooltip title="add option">
                <IconButton>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            
            <Tooltip title="delete">
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            {this.state.open ? <ExpandLess onClick={this.handleClick.bind(this)} /> : <ExpandMore onClick={this.handleClick.bind(this)} />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <QuizOptionsList />
        </Collapse>
        </List>
    )};
}

export default NestedList;