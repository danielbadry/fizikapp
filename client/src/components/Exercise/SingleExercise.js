import React from 'react';
import RelatedProducts from "../RelatedProducts";
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
import css from "../other/video-react.css"
import ContentUserInteraction from "../comments/ContentUserInteraction";
import Grid from '@material-ui/core/Grid';
import StickyFooter from "../header/footer/StickyFooter";
import ArticlesToolBox from "../ArticlesToolBox";
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Chip from '@material-ui/core/Chip';
import Editor from 'draft-js-plugins-editor'
import { EditorState, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import createMathjaxPlugin from 'draft-js-mathjax-plugin'

//import MainHeader from "./MainHeader";
//import QuizComponent from './QuizComponent';
const mathjaxPlugin = createMathjaxPlugin(/* optional configuration object */)

const plugins = [
  mathjaxPlugin,
]

class SingleExercise extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            summary: {},
            token: null,
            tags: [],
            id: '',
            isRender : false,
            thumbnail: '',
            userCanSeeQuiz: true,
            userCanSeeVideo: true,
            videoInfoBoxDisplayType: 'flex',
            videoPlayerDisplayType: 'none',
            productId: props.productid,
            userInteractionConfig : [
                {
                    type:'qa',
                    label:'پرسش و پاسخ',
                    model:'beyondthebook'
                },
                {
                    type:'comment',
                    label:'نظرات',
                    model:'beyondthebook'
                }
            ],
        //    editorState: EditorState.createWithContent(convertFromRaw(JSON.parse('{"blocks":[{"key":"1oi1h","text":"hello \t\t  is a formula","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":6,"length":2,"key":0}],"data":{}}],"entityMap":{"0":{"type":"INLINETEX","mutability":"IMMUTABLE","data":{"teX":"\\Delta = a + b","displaystyle":false}}}}'))),
        }

    };

    catchMeHere = () => {
        this.fetchProduct();
    }

    switchBetweenVideo = () => {
        this.setState(function(state, props) {
            return {
                videoInfoBoxDisplayType: 'none',
                videoPlayerDisplayType: 'block',
            };
          });
    }

    fetchProduct = (token) => {
        fetch(process.env.REACT_APP_API_URL+`exercises/${this.props.match.path.split('/')[2]}`, {
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
                // console.info('aslesh', product.summary.description);
                this.setState(function(state, props) {
                    return {
                        // description : stateToHTML(convertFromRaw(JSON.parse('{"blocks":[{"key":"92op2","text":" \t\t ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":1,"length":2,"key":0}],"data":{}}],"entityMap":{"0":{"type":"INLINETEX","mutability":"IMMUTABLE","data":{"teX":"\\Delta = a + b","displaystyle":false}}}}'))),
                        summary: JSON.parse(JSON.stringify(product.data.summary)),
                        tags: JSON.parse(JSON.stringify(product.data.tags)),
                        thumbnail: product.data.thumbnail,
                        id: product.data.id,
                        isRender: true
                    };
                  }, () => {
                    this.setState(function(state, props) {
                        return {
                            isRender: true
                        }});
                    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
                  });
            });
    }

    componentWillUnmount() {
        const { player } = this.player.getState();
        const token = localStorage.getItem('token');
        let data = {
            modelId: this.props.match.path.split('/')[2],
            startTime: player.currentTime,
            model:'exercises'
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

    handleStateChange(state, prevState) {
        // copy player state to this component's state
        this.setState({
          player: state,
          currentTime: state.currentTime
        });
        window.localStorage.setItem('model', 'exercises');
        window.localStorage.setItem('modelId', this.props.match.path.split('/')[2]);
        window.localStorage.setItem('currentTime', this.state.currentTime);
      }

    componentDidMount(){
        
        // console.info('mohtava:', stateToHTML(convertFromRaw(JSON.parse('{"blocks":[{"key":"5994h","text":"hello","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'))));
        const token = localStorage.getItem('token');
        this.setState(function(state, props) {
            return {
                token: token
            }});
        this.fetchProduct(token);  
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.summary.id != this.props.match.path.split('/')[2]) {
            const token = localStorage.getItem('token');
            this.fetchProduct(token);
        }
        // window.scroll(0,0);
    }

    render() {
        var newContentState = convertFromRaw(JSON.parse('{"blocks":[{"key":"5994h","text":"hello","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'));
        return (
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} 
                    style={{
                        // backgroundImage: `url('https://www.filimo.com/public/public/user_data/movie_cover/cover_26503.jpg?8235')`,
                        // backgroundSize: 'cover',
                        // height: '520px',
                        // overflow: 'hidden'
                    }}>
                        <Grid container spacing={2} justify="center" >
                            
                            
                            
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid container spacing={0} >
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Grid container spacing={0} style={{display:`${this.state.videoPlayerDisplayType}`}}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            {(this.state.isRender) ?
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
                                                
                                                </Player>
                                              : 
                                            null
                                        } 
                                            </Grid>
                                            
                                        </Grid>
                                        <Grid container spacing={0} style={{display:`${this.state.videoInfoBoxDisplayType}`}}>
                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <Grid container spacing={0} style={{
                                                    direction: 'rtl',
                                                    fontFamily: 'IranSans'
                                                }}>

                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: '#fff',
                                                        fontSize: '15px'
                                                    }}>
                                                        {this.state.summary.name}
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: '#fff',
                                                        fontSize: '13px'
                                                    }}>
                                                        The English subtitle
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        IMDB
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: '#fdc13c',
                                                        fontSize: '14px'
                                                    }}>
                                                        مناسب برای مقطع دوازدهم
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: 'white',
                                                        fontSize: '14px'
                                                    }}>
                                                        کارگردان ایمان ارقامی
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: 'white',
                                                        fontSize: '14px'
                                                    }}>
                                                        مدت زمان یک ساعت و چند دقیقه
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: 'white',
                                                        fontSize: '14px'
                                                    }}>
                                                        زیر نویس دارد
                                                    </Grid>
                                                    
                                                    {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        {this.state.summary.tagsArray.map(
                                                            (item, index)=>
                                                                <Chip style={{fontFamily:'IranSans',fontSize:'14px'}} label="سرعت" component="a" clickable />
                                                            )
                                                        }
                                                    </Grid> */}

                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <img 
                                                    src={this.state.summary.thumbnail} 
                                                    style={{
                                                        width: '270px'
                                                    }}
                                                    />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                        margin: '16px 0px',
                                        backgroundColor: 'blanchedalmond'
                                    }}>
                                        
                                        {
                                            (this.state.token && this.state.userCanSeeVideo) ? 
                                                <Fab variant="extended" aria-label="like" style={{
                                                        fontFamily: 'IranSans'
                                                    }}
                                                    onClick={this.switchBetweenVideo}
                                                    >
                                                    <NavigationIcon />
                                                    نمایش فیلم
                                                </Fab> :
                                                null
                                                }
                                                
                                                {
                                                    (this.state.token && this.state.userCanSeeVideo) ? 
                                                        <Fab variant="extended" aria-label="like" style={{
                                                                fontFamily: 'IranSans'
                                                            }}>
                                                            <NavigationIcon />
                                                            نشان کردن
                                                        </Fab>:
                                                        null
                                                    }
                                                {
                                                    (!this.state.token) ? 
                                                        <Fab 
                                                            href='#/signin'
                                                            variant="extended" 
                                                            aria-label="like" 
                                                            style={{
                                                                fontFamily: 'IranSans'
                                                            }}>
                                                            <NavigationIcon />
                                                            لطفا لاگین کنید
                                                        </Fab> :
                                                        null
                                                    }
                                                {
                                                    (this.state.token && !this.state.userCanSeeVideo) ?     
                                                        <Fab 
                                                            variant="extended" 
                                                            aria-label="like" 
                                                            href='#/shopping-plans'
                                                            style={{
                                                                fontFamily: 'IranSans'
                                                            }}>
                                                            <NavigationIcon />
                                                            لطفا شارژ کنید
                                                        </Fab>:
                                                    null
                                                }
                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        {/* <QuizComponent
                            endFunc={this.catchMeHere}
                            model='products'
                            modelid={this.props.productid}
                        /> */}
                        <ArticlesToolBox
                            model='exercises'
                            modelid={this.props}
                            token={this.state.token}
                            />
                    </Grid>

                    <Grid container spacing={1} justify="center">
                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <Paper>
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
                                // margin: '1%'
                            }}
                            >
                            <Typography
                                style = {{
                                    fontFamily: 'IranSans_Light',
                                    fontWeight: 'bold',
                                    
                                }}
                                >
                                عنوان :
                            </Typography>
                            <Typography 
                                variant="span" 
                                gutterBottom
                                style={{ 
                                    fontFamily: 'IranSans_Light',
                                    fontSize: '14px',
                                    lineHeight: '1.8rem'
                                }}
                                >
                                {this.state.summary.title}
                            </Typography>
                            <hr />
                            <Typography
                                style = {{
                                    fontFamily: 'IranSans_Light',
                                    fontWeight: 'bold',
                                    
                                }}
                                >
                                توضیحات :
                            </Typography>
                            <Typography 
                                variant="span" 
                                gutterBottom
                                style={{ 
                                    fontFamily: 'IranSans_Light',
                                    fontSize: '14px',
                                    lineHeight: '1.8rem'
                                }}
                                >
                                    {/* <Editor
                                        editorState={this.state.editorState}
                                        readOnly='true'
                                        plugins={plugins}
                                        onChange={()=>EditorState.createWithContent(convertFromRaw(JSON.parse('{"blocks":[{"key":"5994h","text":"سلام","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}')))}
                                        textAlignment = 'right'
                                        placeholder = 'زیر این نوشته کلیک کنید و شروع به نوشتن متن و فرمول کنید'
                                        /> */}
                                {/* <div dangerouslySetInnerHTML={{__html:this.state.description}} />  */}
                                <div dangerouslySetInnerHTML={{__html: this.state.summary.description}} />
                                {/* {stateToHTML(convertFromRaw(JSON.parse(this.state.summary.description)))} */}
                            </Typography>
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

        );
    }
}
export default SingleExercise;