import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme } from '@material-ui/core/styles';
import ForgetPasswordStepper from './ForgetPasswordStepper';
import Typography from '@material-ui/core/Typography';

class ForgetPassword extends React.Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {

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
					<Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
						<Paper style={classes.main_signup}>
							<Grid container justify="center" alignItems="center" spacing={0}>
								<Typography style={classes.title} >
									بازیابی کلمه عبور
								</Typography>
								<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
									<ForgetPasswordStepper />
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}

}

export default ForgetPassword;