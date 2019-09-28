import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: 'inline',
//   },
// }));

class DefinitionsList extends React.Component {
  
  constructor (props) {
    console.info('injast:', props);
    super(props);
    this.state = {
      definitionsList : props.list
    }

  }

  componentDidMount() {
    console.info('state:', this.state);
  }
  
  // const classes = useStyles();
  // if (props.list.length) {
  //   return (
  //     <div>nothing</div>
  //   );
  // } else
  render() {
    return (
      <List 
        // className={classes.root}
        >
        {this.state.list.map(
          (item, index) =>
          <ListItem 
            alignItems="flex-start"
            key={index}
            >
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    // className={classes.inline}
                    color="textPrimary"
                  >
                    Sandra Adams
                  </Typography>
                  {item.description}
                </React.Fragment>
              }
            />
          </ListItem>
        )}
      </List>
    )
  };
}

export default DefinitionsList;