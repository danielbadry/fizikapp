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
import Grid from '@material-ui/core/Grid';

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

export default function RequestCars() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <React.Fragment>
          <div 
                style={{
                    display: 'block',
                    fontFamily: 'IranSans_Bold',
                    float: 'right',
                    width: '100%',
                    direction: 'rtl',
                    marginRight: '4%',
                    fontSize: '23px',
                    marginBottom: '2%',
                    marginTop: '2%'
                }}
                >
                درخواست ها
            </div>
          <Grid container spacing={1}>
            {[1,2,3].map(
                (item, index) => 
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={2} key={index}>
                    <Card className={classes.card}>
                    <CardHeader
                        classes={{ root: 'ch'}}
                        avatar={
                        <Avatar 
                            aria-label="recipe" 
                            className={classes.avatar}
                            src="https://material-ui.com/static/images/avatar/1.jpg"
                            >
                            R
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        
                        title="میلاد خان محمدی"
                        subheader="September 14, 2016"
                    />
                    {/* <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                    /> */}
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                        <ShareIcon />
                        </IconButton>
                    </CardActions>
                    
                    </Card>
                </Grid>
            )}
        </Grid>
    </React.Fragment>
  );
}
