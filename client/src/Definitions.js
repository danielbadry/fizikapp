import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
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

class Definitions extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            definitions : [],
            tags: [],
            activeTags: []
        }
    }

    fetchDefinitions = () => {
        fetch(`http://localhost:1337/definitions?tags=${encodeURIComponent(JSON.stringify(this.state.activeTags))}`, {
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
            .then(definitions => {
                this.setState((state, props) => {
                    return {definitions: definitions.data};
                });
            });
    }

    componentDidMount() {
        
        fetch('http://localhost:1337/tags/', {
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
                    tag.color = "primary";
                    tag.isSelected = true;
                }
                this.setState((state, props) => {
                    return {tags: tags.data, activeTags:tags.data};
                }, function() {
                    this.fetchDefinitions();
                });
            });   
    }

    tagClicked = id => (event) => {
        let listOfTags = this.state.tags;
        for(let tag of listOfTags) {
            if (tag.id == id) {
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

    render() {
        
        return (
            <Grid container spacing={3}>
                        
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={12}>
                    <Button variant="contained">
                        ارسال درخواست
                    </Button>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper>

                        {this.state.tags.map(
                            (tag, index) =>
                                <Chip
                                    key={index}
                                    icon={<FaceIcon />}
                                    label={tag.name}
                                    clickable
                                    counter={tag.id}
                                    color={tag.color}
                                    onClick={this.tagClicked(tag.id)}
                                    deleteIcon={<DoneIcon />}
                                    />
                        )}
                        
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper>
                        <List>    
                            {this.state.definitions.map(
                            (definitions, index) => 
                            <ListItem 
                                alignItems="flex-start"
                                key={index}
                                >
                                <ListItemAvatar>
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                primary={<Link component={RouterLink} to={'https://google.com'}>
                                    {definitions.title}
                                </Link>}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        <Link component={RouterLink} to={'https://google.com'}>
                                            test
                                        </Link>
                                    </Typography>
                                    {' — Do you have Paris recommendations? Have you ever…'}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            )}
                            </List>
                        </Paper>
                    </Grid>

                    <MainFooter />
            </Grid>
        );
    }
}

export default Definitions;