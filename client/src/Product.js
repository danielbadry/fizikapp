import React from 'react';
import MainHeader from "./MainHeader";
import Typography from '@material-ui/core/Typography';
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
  } from 'video-react';
import "../node_modules/video-react/dist/video-react.css"; // import css
import ContentUserInteraction from "./ContentUserInteraction";
import QuizComponent from './QuizComponent';
import Grid from '@material-ui/core/Grid';
import MainFooter from "./MainFooter";
import Paper from '@material-ui/core/Paper';

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            summary:{},
            productsquestions: [],
            productscomments: [],
            tags: [],
            id: '',
            thumbnail: '',
            productId: props.productid,
            startTime: 8
        }
    };

    
    componentDidMount(){
        fetch(`http://localhost:1337/products/${this.state.productId}`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(product => {
                this.setState({
                    summary: JSON.parse(JSON.stringify(product.summary)),
                    productsquestions: JSON.parse(JSON.stringify(product.productsquestions)),
                    productscomments: JSON.parse(JSON.stringify(product.productscomments)),
                    tags: JSON.parse(JSON.stringify(product.tags)),
                    thumbnail: product.thumbnail,
                    id: product.id,
                    startTime : 11
                });
            }, function() {
                console.info('after set states');
            });
    }
    getTime = () => {
        return 25;
    }
    render() {
        return (
            <div>
                <Grid container spacing={3}>
                        
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={6}>
                        <Paper>
                            <div>zaman:{this.state.startTime}</div>
                        <Player
                            poster="/assets/poster.png"
                            startTime = {this.state.startTime}
                            >
                        <source src="http://localhost:1337/files/productFiles/5d72312ac139752adc737766.mp4" />
                        {/* <source src="http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4" /> */}

                        <ControlBar>
                            <ReplayControl seconds={10} order={1.1} />
                            <ForwardControl seconds={10} order={1.2} />
                            <CurrentTimeDisplay order={4.1} />
                            <TimeDivider order={4.2} />
                            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                            <VolumeMenuButton disabled />
                        </ControlBar>
                        </Player>
                            {/* <Player
                                // playsInline
                                poster={this.state.thumbnail}
                                src={this.state.summary.videoAddress}
                                />
                                <source src={this.state.summary.videoAddress} />
                                <source src={this.state.summary.videoAddress} />
                                <ControlBar>
                                    <ReplayControl seconds={10} order={1.1} />
                                    <ForwardControl seconds={30} order={1.2} />
                                    <CurrentTimeDisplay order={4.1} />
                                    <TimeDivider order={4.2} />
                                    <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                                    <VolumeMenuButton disabled />
                                </ControlBar> */}
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={4}>
                        <Paper>
                            <QuizComponent />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <Typography 
                                variant="h6" 
                                gutterBottom
                                style={{ fontFamily: 'IranSans_Light' }}
                                >
                            {this.state.summary.title}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <Typography 
                                variant="h6"
                                gutterBottom
                                style={{ fontFamily: 'IranSans_Light' }}
                                >
                                {this.state.summary.jalaaliUserFriendlyCreatedDate}
                            </Typography>
                        </Paper>
                    </Grid>
                    
                    <Grid container>
                    
                    <Grid item xs={4}>
                        <Typography 
                            variant="span" 
                            gutterBottom
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            {this.state.summary.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ContentUserInteraction />
                    </Grid>
                    </Grid>
                    
                    <MainFooter />
                </Grid>
            </div>

        );
    }
}
export default Product;