import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";

import MainFooter from "./MainFooter";
import AdsPanel from "./AdsPanel";
import StickyFooter from "./StickyFooter";
import SingleRow from "./SingleRow";
import RequestCard from "./RequestCard";
import HeaderSlider from "./HeaderSlider";
import ReactTourGuideSlider from "./ReactTourGuideSlider";
import PostCard from "./PostCard";
import NiceCard from "./NiceCard";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token : null
        }
    }

    componentDidMount() {
        this.setState(function(state, props) {
            return {
                token: localStorage.getItem("token")
            }});
    }

    render() {
        
        return (
            <React.Fragment>
                {/* <MainHeader /> */}
                
                 <Container>
                    <NiceCard />
                    <AdsPanel />
                    <SingleRow
                        label="تازه های فیزیک اپ"
                        footer="مشاهده بیشتر"
                        model="products"
                        linkToShowMore='products'
                        count='10'
                    />

                    {/* {(this.state.token) ? <SingleRow
                        label="ادامه ی ویدیوهای قبلی"
                        footer="مشاهده بیشتر"
                        model="products"
                        linkToShowMore='/products'
                        count='4'
                        token={this.state.token}
                    /> : 
                    null
                    } */}

                    <SingleRow
                        label="چالش های علمی"
                        footer="مشاهده بیشتر"
                        model="sciencechallenge"
                        linkToShowMore='sciencechallenges'
                        count='10'
                    />

                    <SingleRow
                        label="تعریفی ها"
                        footer="مشاهده بیشتر"
                        model="definitions"
                        linkToShowMore='definitions'
                        count='10'
                    />
                    
                    <SingleRow
                        label="فراتر از فیزیک"
                        footer="مشاهده بیشتر"
                        model="products"
                        linkToShowMore='products'
                        count='10'
                    />

                    <SingleRow
                        label="درخواست ها"
                        footer="شمشاهده بیشتر"
                        model="requests"
                        linkToShowMore='requests'
                        count='10'
                    />

                    {/* <RequestCard /> */}
             </Container>
             <StickyFooter />
                    {/* // <Grid item xs={12}>
                    //     <MainHeader />
                    // </Grid>
                    
                    //  <Grid item xs={12}>
                    // <Paper>
                    //     <HeaderSlider />
                    //     <ReactTourGuideSlider />
                    // </Paper>
                    // </Grid> */}
                    </React.Fragment>     
        );
    }
}

export default Home;