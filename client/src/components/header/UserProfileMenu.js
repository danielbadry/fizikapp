import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle } from '@material-ui/icons';
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

  const logOut = () => {
    window.localStorage.removeItem('token');
    setAnchorEl(null);
    // window.location.reload();
    window.location.replace("/");
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