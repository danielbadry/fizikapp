import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

export default function UserProfileMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateForm = () => {
    let data = {
        isOnline : false
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
      setTimeout(function(){ console.info('user logged out'); }, 2000);
      window.localStorage.removeItem('token');
      window.location.replace("/");
    });
}

  const logOut = () => {
    setAnchorEl(null);
    updateForm();
  }

  return (
    <React.Fragment>
      <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={'simple-menu'}
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              <img 
                src={props.userinfo.thumbnail}
                style={{
                  borderRadius: '50%',
                  width: '34px'
                }}
                />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{
                direction:'rtl'
              }}
            >
              <MenuItem 
              component={Link}
              href="#/profile"
                style={{
                  fontFamily:'IranSans_Light',
                  fontSize:'13px'
                }}
                onClick={handleClose}>
                  <div>حساب کاربری</div>
                  </MenuItem>
              <Divider />
              <MenuItem 
                style={{
                  fontFamily:'IranSans_Light',
                  fontSize:'13px'
                }}
                onClick={handleClose}>خرید طرح</MenuItem>
              <Divider />
              <MenuItem 
                style={{
                  fontFamily:'IranSans_Light',
                  fontSize:'13px'
                }}
                onClick={logOut} value="kh">خروج</MenuItem>
            </Menu>
    </React.Fragment>
  );
}