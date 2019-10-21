import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import UserProfileMenu from './UserProfileMenu';
import UserNotificationMenu from './UserNotificationMenu';
import UserSystemMessageMenu from './UserSystemMessageMenu';

class UserToolInAppbar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userinfo : null
        }
    }

    componentDidMount(){
        let token = localStorage.getItem("token");
        if (token) {
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
                    this.setState(function(state, props) {
                        return {
                            userinfo: userinfo
                        }});
                });

        }
        
    }

    render() {
        if (this.state.userinfo)
            return(
                <div>
                    {/* <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                    </IconButton> */}
                    <UserSystemMessageMenu />
                    <UserNotificationMenu />
                    <UserProfileMenu />
                </div>
            )
        else 
            return (
                <div>sign up</div>
            )
    }
}
export default UserToolInAppbar;