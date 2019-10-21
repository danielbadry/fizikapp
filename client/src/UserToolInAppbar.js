import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';

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
                    <Typography 
                        variant="h6" 
                        noWrap>
                        {this.state.userinfo.firstName + ' ' + this.state.userinfo.lastName } خوش آمدید
                    </Typography>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                    </IconButton>
                    
                    <IconButton
                    edge="end"
                    aria-label="account of current user"
                    // aria-controls={menuId}
                    aria-haspopup="true"
                    // onClick={handleProfileMenuOpen}
                    color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>

                </div>
            )
        else 
            return (
                <div>sign up</div>
            )
    }
}
export default UserToolInAppbar;