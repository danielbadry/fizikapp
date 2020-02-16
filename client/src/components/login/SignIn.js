import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";

//import Link from '@material-ui/core/Link';
//import { Link as RouterLink } from 'react-router-dom';
//import SignUpStepper from './SignUp/SignUpStepper';

class SignIn extends React.Component{
	constructor(props) {
		super(props);
		
	}
	state = {
		mobileNumber : null,
		password: null,
		isUserLoggedIn : false
	}
	componentDidMount() {
		let token = window.localStorage.getItem('token');
		if (token)
			this.setState({
				isUserLoggedIn : true
			})
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
					window.location.reload();
				}
			});
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
		} else {
		return(
			<React.Fragment>
				<Grid container justify="center" alignItems="center" spacing={0}>
					<Grid item xs={12} sm={8} md={8} lg={4} xl={4}>
						<Paper style={classes.main_signup}>
							<Grid container spacing={0}>
								<Typography style={classes.title} >
									ورود از طریق شماره تلفن همراه
								</Typography>
								<TextField
									id="standard-lastname"
									label="شماره تلفن"
									fullWidth
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
									fullWidth
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
							<div style={classes.container_buttons}>
								<Button
									variant="outlined"
									color="primary"
									onClick={this.checkUserForLogin}
									// className={classes.button}
									style={classes.button}
									>
									ورود
								</Button>
								<Button
									href="#forget-password"
									// onClick={sendVerificationCodeToEmail}
									// className={classes.button}
									style={classes.button}
									>
									کلمه عبور خود را فراموش کرده اید؟
								</Button>
								<Button
									href="#signup"
									// onClick={sendVerificationCodeToEmail}
									// className={classes.button}
									style={classes.button}
									>
									ایجاد حساب کاربری جدید
								</Button>
							</div>
						</Paper>
					</Grid>
				</Grid>
			</React.Fragment>
		)
		}
	}

}

export default SignIn;