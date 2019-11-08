import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SignUpStepper from './SignUpStepper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber : null,
            password: null,
            isUserLoggedIn : false
        }
    }
    
    saveMobileNumber = (e) => {
        this.setState({
            mobileNumber : e.target.value
        });
    }
    
    savePassword = (e) => {
        this.setState({
            password : e.target.value
        });
    }

    checkUserForLogin = () => {
        let userData = {
            mobile: this.state.mobileNumber,
            password: this.state.password
        }
        fetch(process.env.REACT_APP_API_URL + `users/authenticate`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(userData), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(result => {
                if(result.auth) {
                    window.localStorage.setItem('token', result.token);
                    this.setState({
                        isUserLoggedIn : true
                    });
                }
            });
    }

    componentDidMount() {
        let token = window.localStorage.getItem('token');
        if (token)
            this.setState({
                isUserLoggedIn : true
            })
    }

    render() {
        if(this.state.isUserLoggedIn) {
            return (
                <Redirect to="/" />
            )
        } else
        return(
            <React.Fragment>
                <Grid container justify="center" alignItems="center" spacing={0}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Paper>
                <Grid container justify="center" alignItems="center" spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Typography
                                style={{
                                    fontFamily: 'IranSans',
                                    textAlign: 'center'
                                }}    
                                >ورود
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                            id="standard-lastname"
                            label="شماره تلفن"
                            margin="normal"
                            onChange={this.saveMobileNumber}
                            InputProps={{
                            style: {
                                fontFamily: 'IranSans',
                                fontSize: '14px'
                            },
                            }}
                            InputLabelProps={{
                            style:{
                                fontFamily: 'IranSans',
                                fontSize: '14px'
                            }
                            }}
                        />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                            id="standard-lastname"
                            label="کلمه عبور"
                            margin="normal"
                            onChange={this.savePassword}
                            InputProps={{
                            style: {
                                fontFamily: 'IranSans',
                                fontSize: '14px'
                            },
                            }}
                            InputLabelProps={{
                            style:{
                                fontFamily: 'IranSans',
                                fontSize: '14px'
                            }
                            }}
                            type="password"
                        />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={this.checkUserForLogin}
                                // className={classes.button}
                                style={{
                                    fontFamily: 'IranSans',
                                    fontSize: '14px'
                                }}
                                >
                                ورود
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Button
                                href="#forget-password"
                                variant="outlined"
                                color="primary"
                                // onClick={sendVerificationCodeToEmail}
                                // className={classes.button}
                                style={{
                                    fontFamily: 'IranSans',
                                    fontSize: '14px'
                                }}
                                >
                                کلمه عبور خود را فراموش کرده اید؟
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Button
                                variant="outlined"
                                color="primary"
                                // onClick={sendVerificationCodeToEmail}
                                // className={classes.button}
                                style={{
                                    fontFamily: 'IranSans',
                                    fontSize: '14px'
                                }}
                                >
                                ایجاد حساب کاربری جدید
                            </Button>
                        </Grid>
                        </Grid>
                    </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

}

export default SignIn;