import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Visibility from '@material-ui/icons/Visibility';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

class WatchedvideosCard extends React.Component {

constructor(props) {
  super (props);
}

componentDidMount() {
  console.info('pr:', this.props);
}
render() {
  return (
    <React.Fragment>
      <Link
        component={RouterLink} 
        to={`${this.props.item.model}/${this.props.item.id}`}>
      <Paper
        style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${this.props.item.thumbnail})`,
          height:'142px',
          width: '253px',
          position: 'relative',
          borderRadius:0
        }}
      >
        <Typography style={{
          fontFamily: 'IranSans',
          color: 'white',
          direction: 'rtl',
          position: 'relative',
          top: '67%',
          right: '2%'
        }}>
          {this.props.item.name}
        </Typography>
        
        <Typography style={{
          fontFamily: 'IranSans_UltraLight',
          color: 'white',
          direction: 'rtl',
          position: 'relative',
          top: '67%',
          right: '2%',
          fontSize: '14px'
        }}>
        {this.props.item.title}
        </Typography>
        
        <div style={{
          bottom: '0',
          position: 'absolute',
          backgroundColor:'#0000004d',
          width: '100%',
          // borderRadius: '7px'
        }}>
          
          <ThumbUp 
            fontSize="small" 
            style={{
                color : 'white',
                marginLeft: '8px',
                marginTop: '2px',
                marginBottom: '0px'
            }}
          />

            <span style={{
                color: 'white',
                fontFamily: 'verdana',
                fontSize: '14px',
                marginLeft: '2px',
                paddingTop: '5px',
                position: 'absolute'
            }}>میزان دیدن اون ویدیو : {this.props.item.likes}</span>

            <span style={{
                color: 'white',
                fontFamily: 'verdana',
                fontSize: '14px',
                marginLeft: '2px',
                paddingTop: '5px',
                position: 'absolute'
            }}>{this.props.item.likes}</span>  
        </div>
        <div
          style={{
            position: 'absolute',
            backgroundColor:'#0000004d',
            width: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor:'red',
              width: `${this.props.item.percent}%`,
            }}
          >
          percent
        </div>
        </div>
      </Paper>
      </Link>
    </React.Fragment>
    
  );
}
  
}

export default WatchedvideosCard;