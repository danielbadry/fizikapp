import React from 'react';
import MainHeader from "./MainHeader";
import RelatedProducts from "./RelatedProducts";
import Typography from '@material-ui/core/Typography';
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
  } from 'video-react';
import "../node_modules/video-react/dist/video-react.css"; // import css
import ContentUserInteraction from "./ContentUserInteraction";
import QuizComponent from './QuizComponent';
import Grid from '@material-ui/core/Grid';
import StickyFooter from "./StickyFooter";
import ArticlesToolBox from "./ArticlesToolBox";
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Chip from '@material-ui/core/Chip';

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            summary: {},
            token: null,
            tags: [],
            id: '',
            isRender : false,
            thumbnail: '',
            userCanSeeQuiz: true,
            userCanSeeVideo: true,
            videoInfoBoxDisplayType: 'flex',
            videoPlayerDisplayType: 'none',
            productId: props.productid,
            startTime: 8,
            userInteractionConfig : [
                {
                    type:'qa',
                    label:'پرسش و پاسخ',
                    model:'products'
                },
                {
                    type:'comment',
                    label:'نظرات',
                    model:'products'
                }
            ]
        }
    };

    catchMeHere = () => {
        this.fetchProduct();
    }

    switchBetweenVideo = () => {
        this.setState(function(state, props) {
            return {
                videoInfoBoxDisplayType: 'none',
                videoPlayerDisplayType: 'block',
            };
          });
    }

    fetchProduct = (token) => {
        fetch(process.env.REACT_APP_API_URL+`products/${this.state.productId}`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(product => {
                this.setState(function(state, props) {
                    return {
                        summary: JSON.parse(JSON.stringify(product.summary)),
                        tags: JSON.parse(JSON.stringify(product.tags)),
                        thumbnail: product.thumbnail,
                        id: product.id,
                        startTime : 30,
                        isRender: true
                    };
                  }, () => {
                    this.setState(function(state, props) {
                        return {
                            isRender: true
                        }});
                  });
            });
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        this.setState(function(state, props) {
            return {
                token: token
            }});
        this.fetchProduct(token);  

    }
    
    render() {
        if (!this.state.isRender) {
            return(
                <div>loading...</div>
            )
            
        } else
        return (
            
                <Grid container spacing={0}>
                    
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} 
                    style={{
                        backgroundImage: `url('https://www.filimo.com/public/public/user_data/movie_cover/cover_26503.jpg?8235')`,
                        backgroundSize: 'cover',
                        height: '520px',
                        overflow: 'hidden'
                    }}>
                        <Grid container spacing={2} justify="center" >
                            
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                <Paper
                                    style={{
                                        background:'rgba(82,82,82,.43)',
                                        height: '400px'
                                    }}
                                    >
                                    hello
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                                <Grid container spacing={0} >
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Grid container spacing={0} style={{display:`${this.state.videoPlayerDisplayType}`}}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Player
                                                poster={this.state.thumbnail}
                                                startTime = {this.state.startTime}
                                                style={{
                                                    height: '200px'
                                                }}
                                                >
                                                    
                                            <source 
                                                src={this.state.summary.videoAddress}
                                                />

                                            <ControlBar>
                                                <ReplayControl seconds={10} order={1.1} />
                                                <ForwardControl seconds={10} order={1.2} />
                                                <CurrentTimeDisplay order={4.1} />
                                                <TimeDivider order={4.2} />
                                                <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                                                <VolumeMenuButton />
                                            </ControlBar>
                                            </Player>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={0} style={{display:`${this.state.videoInfoBoxDisplayType}`}}>
                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <Grid container spacing={0} style={{
                                                    direction: 'rtl',
                                                    fontFamily: 'IranSans'
                                                }}>

                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: '#fff',
                                                        fontSize: '15px'
                                                    }}>
                                                        پرونده کولینی
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: '#fff',
                                                        fontSize: '13px'
                                                    }}>
                                                        The Collini Case
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        IMDB
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: '#fdc13c',
                                                        fontSize: '14px'
                                                    }}>
                                                        مناسب برای بالای 17 سال
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: 'white',
                                                        fontSize: '14px'
                                                    }}>
                                                        کارگردان ایمان ارقامی
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: 'white',
                                                        fontSize: '14px'
                                                    }}>
                                                        مدت زمان یک ساعت و چند دقیقه
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                        color: 'white',
                                                        fontSize: '14px'
                                                    }}>
                                                        زیر نویس دارد
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Chip style={{fontFamily:'IranSans',fontSize:'14px'}} label="سرعت" component="a" href="#chip" clickable />
                                                        <Chip style={{fontFamily:'IranSans',fontSize:'14px'}} label="جنبش مولکولی" component="a" href="#chip" clickable />
                                                        <Chip style={{fontFamily:'IranSans',fontSize:'14px'}} label="انرژی" component="a" href="#chip" clickable />
                                                        <Chip style={{fontFamily:'IranSans',fontSize:'14px'}} label="قانون پایستگی" component="a" href="#chip" clickable />
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <img src="https://www.filimo.com/public/public/user_data/video_thumb_star/14/26503_26503-m.jpg?8235" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                        margin: '16px 0px',
                                        backgroundColor: 'blanchedalmond'
                                    }}>
                                        
                                        <Fab variant="extended" aria-label="like" style={{
                                                fontFamily: 'IranSans'
                                            }}
                                            onClick={this.switchBetweenVideo}
                                            >
                                            <NavigationIcon />
                                            نمایش فیلم
                                        </Fab>
                                        
                                        <Fab variant="extended" aria-label="like" style={{
                                                fontFamily: 'IranSans'
                                            }}>
                                            <NavigationIcon />
                                            نشان کردن
                                        </Fab>
                                        
                                        <Fab variant="extended" aria-label="like" style={{
                                                fontFamily: 'IranSans'
                                            }}>
                                            <NavigationIcon />
                                            لطفا لاگین کنید
                                        </Fab>
                                        
                                        <Fab variant="extended" aria-label="like" style={{
                                                fontFamily: 'IranSans'
                                            }}>
                                            <NavigationIcon />
                                            لطفا شارژ کنید
                                        </Fab>

                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <ArticlesToolBox
                            model='products'
                            modelid={this.props.productid}
                            token={this.state.token}
                            />
                    </Grid>

                    <Grid container spacing={1} justify="center">
                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <Paper>
                                <RelatedProducts />
                            </Paper>
                        </Grid>
                       
                    <Grid item xs={7}>
                        <Paper
                            style = {{
                                fontFamily: 'IranSans_Light',
                                direction: 'rtl',
                                textAlign: 'justify',
                                padding: '3%',
                                // margin: '1%'
                            }}
                            >
                            <Typography
                                style = {{
                                    fontFamily: 'IranSans_Light',
                                    fontWeight: 'bold',
                                    
                                }}
                                >
                                توضیحات :
                            </Typography>
                            <Typography 
                                variant="span" 
                                gutterBottom
                                style={{ 
                                    fontFamily: 'IranSans_Light',
                                    fontSize: '14px',
                                    lineHeight: '1.8rem'
                                }}
                                >
                                {/* {this.state.summary.description} */}
                                <p>
                                فیزیک اپ  با تاکید بر احترامی که برای حریم شخصی کاربران قائل است، برای خرید، ثبت نظر یا استفاده از برخی امکانات وب‌سایت اطلاعاتی را از کاربران درخواست می‌کند تا بتواند خدماتی امن و مطمئن را به کاربران ارائه دهد. برای پردازش و ارسال سفارش، اطلاعاتی مانند آدرس، شماره تلفن و ایمیل مورد نیاز است و از آنجا که کلیه فعالیت‌های دیجی‌کالا قانونی و مبتنی بر قوانین تجارت الکترونیک صورت می‌گیرد و طی فرایند خرید، فاکتور رسمی و بنا به درخواست مشتریان حقوقی گواهی ارزش افزوده صادر می‌شود، از این رو وارد کردن اطلاعاتی مانند نام و کد ملی برای اشخاص حقیقی یا کد اقتصادی و شناسه ملی برای خریدهای سازمانی لازم است.
                            یادآوری می‌شود آدرس ایمیل و تلفن‌هایی که مشتری در پروفایل خود ثبت می‌کند، تنها آدرس ایمیل و تلفن‌های رسمی و مورد تایید مشتری است و تمام مکاتبات و پاسخ‌های شرکت از طریق آنها صورت می‌گیرد.
                                </p>

                                <p>
                                بنابراین درج آدرس، ایمیل و شماره تماس‌های همراه و ثابت توسط مشتری، به منزله مورد تایید بودن صحت آنها است و در صورتی که موارد فوق به صورت صحیح یا کامل درج نشده باشد، دیجی‌کالا جهت اطمینان از صحت و قطعیت ثبت سفارش می‌تواند از مشتری، اطلاعات تکمیلی و بیشتری درخواست کند.
                                </p>

                                <p>    
                                مشتریان می‌توانند نام، آدرس و تلفن شخص دیگری را برای تحویل گرفتن سفارش وارد کنند و دیجی‌کالا تنها برای ارسال همان سفارش، از این اطلاعات استفاده خواهد کرد.
                                همچنین فیزیک اپ ممکن است برای ارتباط با مشتریان، بهینه‌سازی محتوای وب‌سایت و تحقیقات بازاریابی از برخی اطلاعات استفاده کند و برای اطلاع‌رسانی رویدادها و اخبار، خدمات و سرویس‌های ویژه یا پروموشن‌ها، برای اعضای وب‌سایت ایمیل یا پیامک ارسال نماید. در صورتی که کاربران تمایل به دریافت اینگونه ایمیل‌ها و پیامک‌ها نداشته باشند، می‌توانند عضویت دریافت خبرنامه فیزیک اپ را در پروفایل خود لغو کنند. 
                                عدم اقدام جهت لغو، به منزله ی موافقت ضمنی با دریافت ایمیل‌ها و پیام‌ها و سلب حق اعتراض می‌باشد.
                                </p>

                                <p
                                style={{
                                    backgroundColor: '#fffde4',
                                    border: '1px solid #f6e8a1',
                                    color: '#a37731',
                                    padding: '9px',
                                    fontSize: '14px',
                                    width: '80%',
                                    lineHeight: '1.7rem',
                                    textAlign: 'justify',
                                    marginRight: '10%'
                                }}
                                >
                                توجه داشته باشید که 300061930000 و 100061930000 شماره‌هایی است که فیزیک اپ از طریق آن برای کاربران و مشتریان خود پیامک (اس‌ام‌اس) ارسال می‌کند. همچنین این شماره‌‌ها، سامانه ارسال پیامک است که وضعیت پردازش سفارش یا رویدادها، خدمات و سرویس‌های ویژه فیزیک اپ را به اطلاع کاربران می‌رساند و روشن است که امکان دریافت پیام‌های شما از طریق آن وجود ندارد.
                                همچنین ممکن است فیزیک اپ از طریق شماره 300061930002 برای برخی کاربران یا مشتریان خود، سوال نظرسنجی ارسال کند.
                                </p>

                                <p>
                                بنابراین ارسال هرگونه پیامک تحت عنوان فیزیک اپ با هر شماره دیگری تخلف و سوء استفاده از نام فیزیک اپ است و در صورت دریافت چنین پیامکی، لطفاً جهت پیگیری قانونی آن را به Info@fizik.app اطلاع دهید.
                                فیزیک اپ ممکن است نقد و نظرهای ارسالی کاربران را در راستای رعایت قوانین وب سایت ویرایش کند. همچنین اگر نظر یا پیام ارسال شده توسط کاربر، مشمول مصادیق محتوای مجرمانه باشد، فیزیک اپ می‌تواند از اطلاعات ثبت‌شده برای پیگیری قانونی استفاده کند. 
                                </p>

                                <p>
                                کاربران ضمن استفاده از خدمات وب‌سایت فیزیک اپ حق ویرایش اطلاعات و استفاده از آنها را در چارچوب فوق‌الذکر به دیجی‌کالا اعطا نموده و حق اعتراض را از خود سلب می‌نمایند.                            باید تاکید شود که حفظ و نگهداری رمز عبور و نام کاربری بر عهده کاربران است و لذا برای جلوگیری از هرگونه سواستفاده احتمالی، کاربران نباید آن اطلاعات را برای شخص دیگری فاش کنند. در صورتی که کاربر شماره همراه خود را به فردی دیگر واگذار کرد، جهت جلوگیری از سواستفاده یا مشکلات احتمالی کاربران باید شماره موبایل خود را در پروفایل تغییر داده و شماره جدیدی ثبت نمایند.
                                </p>

                                <p>
                                مسئولیت هرگونه خسارت احتمالی که ناشی از عدم رعایت موارد فوق‌الذکر توسط کاربر باشد، با خود کاربر بوده وکاربر حق هر گونه ادعا علیه فیزیک اپ را از خود سلب می‌کند. فیزیک اپ هویت شخصی کاربران را محرمانه می‌داند و اطلاعات شخصی آنان را به هیچ شخص یا سازمان دیگری منتقل نمی‌کند، مگر اینکه با حکم مقام قضایی یا اداری صالحه یا طبق قوانین و مقررات رایج کشور موظف باشد در اختیار مراجع ذی‌صلاح قرار دهد.در این موارد هیچ گونه مسئولیت قانونی مبنی بر جبران خسارت برای فیزیک اپ وجود ندارد و کاربران با اعلام رضایت خود در استفاده از خدمات وب سایت ضمنا حق هرگونه اعتراض را از خود سلب نموده اند.
                                همچنین بدین وسیله به اطلاع کاربران رسانده می‌شود که فیزیک اپ همانند سایر وب‌سایت‌ها از جمع‌آوری IP و کوکی‌ها استفاده می‌کند، اما پروتکل، سرور و لایه‌های امنیتی دیجی‌کالا و روش‌های مناسب مدیریت داده‌ها حداکثر تلاش را به عمل می‌آورد که اطلاعات کاربران را محافظت و از دسترسی‌های غیرقانونی جلوگیری کند. طبیعتا مسئولیت هرگونه سواستفاده به شخص یا اشخاص متخلف مربوط بوده و فیزیک اپ حق اعتراض و پیگیری را از طریق قانونی بنابر صلاحدید خود محفوظ می‌دارد.
                                </p>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Paper
                                    style= {{
                                        direction: 'rtl'
                                    }}
                                    >
                                    <Typography
                                    style={{ fontFamily: 'IranSans_Light' }}
                                    >
                                        {this.state.summary.title}
                                    </Typography>
                                    <Typography 
                                        gutterBottom
                                        style={{ fontFamily: 'IranSans_Light' }}
                                        >
                                        {this.state.summary.jalaaliUserFriendlyCreatedDate}
                                    </Typography>
                                    
                                    {(localStorage.getItem('token') && this.state.userCanSeeQuiz) ? 
                                        <QuizComponent
                                            endFunc={this.catchMeHere}
                                            model='products'
                                            modelid={this.props.productid}
                                            title={this.state.summary.name}
                                    />
                                    :null}

                                        {(localStorage.getItem('token') && !this.state.userCanSeeQuiz) ? 
                                        <React.Fragment>
                                            <div>شارژ نداری</div>
                                            <QuizComponent
                                                endFunc={this.catchMeHere}
                                                model='products'
                                                modelid={this.props.productid}
                                                title={this.state.summary.name}
                                                userCanSeeQuiz = {false}
                                            />
                                        </React.Fragment>
                                        :null}

                                    {(!localStorage.getItem('token')) ? 
                                        <div>لاگین کنید</div>
                                    :null}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    <ContentUserInteraction
                        config={this.state.userInteractionConfig}
                        modelid={this.state.productId}
                        />
                    </Grid>
                    </Grid>
                    
                    <StickyFooter />
                </Grid>

        );
    }
}
export default Product;