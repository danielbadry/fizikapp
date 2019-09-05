import React from 'react';
import ProfileTabs from './ProfileTabs';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

class Profile extends React.Component {
    render() {
        return (
            <div>
                <Grid container spacing={3}>
                        
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <ProfileTabs />
                    </Grid>
                    
                    <Grid container>
                        <MainFooter />
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}

export default Profile;