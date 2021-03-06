import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

//import Select from '@material-ui/core/Select';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	container_buttons:{
		display:"flex",
		flexDirection:"column",
		marginTop:theme.spacing(2),
	},
	button: {
		fontFamily: 'IranSans',
		fontSize: '14px',
		marginBottom:theme.spacing(2),
	},
}));

function getSteps() {
	return ['شماره تلفن را وارد کنید', 'کد تایید', 'انتخاب کلمه عبور'];
}

export default function HorizontalLinearStepper() {
	const useStyles = makeStyles(theme => ({
		root: {
			width: '100%',
		},
		instructions: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
		container_buttons:{
			display:"flex",
			flexDirection:"column",
			marginTop:theme.spacing(2),
		},
		button: {
			fontFamily: 'IranSans',
			fontSize: '14px',
			marginBottom:theme.spacing(2),
		},
	}));
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [mobileNumber, setMobileNumber] = React.useState(null);
	const [userEnteredCode, setUserEnteredCode] = React.useState(null);
	const [validVerifyCode, setValidVerifyCode] = React.useState(null);
	const [password, setPassword] = React.useState(null);
	const [skipped, setSkipped] = React.useState(new Set());
	const steps = getSteps();

	const isStepOptional = step => {
		return step === 10;
	};

	const saveMobileNumber = (e) => {
		setMobileNumber(e.target.value);
	}

	const saveUserEnteredCode = (e) => {
		setUserEnteredCode(e.target.value);
	}

	const saveUserPassword = (e) => {
		setPassword(e.target.value);
	}

	const isStepSkipped = step => {
		return skipped.has(step);
	};

	const sendVerificationCodeToEmail = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
		return;
		let verify = Math.floor((Math.random() * 99999) + 10000);

		setValidVerifyCode(verify);

		let data = {
			verifyCode : verify,
			mobileNumber: mobileNumber
		}
		fetch(process.env.REACT_APP_API_URL+`users/sendsms`, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		'Content-Type': 'application/json',
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
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	}
  
	const verifySMSCode = () => {
		if(userEnteredCode == validVerifyCode)
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	}

	const updateNewPassword = () => {
		let newUserData = {
			password:password,
			mobile:mobileNumber
		}
		fetch(process.env.REACT_APP_API_URL + `users/updatepassword`, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		'Content-Type': 'application/json',
		},
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(newUserData), // body data type must match "Content-Type" header
		})
		.then(response => response.json())
		.then(request => {
		});
	}

	/*const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}
		setActiveStep(prevActiveStep => prevActiveStep + 1);
		setSkipped(newSkipped);
	};*/
	/*const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}
		setActiveStep(prevActiveStep => prevActiveStep + 1);
		setSkipped(prevSkipped => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};*/

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} alternativeLabel> 
				{
					steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						if (isStepOptional(index)) {
							labelProps.optional = <Typography variant="caption">Optional</Typography>;
						}
						if (isStepSkipped(index)) {
							stepProps.completed = false;
						}
						return (
							<Step key={label} {...stepProps}>
								<StepLabel 

								{...labelProps}>
								<Typography style={{
								fontFamily: 'IranSans',
								fontSize: '14px'
								}}>{label}</Typography>
								</StepLabel>
							</Step>
						);
					})
				}
			</Stepper>
			<div className={classes.container_buttons}>{
				activeStep === steps.length ? (
				<div>
					<Typography className={classes.instructions}>
					All steps completed - you&apos;re finished
					</Typography>
					<Button onClick={handleReset} className={classes.button}>
					Reset
					</Button>
				</div>
				) : (
				<div>
					{/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
					{
						activeStep === 0 ? 
						<Typography className={classes.instructions}>
						<TextField
						fullWidth
						id="standard-phone"
						label="شماره تلفن"
						margin="normal"
						onChange={saveMobileNumber}
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
						</Typography> : null
					}
					{
						activeStep === 1 ? 
						<Typography className={classes.instructions}>
						<TextField
						fullWidth
						id="standard-verifycode"
						label="کد تایید"
						margin="normal"
						onChange={saveUserEnteredCode}
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
						</Typography> : null
					}
					{
						activeStep === 2 ? 
						<React.Fragment>
							<TextField
							fullWidth
							id="standard-lastname"
							label="کلمه ی عبور"
							margin="normal"
							onChange={saveUserPassword}
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
							<TextField
							fullWidth
							id="standard-lastname"
							label="تکرار کلمه ی عبور"
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
						</React.Fragment> : null
					}
					<div className={classes.container_buttons}>
						{
							activeStep === 1 ? 
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
							تصحیح شماره تلفن
							</Button>
							:
							null  
						}

						{
							activeStep === 0 ? 
							<Button
							variant="contained"
							color="primary"
							onClick={sendVerificationCodeToEmail}
							className={classes.button}

							>
							ارسال کد تایید
							</Button>
							: null
						}

						{
							activeStep === 1 ? 
							<Button
							variant="contained"
							color="primary"
							onClick={verifySMSCode}
							className={classes.button}
							>
							تایید کد و مرحله ی بعد
							</Button>
							: null
						}

						{
							activeStep === 2 ? 
							<Button
							variant="contained"
							color="primary"
							onClick={updateNewPassword}
							className={classes.button}
							>
							ثبت کلمه عبور جدید
							</Button>
							: null
						}
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
					</div>
				</div>
				)}
			</div>
		</div>
	);
}
