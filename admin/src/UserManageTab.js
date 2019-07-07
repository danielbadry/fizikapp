import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import QuestionAnswer from '@material-ui/core/QuestionAnswer';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class SwitchListSecondary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            checked: 0
        };
    }

    render() {
        return (
            <List >
            
                <ListItem>
                    <ListItemIcon>
                    <WifiIcon />
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
                    <WifiIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="Give F-Coin" />
                    <TextField
                        id="standard-number"
                        label="Amount"
                        value="20"
                        type="number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        margin="normal"
                    />
                    <ListItemSecondaryAction>
                    <Button color="secondary">
                        Send F-Coin
                    </Button>
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                    <WifiIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="Message" />
                    <TextField
                        id="standard-number"
                        label="message"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <ListItemSecondaryAction>
                    <Button color="secondary">
                        Send Message
                    </Button>
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                    <WifiIcon />
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
                        <BluetoothIcon />
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
                        <BluetoothIcon />
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
                        <BluetoothIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="QA authorization" />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            // checked={this.state.checked.indexOf('wifi') !== -1}
                            inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            
            </List>
        );
    }
}

export default SwitchListSecondary; 
