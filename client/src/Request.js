import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import StickyFooter from "./StickyFooter";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class Request extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            request : {},
            answer:null,
            usersAnswers:[]
        }
    }
    
    handleChange = () => {
        console.info('hello');
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`requests/${this.props.requestid}`, {
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
                return {request: request, usersAnswers:request.usersAnswers};
                });
            });
    }

    handleChange = () => event => {
        this.setState({answer: event.target.value});
    };

    sendMyAnswer = () => {
        let data = {
            message: this.state.answer,
            parentId: this.props.requestid,
        }
        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`requests`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(request => {
                fetch(process.env.REACT_APP_API_URL+`requests/${this.props.requestid}`, {
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
                        return {request: request, usersAnswers:request.usersAnswers};
                        });
                    });
            });
    }

    render () {
        
        return (
            <Grid container spacing={3}>
                        
                   
                    <Grid item xs={12}>
                        <Paper>
                            <h3>{this.state.request.title}</h3>  
                            <h5>{this.state.request.jalaaliCreatedDate}</h5>
                            <p>{this.state.request.message}</p>
                        </Paper>

                        <Paper>
                            <List>
                                {this.state.usersAnswers.map(
                                    (item, index) => 
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.userInfo.firstName + item.userInfo.lastName}
                                                secondary={
                                                    <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        
                                                        color="textPrimary"
                                                    >
                                                        {item.message}
                                                    </Typography>
                                                    {item.createdAt}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                )}
                                
                            </List>
                        </Paper>

                        <Paper>

                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper>
                            <TextField
                                onChange={this.handleChange()}
                                id="standard-full-width"
                                label="Label"
                                style={{ margin: 8 }}
                                placeholder="Placeholder"
                                helperText="Full width!"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={this.sendMyAnswer}
                                >
                                ارسال پاسخ
                            </Button>
                        </Paper>
                    </Grid>

                    <StickyFooter />

            </Grid>
        );
    }
}
export default Request;