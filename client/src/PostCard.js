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

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
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
            سرعت چیست
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
          تندی (به انگلیسی: Velocity) در علم سینماتیک به مفهوم بزرگی سرعت برداری یک جسم گفته می‌شود. سرعت یک کمیت برداری است و واحد آن در SI متر بر ثانیه می‌باشد. سرعت متوسط به تغییرات جابجایی متحرک نسبت به زمان طی شده را سرعت متوسط می‌گویند
          . سرعت لحظه‌ای نیز به صورت حد سرعت در صورتی که بازه زمانی به صفر میل کند، یا به عبارت دیگر سرعتی که متحرک در هر لحظه دارد، تعریف می‌گردد.
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
