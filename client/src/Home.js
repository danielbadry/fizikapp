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
import NiceCard from "./NiceCard";
import Gerdali from "./Gerdali";
import EnjoyHint from "./EnjoyHint";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token : null,
            numberOfWatchedVideos : 0,
            stepsEnabled: true,
            initialStep: 0,
            steps: [
              {
                element: '.gerdali',
                intro: 'انتخاب کن کدوم میخوای در کدوم مقطع فیلم آموزشی ببینی',
              },
              {
                element: '.exerciseshelp',
                intro: 'حل تمامی تستهای 10 سال اخیر کنکور سراسری شامل رشته های ریاضی تجربی داخل و خارج کشور به تفکیک',
              },
              {
                element: '.definitionshelp',
                intro: 'شب امتحان میتونی به عنوان تمرین کاملترین منبع سوالات تعریفی و درک مطلب از اینجا استفاده کنی',
              },
              {
                element: '.beyondhelp',
                intro: 'اگر به فیزیک علاقه داری، اینجا موضوعات فراتر از کتاب درسی رو به بیانی ساده و جذاب توضیح دادیم',
              },
              {
                element: '.sciencechallengeshelp',
                intro: 'هر از گاهی ذهن با قراردادن معماهای جالب فیزیکی و احتمالا جایزه ای پشت بندش ذهن شما رو به چالش میکشیم',
              },
              {
                element: '.requestshelp',
                intro: 'هر سوالی مربوط به فیزیک داشتی از ما بپرس قول میدیم حداکثر تا یک روز بعدش جواب مناسب رو دریافت کنی',
              },
              {
                element: '.abouthelp',
                intro: 'میخوای بدونی چرا این سایت رو ساختیم',
              },
            ],
            hintsEnabled: true,
            hints: [
              {
                element: '.hello',
                hint: 'Hello hint',
                hintPosition: 'middle-right',
              }
            ]
        };
    }
    onExit = () => {
        this.setState(() => ({ stepsEnabled: false }));
      };
    componentDidMount() {
        let token = window.localStorage.getItem('token');
        // check if logged in user hase watched any video or not
        fetch(process.env.REACT_APP_API_URL+`watchedvideos`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(result => {
                this.setState(function(state, props) {
                    return {
                        numberOfWatchedVideos: result.dataLength
                    }});
            });

        this.setState(function(state, props) {
            return {
                token: localStorage.getItem("token")
            }});
    }

    render() {
        const { stepsEnabled, steps, initialStep, hintsEnabled, hints } = this.state;
        return (
            
            <React.Fragment>
                <Steps
                    enabled={false}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={this.onExit}
                    />
                    <Hints
                    enabled={false}
                    hints={hints}
                    />
                 <Container>
                    {/* <AdsPanel /> */}
                    {/* <NiceCard /> */}
                    <Gerdali 
                        
                    />
                   
                    <SingleRow
                        // className="hello"
                        label="تازه های فیزیک اپ"
                        footer=""
                        model="products"
                        linkToShowMore='products'
                        count='10'
                    />

                    {(this.state.token && (this.state.numberOfWatchedVideos > 0)) ? <SingleRow
                        label="ادامه ی ویدیوهای قبلی"
                        footer=""
                        model="watchedvideos"
                        linkToShowMore='/products'
                        count='4'
                        token={this.state.token}
                    /> : 
                    null
                    }

                    <SingleRow
                        label="چالش های علمی"
                        footer="مشاهده بیشتر"
                        model="sciencechallenge"
                        linkToShowMore='sciencechallenges'
                        count='10'
                    /> 
                    
                    {/* <SingleRow
                        label="تعریفی ها"
                        footer="مشاهده بیشتر"
                        model="definitions"
                        linkToShowMore='definitions'
                        count='10'
                    /> */}
                    
                    <SingleRow
                        label="فراتر از کتاب"
                        footer="مشاهده بیشتر"
                        model="beyondthebooks"
                        linkToShowMore='beyondthebook'
                        count='10'
                    />

                    <SingleRow
                        label="درخواست ها"
                        footer="مشاهده بیشتر"
                        model="requests"
                        linkToShowMore='requests'
                        count='10'
                    /> 

             </Container>
             <StickyFooter />
                
                    {/* <ReactTourGuideSlider /> */}
                    </React.Fragment>     
        );
    }
}

export default Home;