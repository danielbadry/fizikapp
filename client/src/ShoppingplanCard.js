import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 700,
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
  
  firstDivStyle : {
    width: '20%', 
    float: 'left'
  },
  
  secondDivStyle : {
    width: '80%', 
    float: 'right'
  },

  Dialog : {
    width: '700px' 
  }
}));

export default function RecipeReviewCard(props) {

  useEffect(() => {
    console.info('component happened here');
  }, []);

  const [redirectToResultPage, setRedirectToResultPage] = React.useState(false);

  console.info('props:', props);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const payWithFcoin = ()=> {
    console.info('payWithFcoin:', props);
    let user = JSON.parse(localStorage.getItem('userInfo'));
    let finalUserFcoin = user.fCoin - props.secondPrise;
    console.info('final user fcoin:', finalUserFcoin);
    let data = {
      user : user,
      fcoinPrice : props.secondPrise
    }
    fetch(`http://localhost:1337/shoppingplans/purchase`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(paymentResult => {
        setRedirectToResultPage(true);
      });
  }

  if (redirectToResultPage) {
    return(
      // <Redirect to={pathTo(params)} push={push} />
      <Redirect to={`shop-result?res=ok`} />
    )
    
} else
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
          onClick={handleClickOpen}
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
      
      <Dialog
        // fullWidth={fullWidth}
        className={classes.Dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle 
          id="max-width-dialog-title"
          >
            <Typography
              style={{ fontFamily: 'IranSans_Light' }}
              >
              خرید طرح
            </Typography>
            
        </DialogTitle>
        <DialogContent>
         
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                خرید از طریق f-Coin
              </Typography>
              <Typography 
                variant="h5" 
                component="h2"
                style={{
                  direction : 'rtl'
                }}
                >
                میزان f-Coin شما : 30
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                مبلغ این طرح 30 f-Coin
              </Typography>
              <Typography variant="body2" component="p">
                میزان f-Coin شما بعد از خرید این طرح 452
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small"
                variant="contained" 
                color="primary"
                style={{ fontFamily: 'IranSans_Light' }}
                disabled = {false}
                onClick = {payWithFcoin}
                >پرداخت با f-Coin</Button>
            </CardActions>
          </Card>
          
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                خرید از طریق درگاه پرداخت
              </Typography>
              <Typography variant="h5" component="h2">
                مبلغ خرید 2500 تومان
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                نام درگاه پرداخت : سامان
              </Typography>
              <Typography variant="body2" component="p">
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small"
                variant="contained" 
                color="primary"
                style={{ fontFamily: 'IranSans_Light' }}
                >پرداخت از طریق درگاه بانک سامان</Button>
            </CardActions>
          </Card>

        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose} 
            style={{ fontFamily: 'IranSans_Light' }}
            variant="contained" 
            color="secondary"
            >
            بستن
          </Button>
        </DialogActions>
      </Dialog>

    </Card>

  );
}
