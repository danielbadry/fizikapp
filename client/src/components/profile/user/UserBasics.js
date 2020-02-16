import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import UploadComponent from './UploadComponent';

//import { makeStyles } from '@material-ui/core/styles';
//import { Typography } from '@material-ui/core';

class UserBasics extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			firstName : '',
			lastName: '',
			email:'',
			mobile:''
		};
	}

	componentDidMount() {
		let token = window.localStorage.getItem('token');
		fetch(process.env.REACT_APP_API_URL+`users/userinfo`, {
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
		})
		.then(response => response.json())
		.then(userInfo => {
			this.setState((state, props) => {
				return {
					firstName: userInfo.data.firstName,
					lastName: userInfo.data.lastName,
					mobile: userInfo.data.mobile,
					email: userInfo.data.email,
				};
			});
		})
		; // parses JSON response into native JavaScript objects	 
	}

	handleChange = pr => event => {
		event.persist();
		this.setState({[pr]: event.target.value});
	};

	updateForm = () => {
		let data = {
			firstName : this.state.firstName,
			lastName : this.state.lastName,
			mobile : this.state.mobile,
			email : this.state.email
		}
		let token = window.localStorage.getItem('token');
		fetch(process.env.REACT_APP_API_URL+`users/updateuserinfo`, {
			method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
		.then(data => {
			this.setState((state, props) => {
				return {
					firstName: data.data.firstName,
					lastName: data.data.lastName,
					email: data.data.email,
					mobile: data.data.mobile
				}
			}, () => {
				window.location.reload();
			});
		});
	}
	
	render() {
		return(
			<React.Fragment>
				<Grid container justify="center"> 
					<Grid item xs={12} sm={12} md={7} lg={7} xl={7}  justify="center"   alignItems="center">
						<UploadComponent 
							type="thumbnail"
							model="users"
							/>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4} xl={4}  justify="center"   alignItems="center">
						<Button
							type="submit"
							variant="contained"
							component="button"
							style={{ fontFamily: 'IranSans', display:"flex" ,margin: "0 auto"}}
							onClick={()=>{
								let token = window.localStorage.getItem('token');
								let data = {
									thumbnail: window.localStorage.getItem('userThumbnail')
								}
								fetch(process.env.REACT_APP_API_URL+`users/updateuserinfo`, {
									method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
								.then(userInfo => {
									window.location.reload();
									// this.setState((state, props) => {
									//	 return {userBasicInfo: userInfo.data};
									// });
								})
								;
							}}
						>
							ثبت تصویر جدید
						</Button> 
					</Grid>
				</Grid>
				<Grid container spacing={1} justify="center"> 
					<Grid item xs={11} sm={11} md={5} lg={5} xl={5} spacing={1}>
						<TextField
							id="standard-name"
							label="نام"
							value={this.state.firstName}
							onChange={this.handleChange('firstName')}
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
					</Grid>
					<Grid item xs={11} sm={11} md={5} lg={5} xl={5} spacing={1}>
						<TextField
						id="standard-name"
						label="نام خانوادگی"
						value={this.state.lastName}
						onChange={this.handleChange('lastName')}
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
					</Grid>
					<Grid item xs={11} sm={11} md={5} lg={5} xl={5} spacing={1}>
						<TextField
						id="standard-name"
						label="ایمیل"
						InputLabelProps={{
							style: {
								fontFamily: "IranSans"
							}
						}}
						value={this.state.email}
						onChange={this.handleChange('email')}
						margin="normal"
						/>
					</Grid>
					<Grid item xs={11} sm={11} md={5} lg={5} xl={5} spacing={1}>
						<TextField
						id="standard-name"
						label="موبایل"
						InputLabelProps={{
							style: {
								fontFamily: "IranSans"
							}
						}}
						value={this.state.mobile}
						onChange={this.handleChange('mobile')}
						margin="normal"
						/>
					</Grid>
					<Grid item xs={11} sm={11} md={5} lg={5} xl={5} spacing={1}>
						<Select
							// value={values.age}
							// onChange={handleChange}
							inputProps={{
								name: 'age',
								id: 'age-simple',
							}}
							>
							<MenuItem value={10}>دهم</MenuItem>
							<MenuItem value={20}>یازدهم</MenuItem>
							<MenuItem value={30}>دوازدهم</MenuItem>
							<MenuItem value={40}>فارغ التحصیل</MenuItem>
						</Select>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}  justify="center"   alignItems="center">
						<Button
						type="submit"
						variant="contained"
						component="button"
						style={{ fontFamily: 'IranSans', margin:"0 auto", display: "flex" }}
						onClick={this.updateForm}
						// disabled={this.haveErrors(errors)}
						>
							آپدیت اطلاعات
						</Button>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export default UserBasics;