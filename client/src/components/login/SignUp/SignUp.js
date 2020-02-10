import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SignUpStepper from './SignUpStepper';
import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";

class SignUp extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isUserLoggedIn : false
		}
	}

	componentDidMount() {
		let token = window.localStorage.getItem('token');
		if (token)
			this.setState({
				isUserLoggedIn : true
			})
	}

	render() {
		const theme = createMuiTheme();
		const classes = {
			title:{
				display: 'block',
				fontFamily: 'IranSans',
				textAlign: 'right',
				width: "100%",
			},
			main_signup:{
				padding:theme.spacing(4),
				direction: "rtl",
			},
			button:{
				fontFamily: 'IranSans',
				fontSize: '14px',
				marginBottom:theme.spacing(2),
			},
			container_buttons:{
				display:"flex",
				flexDirection:"column",
				marginTop:theme.spacing(2),
			}
		}
		if(this.state.isUserLoggedIn) {
			return (
				<Redirect to="/" />
			)
		} else
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
				<Grid container justify="center" alignItems="center" spacing={0}>
					<Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
						<Paper style={classes.main_signup}>
							<Grid container spacing={0}>
								<Typography style={classes.title} >
                                    ایجاد حساب کاربری
								</Typography>
								<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
									<SignUpStepper />
								</Grid>
								<div style={classes.container_buttons}>
									<Button
									href="#signin"
									style={classes.button}
									>
									حساب کاربری دارید؟ وارد شوید
									</Button>
								</div>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}

}

export default SignUp;