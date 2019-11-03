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

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

class PostCard extends React.Component {

constructor(props) {
  super (props);
  console.info('props:', props);
}

render() {
  return (
    <React.Fragment>
      <Paper
        style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${this.props.item.thumbnail})`,
          height:'200px',
          width: '100%',
          cursor: 'pointer',
          position: 'relative'
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
          borderRadius: '7px'
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
            }}>4.4K</span>  
        </div>

      </Paper>
    </React.Fragment>
    // <Card>
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       alt="Contemplative Reptile"
    //       height="140"
    //       image={this.props.item.thumbnail}
    //       title={this.props.item.name}
    //     />
    //     <CardContent>
          
    //       <Typography 
    //         gutterBottom 
    //         variant="h5" 
    //         component="h2"
    //         style={{
    //           fontFamily: 'IranSans_Light',
    //           direction: 'rtl',
    //           fontSize: '14px',
    //           fontWeight:'bold'
    //         }}
    //         >
    //         {this.props.item.name}
    //       </Typography>
          
    //       <Typography
    //         variant="body2" 
    //         color="textSecondary" 
    //         component="p"
    //         style={{
    //           fontFamily: 'IranSans_Light',
    //           // minHeight:'140px',
    //           direction: 'rtl',
    //           textAlign: 'justify',
    //           overflow: 'hidden',
    //         }}
    //         >
    //         {this.props.item.description}
    //       </Typography>

    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>

    //     <Button 
    //       variant="contained" 
    //       href="#outlined-buttons"
    //       size="small" 
    //       color="primary"
    //       style={{
    //         fontFamily: 'IranSans_Light',
    //         direction: 'rtl',
    //         // textAlign: 'justify'
    //       }}
    //       >
    //       ورود به چالش
    //     </Button>

    //   </CardActions>
    // </Card>
  );
}
  
}

export default PostCard;