import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Criticisms from './Criticisms';

class MainFooter extends React.Component {
    render() {

        return (
            <Grid item xs={12}>
               <Paper>
                    <div>
                        <Link component={RouterLink} to="/terms-conditions">
                            terms-conditions
                        </Link>
                    </div>
                    <div>
                        <Link component={RouterLink} to="/careers">
                            careers
                        </Link>
                    </div>
                    <div>
                        <Link component={RouterLink} to="/Disclaimer">
                            Disclaimer
                        </Link>
                    </div>
                    <div>
                        <Link component={RouterLink} to="/about">
                            about
                        </Link>
                    </div>
                    <div>
                        <Link component={RouterLink} to="/privacy-policy">
                            privacy-policy
                        </Link>
                    </div>
                    <div>
                        <Link component={RouterLink} to="/contact-us">
                            contact-us
                        </Link>
                    </div>
                    <div>
                        <Link component={RouterLink} to="/faq">
                            faq
                        </Link>
                    </div>
                    <div>
                        <Link component={RouterLink} to="/learning-playground">
                            learning playground
                        </Link>
                    </div>
               </Paper>
               <Paper>
               <Criticisms />
               </Paper>
            </Grid>
        );
    }
}
export default MainFooter;