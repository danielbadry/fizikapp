import React, { useState, useEffect } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';

export default function UserSystemMessageMenu() {
  let [messages, setMessages] = React.useState([]);

  useEffect(() => {
    let token = window.localStorage.getItem('token');
    fetch(process.env.REACT_APP_API_URL+`messages/usernotread`, {
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
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(result => {
        setMessages(result.data);
        console.info(result.data);
      });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const goToNotify = (item) => {
    console.info('item:', item);
    setAnchorEl(null);
  }

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
          <Badge 
            badgeContent={messages.length} 
            color="secondary">
            <MailIcon />
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
          <React.Fragment>
            {messages.map(
              (item, index) => 
                <MenuItem 
                style={{
                  fontFamily:'IranSans_Light',
                  fontSize:'13px'
                }}
                onClick={()=>goToNotify(item)}>
                  <div>{item.message}</div>
              </MenuItem>
            )}
            <Divider />
          </React.Fragment>
      </Menu>
    </React.Fragment>
  );
}