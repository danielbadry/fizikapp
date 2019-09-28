import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

class ImgMediaCard extends React.Component {

constructor(props) {
  super (props);
  console.info('props:', props);
}

render() {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={this.props.item.thumbnail}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="h2"
            style={{
              fontFamily: 'IranSans_Light',
              direction: 'rtl'
            }}
            >
            {this.props.item.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            component="p"
            style={{
              fontFamily: 'IranSans_Light',
              direction: 'rtl',
              textAlign: 'justify'
            }}
            >
            {this.props.item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
  
}

export default ImgMediaCard;