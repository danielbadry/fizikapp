import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    fontFamily: 'IranSans_Light'
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
    fontFamily: 'IranSans_Light'
  },
}));

export default function RecipeReviewCard(props) {
  console.info('props:', props);
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.type}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
        <Typography 
          style={{
            fontFamily: 'IranSans_Light'
          }}
          >{`${props.type} طرح`}
        </Typography>
        }
        subheader={<Typography 
          style={{
            fontFamily: 'IranSans_Light'
          }}
          >{`${props.jalaaliUserFriendlyUpdatedDate}`}
        </Typography>}
      />
      <CardMedia
        className={classes.media}
        image="https://material-ui.com/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        
        <Typography 
          variant="body2" 
          color="textSecondary" 
          component="p"
          style={{
            fontFamily: 'IranSans_Light'
          }}
          >
          قیمت اصلی : {props.firstPrise}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="textSecondary" 
          component="p"
          style={{
            fontFamily: 'IranSans_Light'
          }}
          >
          بعداز تخفیف : {props.secondPrise}
        </Typography>

      </CardContent>
      <CardActions disableSpacing>
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          style={{ fontFamily: 'IranSans_Light' }}
          >
          خرید اشتراک 
        </Button>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
      
    </Card>
  );
}
