import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ContentUserInteraction from "./ContentUserInteraction";
import StickyFooter from "./StickyFooter";
import SimpleTreeView from "./SimpleTreeView";
import ArticlesToolBox from "./ArticlesToolBox";
import Divider from '@material-ui/core/Divider';

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
        fetch(process.env.REACT_APP_API_URL+`definitions/${this.props.definitionid}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
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
            <Grid container spacing={3}> 
                    <Grid item xs={12}>
                        {/* <MainHeader /> */}
                    </Grid>

                    <Grid item xs={10}>
                        <Paper>
                            <img src={this.state.thumbnail} />
                        </Paper> 
                    </Grid>
                    
                    <Grid item xs={3}>
                        <Typography>
                            {this.state.summary.name}
                        </Typography>     
                    </Grid>
                    
                    <Grid item xs={3}>
                        <Typography>
                            {this.state.summary.description}
                        </Typography>     
                    </Grid>
                    
                    <Grid item xs={3}>
                        <Paper>
                            <ArticlesToolBox
                                model='definitions'
                                modelid={this.props.definitionid}
                                token={this.state.token}
                                />
                            </Paper>
                    </Grid>
                    
                    <Grid item xs={3}>
                        <Paper>
                            <SimpleTreeView />
                        </Paper>
                    </Grid>

                    <Grid item xs={9}>
                        <Paper>

                        </Paper>
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