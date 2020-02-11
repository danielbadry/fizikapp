import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Invitation extends React.Component {
    
    constructor(props) {
        super (props);
        this.state = {
            email: null
        }
    }
    
    setEmail = (event) => {
        this.setState({email:event.target.value});
    }
    
    sendInvitation = () => {
        let token = window.localStorage.getItem('token');
        let data = {          
            email: this.state.email,
        }
        fetch(process.env.REACT_APP_API_URL+`users/sendinvitation`, {
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
        .then(sendResult => {
            console.info('result:', sendResult);
        });
    }

    componentDidMount() {
       
    }

    render() {
        return(
            <React.Fragment>
                <div className="sendinvitehelp">لطفا ایمیل دوستتان را وارد کنید</div>
                <TextField
                    margin="dense"
                    label="write your idea"
                    type="text"
                    onChange={this.setEmail}
                    fullWidth
                />
                <Button 
                    onClick={this.sendInvitation} 
                    color="primary"
                    >
                    ارسال دعوتنامه
                </Button>
            </React.Fragment>
        );
    }
}

export default Invitation;