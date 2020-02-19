import React from 'react';
import Grid from '@material-ui/core/Grid';
import StickyFooter from "../header/footer/StickyFooter";
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import VideocamIcon from '@material-ui/icons/Videocam';
import MessageIcon from '@material-ui/icons/Message';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import UserBasics from './user/UserBasics';
import UserSecurity from './user/UserSecurity';
import UserFinancialTab from './user/UserFinancialTab';
import UserSciencechallenges from './UserSciencechallenges';
import Dashboard from './Dashboard';
import Inbox from './Inbox';
import WatchedVideosList from './WatchedVideosList';
import FavoriteVideos from './FavoriteVideos';
import UserRequests from './UserRequests';
import {HashRouter, Route } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
//import ProfileTabs from './ProfileTabs';
//import Divider from '@material-ui/core/Divider';
//import InboxIcon from '@material-ui/icons/Inbox';
//import DraftsIcon from '@material-ui/icons/Drafts';
//import { func } from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user : {
				firstName:"",
				lastName:""
			},
			myPlan : []
		}
	}

	HandleDashboard = ({ match }) => {
		return (
			<Dashboard />
		);
	}
	
	HandleFinancial = ({ match }) => {
		return (
			<UserFinancialTab />
		);
	}
	
	HandleGeneral = ({ match }) => {
		return (
			<UserBasics />
		);
	}
	
	HandleSecurity = ({ match }) => {
		return (
			<UserSecurity />
		);
	}
	
	HandleInbox = ({ match }) => {
		return (
			<Inbox />
		);
	}
	
	HandleWatchedvideos = ({ match }) => {
		return (
			<WatchedVideosList />
		);
	}
	
	HandleFavorites = ({ match }) => {
		return (
			<FavoriteVideos />
		);
	}
	
	HandleRequests = ({ match }) => {
		return (
			<UserRequests />
		);
	}
	
	HandleSciencechallenges = ({ match }) => {
		return (
			<UserSciencechallenges />
		);
	}

	componentDidMount() {
		let token = window.localStorage.getItem('token');
		fetch(process.env.REACT_APP_API_URL+`users/userinfo`, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'authorization': `Bearer ${token}`,
			},
			redirect: 'follow',
			referrer: 'no-referrer',
			})
			.then(response => response.json())
			.then(user => {
				this.setState({
					user : user.data
				}, () => {
					console.info(this.state.user.data);
				});
			});

		fetch(process.env.REACT_APP_API_URL+`users/getcurrentuserplan`, {
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
			.then(myPlans => {
				this.setState({
					myPlan : myPlans.data
				});
			});
	}

	render() {
		const theme = createMuiTheme();
		const classes = {
			container_fullname:{
				fontFamily:'IranSans',
				textAlign:"right",
				width: "100%",
			},
			main_container:{
				padding:theme.spacing(4),
				direction: "rtl",
			},
			container_tarh:{
				fontFamily:'IranSans',
				textAlign:"right",
				fontSize:"10px",
				width: "100%",
			},
			full_data_container:{
				width:"100%",
				marginRight:theme.spacing(5),
				marginLeft:theme.spacing(5),
			},
			avatar_profile:{
				margin:"10px auto", 
				borderRadius:"50%", 
				display: "block"
			}
		}
		return (
			<React.Fragment>
				<Grid container spacing={1} justify="center">
				<Hidden only={['md', 'lg','xl']}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<ButtonGroup color="primary" aria-label="outlined primary button group">
						<Button startIcon={<DashboardIcon />} />
						<Button startIcon={<EditIcon />} />
						<Button startIcon={<AttachMoneyIcon />} />
						<Button startIcon={<AttachMoneyIcon />} />
						<Button startIcon={<MessageIcon />} />
					</ButtonGroup>
					<ButtonGroup color="primary" aria-label="outlined primary button group">
						<Button startIcon={<VideocamIcon />} />
						<Button startIcon={<FavoriteIcon />} />
						<Button startIcon={<QuestionAnswerIcon />} />
						<Button startIcon={<QuestionAnswerIcon />} />
					</ButtonGroup>
				</Grid>
				</Hidden>
					<Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
						<Paper style={classes.main_container}>
							<HashRouter>
								<Route exact path="/profile" component={this.HandleDashboard} />
								<Route exact path="/profile/financial" component={this.HandleFinancial} />
								<Route exact path="/profile/general" component={this.HandleGeneral} />
								<Route exact path="/profile/security" component={this.HandleSecurity} />
								<Route exact path="/profile/inbox" component={this.HandleInbox} />
								<Route exact path="/profile/watchedvideos" component={this.HandleWatchedvideos} />
								<Route exact path="/profile/myfavorites" component={this.HandleFavorites} />
								<Route exact path="/profile/myrequests" component={this.HandleRequests} />
								<Route exact path="/profile/mysciencechallenges" component={this.HandleSciencechallenges} />
							</HashRouter>
						</Paper>
					</Grid>
					<Hidden smDown>
					<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
						<Paper>
							<Grid container spacing={0}>
								<div style={classes.full_data_container}>
									<img
										style={classes.avatar_profile}
										width="100px"
										src={this.state.user.thumbnail} 

										/>
									<Typography style={classes.container_fullname} >
										{this.state.user.firstName + ' ' + this.state.user.lastName} 
									</Typography>
									{this.state.myPlan.map(
										(item, index) => 
										<Typography style={classes.container_tarh} >
											اشتراک: {item.shoppingPlanName}
										</Typography>
									)}
								</div>
								<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
									<hr />
								</Grid>
								
								<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
									<List component="nav" aria-label="main mailbox folders" style={{
										direction: 'rtl'
									}}>

										<ListItem 
											button
											component="a"
											href="#/profile"
											>
											<ListItemIcon>
												<DashboardIcon style={{
													color: '#3f51b5'
												}} />
											</ListItemIcon>
											<ListItemText 
												primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
															داشبورد
														 </Typography>} />
										</ListItem>
										
										<ListItem 
											button 
											component="a"
											href="#/profile/general"
											>
											<ListItemIcon>
												<EditIcon style={{
													color: 'salmon'
												}} />
											</ListItemIcon>
											<ListItemText 
												primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
															عمومی
														 </Typography>} />
										</ListItem>
										
										<ListItem 
											button
											component="a"
											href="#/profile/financial"
											>
											<ListItemIcon>
												<AttachMoneyIcon style={{
													color: 'gold'
												}}/>
											</ListItemIcon>
											<ListItemText 
												primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
														مالی
														</Typography>} />
										</ListItem>
										
										<ListItem 
											button
											component="a"
											href="#/profile/security"
											>
											<ListItemIcon>
												<AttachMoneyIcon style={{
													color: 'gold'
												}}/>
											</ListItemIcon>
											<ListItemText 
												primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
														امنیت
														</Typography>} />
										</ListItem>
										
										<ListItem 
											button 
											component="a"
											href="#/profile/inbox"
											>
											<ListItemIcon>
												<MessageIcon style={{
													color: 'turquoise'
												}} />
											</ListItemIcon>
											<ListItemText 
												primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
														صندوق پیام
														</Typography>} />
										</ListItem>
										
										<ListItem 
											button
											component="a"
											href="#/profile/watchedvideos"
											>
											<ListItemIcon>
												<VideocamIcon />
											</ListItemIcon>
											<ListItemText 
												primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
														ویدیوهای دیده شده
														</Typography>} />
										</ListItem>
										
										<ListItem 
											button 
											component="a"
											href="#/profile/myfavorites"
											>
											<ListItemIcon>
												<FavoriteIcon style={{
													color: '#f50057'
												}}/>
											</ListItemIcon>
											<ListItemText 
												primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
														مورد علاقه ها
														</Typography>} />
										</ListItem>
										
										<ListItem 
											button
											component="a"
											href="#/profile/myrequests"
											>
											<ListItemIcon>
												<QuestionAnswerIcon style={{
													color: 'yellowgreen'
												}} />
											</ListItemIcon>
											<ListItemText 
												primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
														درخواست های من
														</Typography>} />
										</ListItem>
										
										<ListItem 
											button
											component="a"
											href="#/profile/mysciencechallenges"
											>
											<ListItemIcon>
												<QuestionAnswerIcon style={{
													color: 'yellowgreen'
												}} />
											</ListItemIcon>
											<ListItemText 
												primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
														چالش های علمی من
														</Typography>} />
										</ListItem>
										
									</List>
								</Grid>

							</Grid>
						</Paper>
					</Grid>
					</Hidden>
				</Grid>

				<StickyFooter />

			</React.Fragment>
			// <div>
			//	 <Grid container spacing={3}>
						
			//		 <Grid item xs={12}>
			//			 <MainHeader />
			//		 </Grid>
					
			//		 <Grid item xs={12}>
			//			 <ProfileTabs />
			//		 </Grid>
					
			//		 <Grid container>
			//			 <MainFooter />
			//		 </Grid>
					
			//	 </Grid>
			// </div>
		);
	}
}

export default Profile;