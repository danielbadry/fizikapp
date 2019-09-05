import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    fontFamily: 'IranSans'
  },
  inline: {
    display: 'inline',
    fontFamily:'IranSans'
  },
  listItemText:{
    fontFamily:'IranSans',//Insert your required size
  },
  listItemDesc:{
    fontFamily:'IranSans',//Insert your required size
  }
}));

export default function DefinitionsSearchList(props) {
  const classes = useStyles();

  return (
    <List 
      className={classes.root}
      >
      {props.list.map(
        (item, index) => <ListItem 
                  key={index}
                  alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              classes={
                  {
                    primary:classes.listItemText
                  }
                }
              primary={item.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    >
                    {item.title}
                  </Typography>
                  <div
                    className={classes.listItemDesc}
                    >
                    {item.description}
                  </div>
                </React.Fragment>
              }
            />
          </ListItem>
      )}
    </List>
  );
}
