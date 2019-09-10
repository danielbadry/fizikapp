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
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class Category extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            rowList: []
        }
        console.info('prpsesh:', props);
    }

    componentDidMount() {
        fetch(`http://localhost:1337/categories?rowId=${this.props.categoryid}`, {
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
            // data: JSON.stringify({name:'milad'}), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(rowList => {
                this.setState((state, props) => {
                    return {rowList: rowList.data};
                });
        });    
    }
    
    render() {
        
        return (
            <Grid container spacing={3}>
                        
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper>
                        <List>    
                            {this.state.rowList.map(
                            (row, index) => 
                            <ListItem 
                                alignItems="flex-start"
                                key={index}
                                >
                                <ListItemAvatar>
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Link 
                                            component={RouterLink} 
                                            to={`/definition/${row.id}`}
                                            style={{ fontFamily: 'IranSans_Light' }}
                                            >
                                    {row.name}
                                </Link>}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        <div
                                            style={{ fontFamily: 'IranSans_Light' }}
                                            >
                                            {row.title}
                                        </div>
                                    </Typography>
                                    <div
                                        style={{ fontFamily: 'IranSans_Light' }}
                                        >
                                        {row.description}
                                    </div>
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

export default Category;