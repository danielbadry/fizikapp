import React from 'react';
import MainHeader from "./MainHeader";
import SocialShare from "./SocialShare";
import RelatedProducts from "./RelatedProducts";
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
import StickyFooter from "./StickyFooter";
import ArticlesToolBox from "./ArticlesToolBox";
import Paper from '@material-ui/core/Paper';

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            summary: {},
            token: null,
            tags: [],
            id: '',
            isRender : false,
            thumbnail: '',
            userCanSeeQuiz: true,
            userCanSeeVideo: true,
            productId: props.productid,
            startTime: 8,
            userInteractionConfig : [
                {
                    type:'qa',
                    label:'پرسش و پاسخ',
                    model:'products'
                },
                {
                    type:'comment',
                    label:'نظرات',
                    model:'products'
                }
            ]
        }
    };

    catchMeHere = () => {
        console.info('eival', this);
        this.fetchProduct();
    }

    fetchProduct = (token) => {
        fetch(process.env.REACT_APP_API_URL+`products/${this.state.productId}`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(product => {
                this.setState(function(state, props) {
                    return {
                        summary: JSON.parse(JSON.stringify(product.summary)),
                        tags: JSON.parse(JSON.stringify(product.tags)),
                        thumbnail: product.thumbnail,
                        id: product.id,
                        startTime : 30,
                        isRender: true
                    };
                  }, () => {
                    this.setState(function(state, props) {
                        return {
                            isRender: true
                        }});
                  });
            });
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        this.setState(function(state, props) {
            return {
                token: token
            }});
        this.fetchProduct(token);  

    }
    
    render() {
        if (!this.state.isRender) {
            return(
                <div>loading...</div>
            )
            
        } else
        return (
            <div>
                <Grid container spacing={3}>
                {/* <SocialShare /> */}
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>

                    <Grid item xs={4}>
                        <Paper
                            style= {{
                                direction: 'rtl'
                            }}
                            >
                            <Typography
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                                {this.state.summary.title}
                            </Typography>
                            <Typography 
                                gutterBottom
                                style={{ fontFamily: 'IranSans_Light' }}
                                >
                                {this.state.summary.jalaaliUserFriendlyCreatedDate}
                            </Typography>
                            
                            {(localStorage.getItem('token') && this.state.userCanSeeQuiz) ? 
                                <QuizComponent
                                endFunc={this.catchMeHere}
                                model='products'
                                modelid={this.props.productid}
                                title={this.state.summary.name}
                            />
                            :null}

                                {(localStorage.getItem('token') && !this.state.userCanSeeQuiz) ? 
                                <React.Fragment>
                                    <div>شارژ نداری</div>
                                    <QuizComponent
                                        endFunc={this.catchMeHere}
                                        model='products'
                                        modelid={this.props.productid}
                                        title={this.state.summary.name}
                                        userCanSeeQuiz = {false}
                                    />
                                </React.Fragment>
                                :null}

                            {(!localStorage.getItem('token')) ? 
                                <div>لاگین کنید</div>
                            :null}
                        </Paper>
                        
                    </Grid>

                    <Grid item xs={8}>
                        <Paper>
                            
                        {(localStorage.getItem('token') && this.state.userCanSeeVideo) ? 
                                <Player
                                poster={this.state.thumbnail}
                                startTime = {this.state.startTime}
                                style={{
                                    height: '200px'
                                }}
                                >
                                    
                            <source 
                                src={this.state.summary.videoAddress}
                                />

                            <ControlBar>
                                <ReplayControl seconds={10} order={1.1} />
                                <ForwardControl seconds={10} order={1.2} />
                                <CurrentTimeDisplay order={4.1} />
                                <TimeDivider order={4.2} />
                                <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                                <VolumeMenuButton />
                            </ControlBar>
                            </Player>
                            :null}

                                {(localStorage.getItem('token') && !this.state.userCanSeeVideo) ? 
                                <React.Fragment>
                                    <div>شارژ نداری</div>
                                </React.Fragment>
                                :null}

                            {(!localStorage.getItem('token')) ? 
                                <div>لاگین کنید</div>
                            :null}

                        </Paper>
                    </Grid>
                    
                    <Grid item xs={8}>
                    <ArticlesToolBox
                        model='products'
                        modelid={this.props.productid}
                        token={this.state.token}
                        />
                    </Grid>
                    
                    <Grid container>
                        <Grid item xs={4}>
                            <Paper
                                style={{
                                    margin: '6%'
                                }}
                                >
                                <RelatedProducts />
                            </Paper>
                        </Grid>
                       
                    <Grid item xs={7}>
                        <Paper
                            style = {{
                                fontFamily: 'IranSans_Light',
                                direction: 'rtl',
                                textAlign: 'justify',
                                padding: '3%',
                                margin: '1%'
                            }}
                            >
                            <Typography
                                style = {{
                                    fontFamily: 'IranSans_Light',
                                    fontWeight: 'bold'
                                }}
                                >
                                توضیحات :
                            </Typography>
                            <Typography 
                                variant="span" 
                                gutterBottom
                                style={{ 
                                    fontFamily: 'IranSans_Light',
                                    fontSize: '14px'
                                }}
                                >
                                {this.state.summary.description}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Paper
                            style={{
                                margin: '6%'
                            }}
                            >
                            
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <ContentUserInteraction
                        config={this.state.userInteractionConfig}
                        modelid={this.state.productId}
                        />
                    </Grid>
                    </Grid>
                    
                    {/* <StickyFooter /> */}
                </Grid>
            </div>

        );
    }
}
export default Product;