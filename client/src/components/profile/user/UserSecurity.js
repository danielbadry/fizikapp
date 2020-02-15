import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

class UserSecurity extends React.Component{
	render() {
		return (
			<React.Fragment>
				<Grid container spacing={1} justify="center">
					<Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
						<TextField
							id="standard-name"
							label="کلمه عبور فعلی"
							// value={this.state.userBasicInfo.firstName}
							// onChange={this.handleChange('firstName')}
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
							id="standard-name"
							label="کلمه عبور جدید"
							// value={this.state.userBasicInfo.firstName}
							// onChange={this.handleChange('firstName')}
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
							id="standard-name"
							label="تایید کلمه عبور جدید"
							// value={this.state.userBasicInfo.firstName}
							// onChange={this.handleChange('firstName')}
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
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
						<Button
							type="submit"
							variant="contained"
							component="button"
							style={{ fontFamily: 'IranSans', display:"flex",margin:"10px auto" }}
							// disabled={this.haveErrors(errors)}
						>
						ذخیره
						</Button>
					</Grid>
				</Grid>
				<Typography>
					شما در دستگاه های زیر لاگین هستید
				</Typography>
				
			</React.Fragment>
		)
	}
}
export default UserSecurity;