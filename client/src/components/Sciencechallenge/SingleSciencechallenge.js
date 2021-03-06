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
import "../other/video-react.css"; // import css
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ContentUserInteraction from "../comments/ContentUserInteraction";
import ArticlesToolBox from "../ArticlesToolBox";
//import MainHeader from "./MainHeader";
//import SocialShare from "./SocialShare";
//import StickyFooter from "./StickyFooter";
class SingleSciencechallenge extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            summary:{},
            userAnswerMessage : null,
            isUserAnswered : null,
            tags: [],
            id: '',
            token: null,
            userHasCharge : true,
            isRender : false,
            userCanSeeVideo : true,
            thumbnail: '',
            scienceschallengeId: props.sciencechallengeid,
            startTime: 8,
            userInteractionConfig : [
                {
                    type:'qa',
                    label:'پرسش و پاسخ',
                    model:'sciencechallenge'
                },
                {
                    type:'comment',
                    label:'نظرات',
                    model:'sciencechallenge'
                }
            ]
        }
    }

    sendMyAnswer = () => {
        let data = {
            userAnswerMessage: this.state.userAnswerMessage,
            sciencechallengeId: this.props.match.path.split('/')[2],
        }
        fetch(process.env.REACT_APP_API_URL+`sciencechallengeresponse`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this.state.token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(result => {
                const token = localStorage.getItem('token');
                fetch(process.env.REACT_APP_API_URL + `sciencechallenge/${this.props.match.path.split('/')[2]}`, {
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
                    .then(result => {
                        this.setState(function(state, props) {
                            return {
                                summary: JSON.parse(JSON.stringify(result.data.summary)),
                                isUserAnswered: result.data.isUserAnswered,
                                thumbnail: result.thumbnail,
                                id: result.id,
                                startTime : 30,
                                isRender: true
                            };
                          });
                    });
            });
    }

    handleChange = () => event => {
        this.setState({userAnswerMessage: event.target.value});
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.setState({token: token});
        fetch(process.env.REACT_APP_API_URL + `sciencechallenge/${this.props.match.path.split('/')[2]}`, {
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
            .then(result => {
                this.setState(function(state, props) {
                    return {
                        summary: JSON.parse(JSON.stringify(result.data.summary)),
                        isUserAnswered: result.data.isUserAnswered,
                        thumbnail: result.thumbnail,
                        id: result.id,
                        isRender: true
                    };
                  }, () => {
                    this.setState(function(state, props) {
                        return {
                            isRender: true
                        }});
                        if (this.player)
                            this.player.subscribeToStateChange(this.handleStateChange.bind(this));
                  });
            });
    }

    componentWillUnmount() {
        if (this.player) {
            const { player } = this.player.getState();
            const token = localStorage.getItem('token');
            let data = {
                modelId: this.props.match.path.split('/')[2],
                startTime: player.currentTime,
                model:'sciencechallenge'
            }
            fetch(process.env.REACT_APP_API_URL+`watchedvideos/setuserwatchstatus`, {
                method: 'POST', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(result => {
                    
                });
        }
        
    }

    handleStateChange(state, prevState) {
        // copy player state to this component's state
        this.setState({
          player: state,
          currentTime: state.currentTime
        });
        window.localStorage.setItem('model', 'scienecechallenges');
        window.localStorage.setItem('modelId', this.props.match.path.split('/')[2]);
        window.localStorage.setItem('currentTime', this.state.currentTime);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.summary.id != this.props.match.path.split('/')[2]) {
        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`sciencechallenge/${this.props.match.path.split('/')[2]}`, {
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
            .then(result => {
                this.setState(function(state, props) {
                    return {
                        summary: JSON.parse(JSON.stringify(result.data.summary)),
                        isUserAnswered: result.data.isUserAnswered,
                        thumbnail: result.thumbnail,
                        id: result.id,
                        isRender: true
                    };
                  }, () => {
                    this.setState(function(state, props) {
                        return {
                            isRender: true
                        }});
                        if (this.player)
                            this.player.subscribeToStateChange(this.handleStateChange.bind(this));
                  });
            });
        }
        // window.scroll(0,0);
    }

    AnswerBox (props) {

        if (this.state.token && !(this.state.isUserAnswered.isUserAnswered) && this.state.userHasCharge) {
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
                        onClick={this.sendMyAnswer}
                        style={{
                            fontFamily: "IranSans"
                        }}
                        >
                        ارسال پاسخ به چالش علمی
                    </Button>

                </React.Fragment>
            );
        } else if (this.state.token && this.state.isUserAnswered.isUserAnswered === true) {
            return (
                <React.Fragment>
                   <div>
                        شما قبلا پاسخ داده اید. پاسخ شما :
                    </div>
                    <div>
                        {this.state.isUserAnswered.data.userAnswerMessage}
                    </div>
                </React.Fragment>
            );
        } else if (this.state.token &&!this.state.userHasCharge) {
            return (
                <React.Fragment>
                   <div>
                        لطفا برای پاسخ دهی به این سوال حساب خود را شارژ نمایید.
                    </div>
                </React.Fragment>
            );
        } else if (!this.state.token) {
            return (
                <React.Fragment>
                   <div>
                        لطفا لاگین کنید
                    </div>
                </React.Fragment>
            )
        }
        
    }

    render () {
        return (
            <div>
                <Grid container spacing={0}>
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
                                متن شماره یک درصورت نیاز
                            </Typography>
                            <Typography
                                style={{ fontFamily: 'IranSans_Light' }}
                                >
                                متن شماره دو در صورت نیاز
                            </Typography>
                            
                        </Paper>
                        
                    </Grid>

                    <Grid item xs={8}>
                        <Paper>

                            {(this.state.isRender && this.state.userHasCharge && this.state.token) ?
                                <Player
                                    ref={player => {
                                        this.player = player;
                                    }}
                                    poster={this.state.thumbnail}
                                    startTime = {this.state.summary.startTime}
                                    fluid = {false}
                                    width={900}
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
                                </Player>:null
                            }

                            {(this.state.isRender && !this.state.userHasCharge && this.state.token) ?
                                    <React.Fragment>
                                        <div>کاربر گرامی به دلیل نداشتن شارژ مورد نیاز ویدیو مورد نظر را نمی توانید تماشا کنید</div>
                                    </React.Fragment> : null
                            }
                            
                            {(!this.state.token) ? 
                                <div>لطفا در سایت لاگین کنید</div> : null
                            }

                        </Paper>
                    </Grid>

                    <Grid item xs={8}>
                        <Paper>
                        <ArticlesToolBox
                            model='sciencechallenge'
                            modelid={this.props}
                            token={this.state.token}
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
                                <div dangerouslySetInnerHTML={{__html: this.state.summary.description}} />
                                {/* {this.state.summary.description} */}
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
                            {
                                (this.state.isRender) ?
                                    this.AnswerBox() : 
                                        null
                            }
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                    <ContentUserInteraction
                            config={this.state.userInteractionConfig}
                            modelid={this.props.match.path.split('/')[2]}
                            />
                    </Grid>
                    </Grid>
                    
                </Grid>
            </div>

        );
    }

}
export default SingleSciencechallenge;