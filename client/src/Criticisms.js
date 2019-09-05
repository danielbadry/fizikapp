import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Criticisms extends React.Component{
    constructor(props) {
        super(props);
    this.state = {
        title : '',
        message: ''
    }
    }
    
    handleChange = name => event => {
        this.setState({[name]: event.target.value });
    };

    sendCriticisms = () => {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        let data = {
title : this.state.title,
message : this.state.message,
userId: user.id
        }
        fetch(`http://localhost:1337/criticisms`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(request => {
                this.setState((state, props) => {
                    return ({title: '', message:''});
                });
            });
    }

    render() {
        return (
<React.Fragment>
    <TextField
        id="standard-title"
        label="عنوان"
        // className={classes.textField}
        value={this.state.title}
        onChange={this.handleChange('title')}
    margin="normal"
        InputLabelProps={{
            style: {
                fontFamily: "IranSans"
            }
        }}
        InputProps={{
            style: {
                fontFamily: "IranSans"
            }
        }}
    />

    <TextField
        id="standard-message"
        label="پیام"
        // className={classes.textField}
        value={this.state.message}
        onChange={this.handleChange('message')}
        margin="normal"
        InputLabelProps={{
            style: {
                fontFamily: "IranSans"
            }
        }}
        InputProps={{
            style: {
                fontFamily: "IranSans"
            }
        }}
    />

    <Button 
        variant="contained" 
        color="primary" 
        onClick={this.sendCriticisms}
        //   className={classes.button}
        style={{
            fontFamily: "IranSans"
        }}
        >
        ارسال درخواست
    </Button>
</React.Fragment>
        );
    }
}

export default Criticisms;