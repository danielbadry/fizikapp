import React from 'react';
import Grid from '@material-ui/core/Grid';
import PostCard from "./PostCard";
import Paper from '@material-ui/core/Paper';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class SingleRow extends React.Component{

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
                <Grid container xs={12}>
                    <Grid item xs={4}>
                        <PostCard />
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard />
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard />
                    </Grid>
                </Grid>
                <Link 
                    component={RouterLink} 
                    to="/learning-playground"
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