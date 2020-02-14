import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import StickyFooter from "./StickyFooter";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

class Sciencechallenges extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            requests : [],
            tags: [],
            activeTags: [],
            searchText: ''
        }
    }

    fetchRequests = () => {
        fetch(process.env.REACT_APP_API_URL+`sciencechallenge?tags=${encodeURIComponent(JSON.stringify(this.state.activeTags))}`, {
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
            data: JSON.stringify({name:'milad'}), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(requests => {
                this.setState((state, props) => {
                    return {requests: requests.data};
                });
            });
    }

    componentDidMount() {
        
        fetch(process.env.REACT_APP_API_URL+'tags/', {
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
            .then(tags => {
                for(let tag of tags.data) {
                    tag.color = "default";
                    tag.isSelected = false;
                }
                this.setState((state, props) => {
                    return {tags: tags.data, activeTags:[]};
                }, function() {
                    this.fetchRequests();
                });
            });   
    }

    tagClicked = id => (event) => {
        let listOfTags = this.state.tags;
        for(let tag of listOfTags) {
            if (tag.id === id) {
                tag.isSelected = !tag.isSelected;
                if(tag.isSelected) {
                    tag.color = 'primary';
                } else {
                    tag.color = 'default';
                }
            }
        }
        //  separate active tags
        let at = [];
        for(let tag of listOfTags) {
            if(tag.isSelected) {
                at.push(tag);                
            }
        }
        this.setState((state, props) => {
            return {tags: listOfTags, activeTags:at};
        }, function() {
            console.info('active tags:', this.state.activeTags);
            this.fetchRequests();
        });

    }

    handleChange = () => event => {
        this.setState({searchText: event.target.value }, function() {
            this.fetchRequests();
        });
    }

    render() {
        
        return (
            <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper>

                        {this.state.tags.map(
                            (tag, index) =>
                                <Chip
                                    key={index}
                                    // icon={<FaceIcon />}
                                    label={tag.name}
                                    clickable
                                    counter={tag.id}
                                    color={tag.color}
                                    onClick={this.tagClicked(tag.id)}
                                    deleteIcon={<DoneIcon />}
                                    style={{
                                        fontFamily: "IranSans"
                                      }}
                                    />
                        )}
                        
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper>
                        <List>    
                            {this.state.requests.map(
                            (request, index) => 
                            <ListItem 
                                alignItems="flex-start"
                                key={index}
                                >
                                <ListItemAvatar>
                                <Avatar alt="Cindy Baker" src={request.data.thumbnail} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Link 
                                            component={RouterLink} 
                                            to={`/sciencechallenge/${request.id}`}
                                            >
                                    {request.data.summary.title}
                                </Link>}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        {/* <Link>
                                            ali
                                        </Link> */}
                                    </Typography>
                                    {request.data.summary.description}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            )}
                            </List>
                        </Paper>
                    </Grid>

                    <StickyFooter />
            </Grid>
        );
    }
}

export default Sciencechallenges;