import React from 'react';
import ProfileTabs from './ProfileTabs';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import ChartExample1 from "./ChartExample1";
import StickyFooter from "./StickyFooter";
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

class Profile extends React.Component {
    render() {
        return (
            <React.Fragment>

                <MainHeader />

                <Grid container spacing={2} justify="center">

                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Paper>
                            <Grid container spacing={2} justify="center" >

                               <Grid item xs={3} sm={3} md={3} lg={3} xl={3} >
                                    <Paper>
                                      B1 
                                    </Paper> 
                               </Grid>

                               <Grid item xs={3} sm={3} md={3} lg={3} xl={3} >
                                    <Paper>
                                      B2 
                                    </Paper>
                               </Grid>

                               <Grid item xs={3} sm={3} md={3} lg={3} xl={3} >
                                    <Paper>
                                      B3 
                                    </Paper>
                               </Grid>
                               
                               <Grid item xs={3} sm={3} md={3} lg={3} xl={3} >
                                    <ChartExample1 />
                               </Grid>

                            </Grid>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Paper>
                            <Grid container spacing={0}>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <img src="https://www.goldenglobes.com/sites/default/files/styles/portrait_medium/public/gallery_images/17-tomcruiseag.jpg?itok=qNj0cQGV&c=c9a73b7bdf609d72214d226ab9ea015e" />
                                </Grid>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography
                                        style={{
                                            fontFamily:'IranSans'
                                        }}
                                        >
                                        ایمان ارقامی 
                                    </Typography>
                                    <Typography 
                                        style={{
                                            fontFamily:'IranSans'
                                        }}>
                                        مدیر سیستم
                                    </Typography>
                                </Grid>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <hr />
                                </Grid>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <List component="nav" aria-label="main mailbox folders" style={{
                                        direction: 'rtl'
                                    }}>
                                        <ListItem button>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'14px' }}>عمومی</Typography>} />
                                        </ListItem>
                                        <ListItem button>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'14px' }}>مالی</Typography>} />
                                        </ListItem>
                                        <ListItem button>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<Typography type="body2" style={{ textAlign: 'right', fontFamily:'IranSans', fontSize:'14px' }}>درخواست های من</Typography>} />
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