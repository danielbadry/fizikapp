import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


//import clsx from 'clsx';
//import CardMedia from '@material-ui/core/CardMedia';
//import Collapse from '@material-ui/core/Collapse';
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
    ch : {
        fontFamily:'IranSans'
    }
}));

export default function RequestCars(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <React.Fragment>
           <Link
        component={RouterLink} 
        to={`request/${props.item.id}`}>
          <Card className={classes.card} 
          style={{
            cursor:'pointer'
          }}
          >
          <CardHeader
              classes={{ root: 'ch'}}
              avatar={
              <Avatar 
                  aria-label="recipe" 
                  className={classes.avatar}
                  src={props.item.userInfo.thumbnail}
                  title="کاربرد درخواست دهنده"
                  >
                  R
              </Avatar>
              }
              
              title={<Typography style={{
                fontFamily: 'IranSans',
                fontSize: '14px'
              }}>
                {props.item.userInfo[Object.keys(props.item.userInfo)[4]] + props.item.userInfo[Object.keys(props.item.userInfo)[5]]}
              </Typography>}
              subheader={<Typography style={{
                fontFamily: 'IranSans',
                fontSize: '12px',
                color: 'rgba(0, 0, 0, 0.54)'
              }}>
                {props.item.jalaaliUserFriendlyCreatedDate}
              </Typography>}
          />
          
          <CardContent>
              
              <Typography 
                variant="body2" 
                color="textSecondary" 
                component="p"
                style={{
                  fontFamily:'IranSans',
                  color: 'black',
                  fontWeight: 'bold',
                  direction: 'rtl'
                }}
                >
                {props.item.title}
              </Typography>
              <hr />
              <Typography 
                variant="body2" 
                color="textSecondary" 
                component="p"
                style={{
                  fontFamily: 'IranSans',
                  textAlign: 'justify',
                  direction: 'rtl',
                  color: 'rgb(93, 93, 93)',
                  marginTop: '8%',
                  lineHeight: '1.7rem'
                }}
                >
                {props.item.message}
              </Typography>

          </CardContent>

          <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
              <FavoriteIcon />
              </IconButton>
          </CardActions>
          
          </Card>
          </Link>
    </React.Fragment>
  );
}
