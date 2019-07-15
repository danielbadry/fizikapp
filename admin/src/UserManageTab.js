import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import QuestionAnswer from '@material-ui/core/QuestionAnswer';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import VoiceOverOffIcon from '@material-ui/icons/VoiceOverOff';
import MoneyIcon from '@material-ui/icons/Money';
import MessageIcon from '@material-ui/icons/Message';
import CommentIcon from '@material-ui/icons/Comment';
import ReportIcon from '@material-ui/icons/Report';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { GET_LIST, withDataProvider, CREATE, showNotification, SimpleForm, GET_ONE } from 'react-admin';
import PropTypes from 'prop-types';
import { UPDATE } from 'ra-core';

class UserManageTab extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            checked: 0,
            message : '',
            fCoin : 0
        };
    }
    
    setMessage = (e) => {
        this.setState({message:e.target.value});
      };
    
    setFcoin = (e) => {
    this.setState({fCoin:e.target.value});
    };
    
    sendMessage = () => {
        const { dataProvider } = this.props;
        dataProvider(CREATE, 'messages', {
            type:'user',
            sender :'1212121',
            receiver : '23232323',
            message:this.state.message
          })
          .then((res) => {
            this.fetchDirectory(this.state.currentDirectory);
            this.handleClose();
          })
          .catch((e) => {
              console.info('Error: comment not approved', 'warning')
          });
        }  
    
    sendFcoin = () => {
        const { dataProvider } = this.props;
        const updatedRecord = {
            fCoin : this.state.fCoin
        }
        dataProvider(UPDATE, 'users', {
                id: '5d288be3687e8927b4c99320',
                data: updatedRecord
            })
          .then((res) => {
            
          })
          .catch((e) => {
              console.info('Error: comment not approved', 'warning')
          });
        }  

    render() {
        return (
            <List >
            
                <ListItem>
                    <ListItemIcon>
                    <VoiceOverOffIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="suspend" />
                    <ListItemSecondaryAction>
                    <Switch
                        edge="end"
                        // checked={this.state.checked.indexOf('wifi') !== -1}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                    <MoneyIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="Give F-Coin" />
                    <TextField
                        id="standard-number"
                        onChange={this.setFcoin.bind(this)}
                        label="Amount"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <ListItemSecondaryAction>
                    <Button 
                        color="secondary"
                        onClick={this.sendFcoin.bind(this)}
                        >
                        Send F-Coin
                    </Button>
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                    <MessageIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="Message" />
                    <TextField
                        id="standard-number"
                        onChange={this.setMessage.bind(this)}
                        label="message"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <ListItemSecondaryAction>
                    <Button 
                        color="secondary"
                        onClick={this.sendMessage.bind(this)}
                        >
                        Send Message
                    </Button>
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                    <CommentIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="comment authorization" />
                    <ListItemSecondaryAction>
                    <Switch
                        edge="end"
                        // checked={this.state.checked.indexOf('wifi') !== -1}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                        <ReportIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="report authorization" />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            // checked={this.state.checked.indexOf('wifi') !== -1}
                            inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                        <LiveHelpIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="request authorization" />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            // checked={this.state.checked.indexOf('wifi') !== -1}
                            inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                        <QuestionAnswerIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="QA authorization" />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            // checked={this.state.checked.indexOf('wifi') !== -1}
                            inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
                            // onChange={handleAuthorization('checkedA')}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            
            </List>
        );
    }
}


UserManageTab.propTypes = {
    dataProvider: PropTypes.func.isRequired,
};

export default withDataProvider(UserManageTab);