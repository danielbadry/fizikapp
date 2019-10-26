import React from 'react';
import './nice-card.css';
import Grid from '@material-ui/core/Grid';

class SingleRow extends React.Component {
    
    constructor(props) {
        super (props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <Grid container spacing={1}>
                    
                    <Grid item md={4}>
                        <figure class="snip0057 blue">
                            <figcaption>
                                <h2>Tiffany <span>Case</span></h2>
                                <p>That's the whole problem with science. You've got a bunch of empiricists trying to describe things of unimaginable wonder.</p>
                                <div class="icons"><a href="#"><i class="ion-ios-home"></i></a><a href="#"><i class="ion-ios-email"></i></a><a href="#"><i class="ion-ios-telephone"></i></a></div>
                            </figcaption>
                            <div class="image"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample3.jpg" alt="sample3"/></div>
                            <div class="position">مشاهده دسته بندی</div>
                        </figure>
                    </Grid>
                    
                    <Grid item md={4}>
                        <figure class="snip0057 blue">
                            <figcaption>
                                <h2>Tiffany <span>Case</span></h2>
                                <p>That's the whole problem with science. You've got a bunch of empiricists trying to describe things of unimaginable wonder.</p>
                                <div class="icons"><a href="#"><i class="ion-ios-home"></i></a><a href="#"><i class="ion-ios-email"></i></a><a href="#"><i class="ion-ios-telephone"></i></a></div>
                            </figcaption>
                            <div class="image"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample3.jpg" alt="sample3"/></div>
                            <div class="position" style={{fontFamily:'IranSans'}}>مشاهده دسته بندی</div>
                        </figure>
                    </Grid>
                    
                    <Grid item md={4}>
                        <figure class="snip0057 blue">
                            <figcaption>
                                <h2>Tiffany <span>Case</span></h2>
                                <p>That's the whole problem with science. You've got a bunch of empiricists trying to describe things of unimaginable wonder.</p>
                                <div class="icons"><a href="#"><i class="ion-ios-home"></i></a><a href="#"><i class="ion-ios-email"></i></a><a href="#"><i class="ion-ios-telephone"></i></a></div>
                            </figcaption>
                            <div class="image"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample3.jpg" alt="sample3"/></div>
                            <div class="position">مشاهده دسته بندی</div>
                        </figure>
                    </Grid>
                    
                </Grid>
                
                
            </React.Fragment>
        );
    }
}
export default SingleRow;