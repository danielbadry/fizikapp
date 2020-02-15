import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Divider from '@material-ui/core/Divider';

export default function UserNotificationMenu() {
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
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
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
            <div>لطفا حساب کاربری خود را شارژ نمایید</div>
            </MenuItem>
        <Divider />
        <MenuItem 
          style={{
            fontFamily:'IranSans_Light',
            fontSize:'13px'
          }}
          onClick={handleClose}>ویدیویی تحت عنوان انرژی منتشر گردید</MenuItem>
        <Divider />
        <MenuItem 
          style={{
            fontFamily:'IranSans_Light',
            fontSize:'13px'
          }}
          onClick={handleClose}>آیا می دانستید سرعت اتمی چیست</MenuItem>
        <Divider />
        <MenuItem 
          style={{
            fontFamily:'IranSans_Light',
            fontSize:'13px'
          }}
          onClick={handleClose}>یک شاتل فضایی چگونه کار می کند</MenuItem>
        <Divider />
        <MenuItem 
          style={{
            fontFamily:'IranSans_Light',
            fontSize:'13px'
          }}
          onClick={handleClose}>در مورد سوخت جت چه چیزی می دانید</MenuItem>
      </Menu>
    </React.Fragment>
  );
}