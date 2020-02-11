import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart_activity from "./Chart_activity";
import { Typography } from '@material-ui/core';

class Dashboard extends React.Component {
    
    constructor(props) {
        super (props);
        this.state = {
            userinfo : {},
            myPlan : []
        }
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
            this.setState({
                userinfo: userInfo.data,
            });
        });

        // 
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
        return(
            
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <Paper>
                <Typography
                    style={{
                        fontFamily:'IranSans'
                    }}
                    >
                    تعداد دعوت شده ها 
                </Typography>
                </Paper> 
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <Paper>
                <Typography
                    style={{
                        fontFamily:'IranSans'
                    }}
                    >
                    تعداد اف پوینت شما {this.state.userinfo.fCoin} است 
                </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <Paper>
                    <div
                    style={{
                        fontFamily:'IranSans'
                    }}
                     >اشتراک کنونی به صورت</div>
                    <Typography
                        style={{
                            fontFamily:'IranSans'
                        }}
                        >
                    {this.state.myPlan.map(
                        (item, index) => 
                        <div>{item.shoppingPlanName}</div>
                    )}
                    </Typography>
                </Paper>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <Chart_activity />
            </Grid>
        </React.Fragment>
        );
    }
}

export default Dashboard;