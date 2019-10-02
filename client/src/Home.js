import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import StickyFooter from "./StickyFooter";
import SingleRow from "./SingleRow";
import HeaderSlider from "./HeaderSlider";
import ReactTourGuideSlider from "./ReactTourGuideSlider";
import PostCard from "./PostCard";
import Typography from '@material-ui/core/Typography';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userid : null,
            isRender: false
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        this.setState({userid: user.id}, () => {
            this.setState(function(state, props) {
                return {
                    isRender: true
                }});
        });
    }

    render() {
        if (!this.state.isRender) {
            return(
                <div>loading...</div>
            )
            
        } else
        return (
            <div>
                <Grid container spacing={3}>
                        
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={12}>
                    <Paper>
                        <HeaderSlider />
                        {/* <ReactTourGuideSlider /> */}
                    </Paper>
                    </Grid>
                    
                    <SingleRow
                        label="تعریفی ها"
                        footer="مشاهده بیشتر"
                        model="definitions"
                        linkToShowMore='/definitions'
                        count='3'
                    />

                    <SingleRow
                        label="تازه های فیزیک اپ"
                        footer="مشاهده بیشتر"
                        model="products"
                        linkToShowMore='/products'
                        count='3'
                    />

                   {(this.state.userid) ? <SingleRow
                        label="ادامه ی ویدیوهای قبلی"
                        footer="مشاهده بیشتر"
                        model="products"
                        linkToShowMore='/products'
                        count='3'
                        userid={this.state.userid}
                    /> : 
                    null
                    }
                    
                    
                    <SingleRow
                        label="چالش های علمی"
                        footer="مشاهده بیشتر"
                        model="sciencechallenge"
                        linkToShowMore='/sciencechallenge'
                        count='3'
                    />
                    
                    <SingleRow
                        label="تمرین ها"
                        footer="مشاهده بیشتر"
                        model="exercises"
                        linkToShowMore='/exercises'
                        count='3'
                    />
                    
                    <SingleRow
                        label="درخواست ها"
                        footer="مشاهده بیشتر"
                        model="requests"
                        linkToShowMore='/requests'
                        count='3'
                    />
                    
                    <StickyFooter />
                </Grid>
            </div>
        );
    }
}

export default Home;