import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import StickyFooter from "./StickyFooter";
import SingleRow from "./SingleRow";
import PostCard from "./PostCard";
import Typography from '@material-ui/core/Typography';

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
                    
                    <SingleRow
                        label="تعریفی ها"
                        footer="مشاهده بیشتر تعریفی ها"
                    />

                    <SingleRow
                        label="ویدیوها"
                        footer="مشاهده بیشتر ویدیو ها"
                    />
                    
                    <SingleRow
                        label="تمرین ها"
                        footer="مشاهده بیشتر تمرین ها"
                    />
                    
                    <StickyFooter />
                </Grid>
            </div>
        );
    }
}

export default Requests;