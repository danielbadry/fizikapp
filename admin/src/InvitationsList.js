import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 450,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function InvitationList() {
  const classes = useStyles();
  const CollisionLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/getting-started/installation/" {...props} />
  ));
  return (
      
    <List className={classes.root} subheader={<li />}>
      {[{name:'نهم', numerical:0}, {name:'دهم', numerical:1}, {name:'یازدهم', numerical:2}, 
        {name:'دوازدهم', numerical:3}].map((sectionId, index) => (
        <li key={index} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`کلاس ${sectionId.name}`}</ListSubheader>
            {
                [
                    {fullName:'milad khanmohammadi', link : 'users/5d3c644a6d696a0dc4e6a448/show'},
                    {fullName:'sara rezvani', link : 'users/5d3c644a6d696a0dc4e6a448/show'},
                    {fullName:'jamal akbari khanmohammadi', link : 'users/5d3c644a6d696a0dc4e6a448/show'},
                 
                ]
            .map(item => (
                <ListItem key={`item-${sectionId}-${item}`}>
                    <ListItemAvatar>
                        <Avatar
                            alt={`Avatar n°${1}`}
                            src={'http://localhost:1337/uploads/5d3c644a6d696a0dc4e6a448.jpg'}
                            />
                    </ListItemAvatar>
                    <Link component={RouterLink} to={'/'+item.link}>
                        <ListItemText primary={item.fullName} />
                    </Link>
                    
                </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}
