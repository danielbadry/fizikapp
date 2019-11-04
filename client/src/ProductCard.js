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

class ProductCard extends React.Component {

constructor(props) {
  super (props);
}

render() {
  return (
    <React.Fragment>
      <div>product card</div>
    </React.Fragment>
  );
}
  
}

export default ProductCard;