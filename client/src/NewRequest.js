import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import RequestTag from './RequestTag';

class NewRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            message : '',
            tags:[]
        }
    }
    
    showTags = (selectedItems, actionMeta) => {
        console.info('selectedItems:', selectedItems);
    }

    handleChange = pr => event => {
        event.persist();
        this.setState((state, props) => {
            return {[pr]: event.target.value};
        });
    };

    sendRequest = () => {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        let data = {
          title: this.state.title,
          message: this.state.message,
          userId: user.id
        }

        fetch(`http://localhost:1337/requests`, {
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
            .then(request => {
                this.setState((state, props) => {
                    return ({title: '', message:''});
                });
            });
    }

    render () {
        const values = {
            name: 'Cat in the Hat',
            age: '',
            multiline: 'Controlled',
            currency: 'EUR',
          };
        return (
            <Grid container spacing={3}>
                        
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper>
                        <form noValidate autoComplete="off">
                            
                            <TextField
                                id="standard-name"
                                label="title"
                                value={this.state.title}
                                onChange={this.handleChange('title')}
                                margin="normal"
                            />

                            <TextField
                                id="standard-full-width"
                                label="Label"
                                style={{ margin: 8 }}
                                placeholder="Placeholder"
                                helperText="Full width!"
                                value={this.state.message}
                                onChange={this.handleChange('message')}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            
                            <RequestTag 
                                onChange={this.showTags.bind(this)}
                            />

                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={this.sendRequest}
                                >
                                send request
                            </Button>
                        </form>    
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper></Paper>
                    </Grid>

                    <MainFooter />

            </Grid>
        );
    }
}
export default NewRequest;