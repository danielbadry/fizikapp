import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class AdsPanel extends React.Component{
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render () {
        return(
            <Grid container spacing={3} alignItems="center" justify="center">
                
                <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                    {/* <Paper
                        style={{
                            borderRadius:0
                        }}
                        > */}
                        <video 
                            id="bgVideo" 
                            loop="10"
                            controls = {false}
                            muted
                            preload="true" 
                            autoPlay = {true}
                            style={{
                                // position:'absolute',
                                width:'100%',
                                height:'100%',
                                zIndex:'-1',
                            }}
                            >
                            <source src="ADS.mp4" type="video/mp4" /> 
                        </video>
                    {/* </Paper> */}
                </Grid>

                <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                    <Paper 
                        style={{
                            borderRadius:0,
                            fontFamily: 'IranSans'
                        }}
                        >
                        متن یا تبلیغات اینجا
                    </Paper>
                </Grid>

            </Grid>
        );
    }
}
export default AdsPanel;