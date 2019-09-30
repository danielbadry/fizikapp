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
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ArticlesToolBox from "./ArticlesToolBox";

class Sciencechallenge extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            summary:{},
            userAnswerMessage : null,
            isUserAnswered : false,
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

    sendRequest = () => {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        let data = {
            userAnswerMessage: this.state.userAnswerMessage,
            userId: user.id,
            sciencechallengeId: this.props.sciencechallengeid,
        }
        console.info('aa:', this.state);
        fetch(`http://localhost:1337/sciencechallengeresponse`, {
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
            .then(result => {
                console.info('result:', result);
                this.setState((state, props) => {
                    return ({isUserAnswered: result});
                });
            });
    }

    handleChange = () => event => {
        console.info('hello');
        // event.persist();
        this.setState({userAnswerMessage: event.target.value})
    };

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('userInfo'));
        fetch(`http://localhost:1337/sciencechallenge/${this.props.sciencechallengeid}?userId=${user.id}`, {
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
            .then(result => {
                console.info('result:', result);
                this.setState(function(state, props) {
                    return {
                        summary: JSON.parse(JSON.stringify(result.summary)),
                        isUserAnswered: (typeof(result.isUserAnswered) === 'object') ? result.isUserAnswered : false,
                        thumbnail: result.thumbnail,
                        id: result.id,
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

    AnswerBox (props) {
        if (typeof(this.state.isUserAnswered) === 'boolean') {
            return (
                <React.Fragment>
                    
                    <TextField
                        id="standard-name"
                        label="پاسخ"
                        onChange={this.handleChange()}
                        margin="normal"
                        InputLabelProps={{
                            style: {
                                fontFamily: "IranSans"
                            }
                        }}
                        InputProps={{
                            style: {
                                fontFamily: "IranSans"
                            }
                        }}
                    />

                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={this.sendRequest}
                        style={{
                            fontFamily: "IranSans"
                        }}
                        >
                        ارسال پاسخ به چالش علمی
                    </Button>

                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                   <div>
                        شما قبلا پاسخ داده اید
                    </div>
                    <div>
                        {this.state.isUserAnswered.userAnswerMessage}
                    </div>
                </React.Fragment>
            );
        }
        
    }
      
    AnsweredBox(props) {
        return (
          <React.Fragment>answeredBox</React.Fragment>
        );
    }

    render () {
        let user = JSON.parse(localStorage.getItem('userInfo'));
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
                                قبلا پاسخ داده اید 
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

                    <Grid item xs={8}>
                    <Paper>
                        <ArticlesToolBox
                            model='sciencechallenge'
                            modelid={this.props.definitionid}
                            userid={user.id}
                            />
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
                    
                    <Grid item xs={12}>
                        <Paper
                            style={{
                                margin: '6%'
                            }}
                            >
                            
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper>
                            {this.AnswerBox()}
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