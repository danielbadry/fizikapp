import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SignUpStepper from './SignUpStepper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

class SignUp extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return(
            <React.Fragment>
                {/* <video 
                        id="bgVideo" 
                        controls = {false}
                        muted
                        preload="true" 
                        autoPlay = {true}
                        style={{
                            position:'absolute',
                            width:'100%',
                            height:'100%',
                            zIndex:'-1',
                        }}
                        >
                        <source src="background.mp4" type="video/mp4" /> 
                    </video> */}
            
                <Grid 
                    container 
                    spacing={0} 
                    alignItems="center"
                    justify="center" 
                    >
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Paper>
                            <Grid container justify="center" alignItems="center" spacing={0}>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography
                                        style={{
                                            fontFamily: 'IranSans',
                                            textAlign: 'center'
                                        }}    
                                        >ثبت نام</Typography>
                                </Grid>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <SignUpStepper />
                                </Grid>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Link 
                                        color="inherit"
                                        style={{
                                            fontFamily: 'IranSans_Ultralight',
                                            fontSize: '13px',
                                            margin:'0',
                                            lineHeight:'2'
                                        }}
                                        to={`/signin`}
                                        component={RouterLink} 
                                        >
                                        حساب کاربری دارید؟ وارد شوید
                                    </Link>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

}

export default SignUp;