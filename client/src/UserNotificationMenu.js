import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

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
      >
        <MenuItem onClick={handleClose}>ناتیفیکیشن اول</MenuItem>
        <MenuItem onClick={handleClose}>ناتیفیکیشن دوم</MenuItem>
        <MenuItem onClick={handleClose}>ناتیفیکیشن سوم</MenuItem>
      </Menu>
    </React.Fragment>
  );
}