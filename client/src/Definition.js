import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ContentUserInteraction from "./ContentUserInteraction";
import StickyFooter from "./StickyFooter";
import SimpleTreeView from "./SimpleTreeView";
import ArticlesToolBox from "./ArticlesToolBox";
import Divider from '@material-ui/core/Divider';
import Tree2 from "./Tree2";

class Definition extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            summary:{},
            tags: [],
            id: '',
            isRender : false,
            thumbnail: '',
            definitionId: props.definitionid,
            startTime: 8,
            userInteractionConfig : [
                {
                    type:'qa',
                    label:' پرسش و پاسخ',
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

    componentDidMount() {
        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`definitions/${this.props.definitionid}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            })
            .then(response => response.json())
            .then(definition => {
                this.setState(function(state, props) {
                    return {
                        summary: JSON.parse(JSON.stringify(definition.summary)),
                        tags: JSON.parse(JSON.stringify(definition.tags)),
                        thumbnail: definition.thumbnail,
                        id: definition.id,
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
        return (
            <Grid container spacing={0} justify="center"> 

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} 
                        style={{
                            backgroundImage: `url(${this.state.thumbnail})`,
                            backgroundSize: 'cover',
                            height: '300px'
                        }}>
                        
                        <Typography
                            style={{
                                fontFamily: 'IranSans',
                                float: 'right',
                                marginTop: '16%',
                                marginRight: '5%',
                                fontSize: '22px',
                                borderBottom: 'solid'
                            }}
                        >
                            {this.state.summary.name}
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <Paper>
                            <ArticlesToolBox
                                model='definitions'
                                modelid={this.props.definitionid}
                                token={this.state.token}
                                />
                            </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                            overflow:'hidden'
                        }}>
                        <Grid container spacing={1} justify="center" 
                            style={{
                                margin:0
                            }}
                        >
                            <Grid item xs={9} sm={4} md={4} lg={3} xl={3}>
                                <Paper>
                                    {/* <SimpleTreeView /> */}
                                    <Tree2 />
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={11} sm={7} md={7} lg={8} xl={8}>
                                <Paper
                                    style={{
                                        padding: '10px 37px'
                                    }}
                                >
                                    <Typography
                                        style={{
                                            direction: 'rtl',
                                            textAlign: 'justify',
                                            fontFamily:'IranSans',
                                            lineHeight: '2.5rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {this.state.summary.title}
                                    </Typography>
                                    <hr />
                                    <Typography
                                        style={{
                                            direction: 'rtl',
                                            textAlign: 'justify',
                                            fontFamily:'IranSans',
                                            lineHeight: '2.5rem',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {this.state.summary.description}
                                    </Typography>
                                </Paper>

                                <Paper style={{direction:'rtl', textAlign:'right', margin: '10px 0px', padding: '10px 6px'}}>
                                    {
                                        this.state.isRender ? 
                                            this.state.summary.tagsArray.map(
                                                (item, index)=>
                                                    <Chip style={{fontFamily:'IranSans',fontSize:'14px'}} label="سرعت" component="a" clickable />
                                                ) : null
                                    }
                                </Paper>

                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <ContentUserInteraction
                            config={this.state.userInteractionConfig}
                            modelid={this.state.definitionid}
                            />
                    </Grid>

                    <StickyFooter />

            </Grid>
        );
    }
}
export default Definition;