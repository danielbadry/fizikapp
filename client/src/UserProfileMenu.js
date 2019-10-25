import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';

export default function UserProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <AccountCircle />
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
          onClick={handleClose}>خروج</MenuItem>
        
      </Menu>
    </React.Fragment>
  );
}