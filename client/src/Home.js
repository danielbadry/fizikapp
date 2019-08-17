import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import PostCard from "./PostCard";

class Requests extends React.Component {
    render() {
        
        return (
            <div>
                <Grid container spacing={3}>
                        
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={12}>
                    <Paper>slider</Paper>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <Paper>دهم</Paper>
                    </Grid>
                    <Grid item xs={4}>
                    <Paper>یازدهم</Paper>
                    </Grid>
                    <Grid item xs={4}>
                    <Paper>دوازدهم</Paper>
                    </Grid>
                    
                    <Grid container>
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
                    
                    <MainFooter />
                </Grid>
            </div>
        );
    }
}

export default Requests;