import React from 'react';
import ProfileTabs from './ProfileTabs';
import Grid from '@material-ui/core/Grid';
import StickyFooter from "./StickyFooter";
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import VideocamIcon from '@material-ui/icons/Videocam';
import MessageIcon from '@material-ui/icons/Message';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import UserBasics from './UserBasics';
import UserSecurity from './UserSecurity';
import UserFinancialTab from './UserFinancialTab';
import UserSciencechallenges from './UserSciencechallenges';
import Dashboard from './Dashboard';
import Inbox from './Inbox';
import WatchedVideosList from './WatchedVideosList';
import FavoriteVideos from './FavoriteVideos';
import UserRequests from './UserRequests';
import {HashRouter, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { func } from 'prop-types';
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';

class Profile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user : {},
            stepsEnabled: true,
            initialStep: 0,
            steps: [
              {
                element: '.invitehelp',
                intro: 'دوستانی که دعوت کرده ای اینجا میبینی',
              },
              {
                element: '.fpointhelp',
                intro: 'تو این سایت میتونی امتیاز جمع کنیو منفعت هایی ازون کسب کنی',
              },
              {
                element: '.sendinvitehelp',
                intro: 'کافی است ایمیل دوستت رو اینجا وارد کنی اگه ثبت نام کرد تو اف پوینت میگیری',
              },
              {
                element: '.inboxhelp',
                intro: 'تمام پیام ها و اعلانات اینجا هستش',
              },
              {
                element: '.generalhelp',
                intro: 'اطلاعات عمومیت رو صحیح وارد کن واگه دوست داشتی یه عکس از خودت بذار',
              },
              
            ],
            hintsEnabled: true,
            hints: [
              {
                element: '.hello',
                hint: 'Hello hint',
                hintPosition: 'middle-right',
              }
            ]
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
    }

    render() {
        const { stepsEnabled, steps, initialStep, hintsEnabled, hints } = this.state;
        return (
            <React.Fragment>
                <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={this.onExit}
                    />
                    <Hints
                    enabled={hintsEnabled}
                    hints={hints}
                    />
                <Grid container spacing={2} justify="center">

                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Paper>
                            <Grid container spacing={2} justify="center" >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Paper>
                            <Grid container spacing={0}>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <img
                                        width="100px"
                                        src={this.state.user.thumbnail} 
                                        />
                                </Grid>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography
                                        style={{
                                            fontFamily:'IranSans'
                                        }}
                                        >
                                        {this.state.user.firstName + ' ' + this.state.user.lastName} 
                                    </Typography>
                                </Grid>
                                
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
                                                            دشبورد
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
                                                primary={<Typography className="generalhelp" type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
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
                                                primary={<Typography className="inboxhelp" type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'13px' }}>
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

                </Grid>

                <StickyFooter />

            </React.Fragment>
            // <div>
            //     <Grid container spacing={3}>
                        
            //         <Grid item xs={12}>
            //             <MainHeader />
            //         </Grid>
                    
            //         <Grid item xs={12}>
            //             <ProfileTabs />
            //         </Grid>
                    
            //         <Grid container>
            //             <MainFooter />
            //         </Grid>
                    
            //     </Grid>
            // </div>
        );
    }
}

export default Profile;