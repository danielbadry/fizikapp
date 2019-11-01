import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ChartExample1 from "./ChartExample1";

class Dashboard extends React.Component {
    
    constructor(props) {
        super (props);
    }

    render() {
        return(
            
        <React.Fragment>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} >
                <Paper>
                    B1 
                </Paper> 
            </Grid>

            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} >
                <Paper>
                    B2 
                </Paper>
            </Grid>

            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} >
                <Paper>
                    B3 
                </Paper>
            </Grid>
            
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} >
                <ChartExample1 />
            </Grid>
        </React.Fragment>
        );
    }
}

export default Dashboard;