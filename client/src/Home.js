import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PrimarySearchAppBar from "./AppBar";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class Requests extends React.Component {
    render() {
        
        return (
            <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
          
          <Button variant="contained">
            آموزش
          </Button>

          <Button variant="contained" color="primary">
            حل تمرین و تست
          </Button>

          <Button variant="contained" color="secondary">
            درخواست ها
          </Button>

          </Paper>
        </Grid>
        <Grid item xs={12}>
          {/* <Paper className={classes.paper}> */}
            <PrimarySearchAppBar />
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12}>
          <Paper>xs=6 slider</Paper>
        </Grid>
        
        <Grid item xs={4}>
          <Paper>دهم</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>یازدهم</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>دوازدهم</Paper>
        </Grid>
        
        <Grid container>
        <Grid item xs={4}>
          
            <Card>
              <CardActionArea>
                <CardMedia
                  
                  image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
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
          
          </Grid>
        <Grid item xs={4}>
          
            <Card>
              <CardActionArea>
                <CardMedia
                  
                  image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
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

          </Grid>
        <Grid item xs={4}>
          
            <Card>
              <CardActionArea>
                <CardMedia
                  image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
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
          
          </Grid>
        </Grid>
        
        <Grid item xs={12}>
          <Paper>xs=12 footer</Paper>
        </Grid>
      </Grid>
    </div>
        );
    }
}

export default Requests;