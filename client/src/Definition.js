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
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class Definition extends React.Component {
    
    constructor(props) {
        super(props);
        console.info('props:', props);
        this.state = {
            definition : {}
        }
    }
    
    handleChange = () => {
        console.info('hello');
    }

    componentDidMount() {
        fetch(`http://localhost:1337/definitions/${this.props.requestid}`, {
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
                this.setState((state, props) => {
                return {definition: definition};
                });
            });
    }

    render () {
        
        return (
            <Grid container spacing={3}>
                        
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={3}>
                        <Paper>
                            something
                        </Paper>
                    </Grid>

                    <Grid item xs={9}>
                        <Paper>
                            <h3
                                style={{
                                    fontFamily: "IranSans"
                                }}
                                >{this.state.definition.name}
                            </h3>  
                            <h5
                                style={{
                                    fontFamily: "IranSans"
                                }}
                                >{this.state.definition.title}
                            </h5>
                            <p
                                style={{
                                    fontFamily: "IranSans"
                                }}
                                >
                                {this.state.definition.description}
                            </p>
                        </Paper>
                        <Paper>
                        
                        </Paper>
                        <Paper>

                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                        qa/commment
                    </Grid>

                    <MainFooter />

            </Grid>
        );
    }
}
export default Definition;