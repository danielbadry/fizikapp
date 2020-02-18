import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import MainHeader from "./MainHeader";
import StickyFooter from "../header/footer/StickyFooter";

import { Button, Typography } from '@material-ui/core';
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
        this.setState((state, props) => {
            return {tags: selectedItems};
        });
    }

    handleChange = pr => event => {
        event.persist();
        this.setState((state, props) => {
            return {[pr]: event.target.value};
        });
    };

    sendRequest = () => {
        let token = localStorage.getItem('token');
        let data = {
          title: this.state.title,
          message: this.state.message,
          tags: JSON.stringify(this.state.tags)
        }

        fetch(process.env.REACT_APP_API_URL+`requests`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
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
            <Grid 
                container 
                spacing={3} 
                alignContent="center" 
                alignItems="center"
                style={{
                    direction: 'rtl'
                }}
                >
               
                <Grid item xs={12} sm={12} md={10} lg={10} xl={10} >
                    <Paper
                    style={{
                        direction : 'rtl'
                    }}
                    >
                    <form noValidate autoComplete="off">
                        <Typography
                        style={{
                            fontFamily: 'IranSans',
                            paddingTop: '1%',
                            paddingRight : '1%'
                        }}
                        >
                            لطفا درخواست خود را در فرم زیر وارد نمایید
                        </Typography>
                        <TextField
                            id="standard-name"
                            label="عنوان"
                            value={this.state.title}
                            onChange={this.handleChange('title')}
                            margin="normal"
                            InputLabelProps={{
                                style: {
                                    fontFamily: "IranSans",
                                    fontSize: '14px'
                                }
                            }}
                            InputProps={{
                                style: {
                                    fontFamily: "IranSans",
                                    fontSize: '14px'
                                }
                            }}
                        />
                        
                        <TextField
                            id="standard-name"
                            label="توضیحات کامل"
                            value={this.state.message}
                            onChange={this.handleChange('message')}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{
                                style: {
                                    fontFamily: "IranSans",
                                    fontSize: '14px'
                                }
                            }}
                            InputProps={{
                                style: {
                                    fontFamily: "IranSans",
                                    fontSize: '14px'
                                }
                            }}
                        />

                        <RequestTag 
                            onChange={this.showTags.bind(this)}
                        />

                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={this.sendRequest}
                            style={{
                                fontFamily: "IranSans"
                            }}
                            >
                            ارسال درخواست
                        </Button>
                    </form>    
                    </Paper>
                </Grid>
            
                <Grid item xs={12}>
                    <Paper></Paper>
                </Grid>

                <StickyFooter />

            </Grid>
        );
    }
}
export default NewRequest;