import React from 'react';
import Grid from '@material-ui/core/Grid';
import PostCard from "./PostCard";
import Paper from '@material-ui/core/Paper';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class SingleRow extends React.Component{
    
    constructor(props) {
        super (props);
        this.state = {
            rows:[]
        }
    }
    
    componentDidMount() {
        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`${this.props.model}?limit=${this.props.count}`, {
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
            .then(result => {
                this.setState(function(state, props) {
                    return {
                        rows: result.data,
                    };
                }, () => {
                        //  we can do something here after state set
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <Paper
                style={{
                    marginBottom: '2%'
                }}
                >
                <div 
                    style={{
                        display: 'block',
                        fontFamily: 'IranSans_Bold',
                        float: 'right',
                        width: '100%',
                        direction: 'rtl',
                        marginRight: '4%',
                        fontSize: '23px',
                        marginBottom: '2%',
                        marginTop: '2%'
                    }}
                    >
                    {this.props.label}
                </div>

                <Grid container xs={12} item>
                    {this.state.rows.map(
                        (item, index) => 
                        <Grid 
                            item 
                            xs={4}
                            key={index}
                            >
                            <PostCard
                                item = {item}
                                />
                        </Grid>
                    )}
                </Grid>

                <Link 
                    component={RouterLink} 
                    to={this.props.linkToShowMore}
                    style={{ fontFamily: 'IranSans_Light' }}
                    >
                    {this.props.footer}
                </Link>
                </Paper>
            </React.Fragment>
        )
    }
}

export default SingleRow;