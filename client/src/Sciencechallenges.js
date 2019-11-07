import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class Sciencechallenges extends React.Component {
    
    constructor(props){
        super (props);
        this.state = {
            sciencechallenges: []
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL+`sciencechallenge`, {
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
            .then(sciencechallenge => {
                this.setState((state, props) => {
                    return {sciencechallenges: sciencechallenge.data};
                });
            });
    }
    
    render() {
        return(
            <React.Fragment>
                <Grid container spacing={1}>
                    
                        {this.state.sciencechallenges.map(
                            (item, index) => 
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Paper>
                                        <Grid container spacing={0}>

                                            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}
                                            style={{
                                                direction: 'rtl'
                                            }}
                                            >
                                                <Typography
                                                    style={{
                                                        fontFamily: 'IranSans',
                                                        fontSize:'14px',
                                                        fontWeight:'bold'
                                                    }}
                                                    >
                                                    <Link 
                                                        to={`/sciencechallenge/${item.id}`}
                                                        component={RouterLink} 
                                                        >
                                                            {item.name}
                                                    </Link>
                                                </Typography>
                                                <Typography 
                                                    style={{
                                                        fontFamily: 'IranSans',
                                                         fontSize:'14px'
                                                    }}
                                                    >
                                                    توضیحات مختصری از این چالش علمی
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                                <img 
                                                    src={item.thumbnail} 
                                                    style={{
                                                        width:'70%'
                                                    }}
                                                    />
                                            </Grid>

                                        </Grid>

                                        {/* <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                            <Avatar 
                                                alt = "Remy Sharp" 
                                                src = {item.thumbnail} 
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary = {item.name}
                                            secondary={
                                                <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    // className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    Ali Connors
                                                </Typography>
                                                {item.description}
                                                </React.Fragment>
                                            }
                                            />
                                        </ListItem> */}

                                    </Paper>
                                </Grid>
                        )}
               
                   
            
            </Grid>
            </React.Fragment>
        )
    }
}
export default Sciencechallenges;