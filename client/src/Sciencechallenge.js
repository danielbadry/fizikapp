import React from 'react';
import Paper from '@material-ui/core/Paper';
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
import MainHeader from "./MainHeader";
import SocialShare from "./SocialShare";
import Grid from '@material-ui/core/Grid';
import StickyFooter from "./StickyFooter";
import ProductAppBar from "./ProductAppBar";

class Sciencechallenge extends React.Component{

    constructor(props) {
        super(props);
        console.info('propsesh:', props);
        this.state = {
            summary:{},
            scienceschallengeQuestions: [],
            scienceschallengeComments: [],
            tags: [],
            id: '',
            isRender : false,
            thumbnail: '',
            scienceschallengeId: props.sciencechallengeid,
            startTime: 8,
            userInteractionConfig : [
                {
                    type:'qa',
                    label:' از ماپرسش و پاسخ',
                    model:'definitions'
                },
                {
                    type:'comment',
                    label:'نظرات',
                    model:'definitions'
                }
            ]
        }
    }

    componentDidMount(){
        fetch(`http://localhost:1337/sciencechallenge/${this.props.sciencechallengeid}`, {
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
                this.setState(function(state, props) {
                    return {
                        summary: JSON.parse(JSON.stringify(product.summary)),
                        scienceschallengeQuestions: JSON.parse(JSON.stringify(product.scienceschallengeQuestions)),
                        scienceschallengeComments: JSON.parse(JSON.stringify(product.scienceschallengeComments)),
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

    render () {
        if (!this.state.isRender) {
            return(
                <div>loading...</div>
            )
            
        } else
        return (
            
            <div>
                <Grid container spacing={3}>
                <SocialShare />
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
                            <Typography
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                                در کوییز شرکت کرده اید قبلا 
                            </Typography>
                            <Typography
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                                3 امتیاز
                            </Typography>
                            <Typography
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                                3 لایک
                            </Typography>
                            <Typography
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                                5 دیسلایک
                            </Typography>
                            
                        </Paper>
                        
                    </Grid>

                    <Grid item xs={8}>
                        <Paper>
                            <Player
                                poster="/assets/poster.png"
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
                        </Paper>
                    </Grid>

                    <Grid container>
                        <Grid item xs={4}>
                            <Paper
                                style={{
                                    margin: '6%'
                                }}
                                >
                                
                            </Paper>
                        </Grid>
                        <Grid item xs={7}>
                        <Paper>
                            <ProductAppBar />
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
                            />
                    </Grid>
                    </Grid>
                    
                    <StickyFooter />
                </Grid>
            </div>

        );
    }

}
export default Sciencechallenge;