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
                        <Link 
                            component={RouterLink} 
                            to="/terms-conditions"
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            شرایط استفاده
                        </Link>
                    </div>
                    <div>
                        <Link 
                            component={RouterLink} 
                            to="/careers"
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            فرصت های شغلی
                        </Link>
                    </div>
                    <div>
                        <Link 
                            component={RouterLink} 
                            to="/Disclaimer"
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            رفع مسئولیت
                        </Link>
                    </div>
                    <div>
                        <Link 
                            component={RouterLink} 
                            to="/about"
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            درباره ما
                        </Link>
                    </div>
                    <div>
                        <Link 
                            component={RouterLink} 
                            to="/privacy-policy"
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            حریم شخصی
                        </Link>
                    </div>
                    <div>
                        <Link 
                            component={RouterLink} 
                            to="/contact-us"
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            ارتباط با ما
                        </Link>
                    </div>
                    <div>
                        <Link 
                            component={RouterLink} 
                            to="/faq"
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            سوالات متداول
                        </Link>
                    </div>
                    <div>
                        <Link 
                            component={RouterLink} 
                            to="/learning-playground"
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            آموزش سیستم
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