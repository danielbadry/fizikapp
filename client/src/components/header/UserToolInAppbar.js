import React from 'react';
import UserProfileMenu from './UserProfileMenu';
import UserSystemMessageMenu from './UserSystemMessageMenu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//import UserNotificationMenu from './UserNotificationMenu';


class UserToolInAppbar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userinfo : null
        }
    }

    componentDidMount(){
        let token = localStorage.getItem("token");
        fetch(process.env.REACT_APP_API_URL+`users/userinfo`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(userinfo => {
                if (!userinfo.auth) {
                    window.localStorage.removeItem('token');
                } else {
                    this.setState(function(state, props) {
                        return {
                            userinfo: userinfo.data
                        }});
                }
            });
    }

    render() {
        if (this.state.userinfo)
            return(
                <React.Fragment>
                    <Typography 
                        color="textPrimary"
                        style={{
                            color:'inherit',
                            fontFamily:'IranSans_Light',
                            fontSize:'12px',
                            textAlign:'rigth'
                        }}
                        >
                        {this.state.userinfo.firstName + ' ' +this.state.userinfo.lastName}   
                    </Typography>
                    
                    <UserSystemMessageMenu />
                    {/* <UserNotificationMenu /> */}
                    <UserProfileMenu 
                        userinfo = {this.state.userinfo}
                    />
                </React.Fragment>
            )
        else 
            return (
                <React.Fragment>
                    <Button 
                        variant="outlined"
                        href="#/signin"
                        style={{
                            fontFamily: 'IranSans'
                        }}
                        >
                        ورود
                    </Button>
                </React.Fragment>
            )
    }
}
export default UserToolInAppbar;