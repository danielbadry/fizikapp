import React from 'react';
import StickyFooter from "./StickyFooter";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class Category extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }
    
    componentDidUpdate(prevProps, prevState) {
        
    }

    render() {
        return(
            <React.Fragment>
                <Grid container justify="center" spacing={1}>
                    <Grid item item xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Paper>
                            tree
                        </Paper>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Paper>
                            {[1,2,3].map(
                                (item, index) =>
                                    <Grid 
                                        style={{
                                            direction:'rtl'
                                        }}
                                        item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        item
                                    </Grid>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
export default Category;