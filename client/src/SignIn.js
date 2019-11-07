import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SignUpStepper from './SignUpStepper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SignIn extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return(
            <React.Fragment>
                <Grid container justify="center" alignItems="center" spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography
                            style={{
                                fontFamily: 'IranSans',
                                textAlign: 'center'
                            }}    
                            >ورود</Typography>
                    </Grid>
                    <Grid item>
                        <Paper>
                            <TextField
                                id="standard-lastname"
                                label="شماره تلفن"
                                margin="normal"
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
                            <TextField
                                id="standard-lastname"
                                label="کلمه عبور"
                                margin="normal"
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
                            <Grid item>
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
                                    ورود
                                </Button>
                            </Grid>
                            <Grid item>
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
                            <Grid item>
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
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

}

export default SignIn;