import React from 'react';
import UserProfileMenu from './UserProfileMenu';
import UserNotificationMenu from './UserNotificationMenu';
import UserSystemMessageMenu from './UserSystemMessageMenu';
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
                <React.Fragment>
                    <Typography 
                        color="textPrimary"
                        style={{
                            color:'white',
                            fontFamily:'IranSans_Light',
                            fontSize:'14px'
                        }}
                        >
                        {this.state.userinfo.firstName + ' ' +this.state.userinfo.lastName} خوش آمدید
                    </Typography>
                    
                    <UserSystemMessageMenu />
                    <UserNotificationMenu />
                    <UserProfileMenu />
                </React.Fragment>
            )
        else 
            return (
                <div>ثبت نام یا ورود</div>
            )
    }
}
export default UserToolInAppbar;