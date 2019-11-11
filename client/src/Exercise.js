import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ContentUserInteraction from "./ContentUserInteraction";
import StickyFooter from "./StickyFooter";
import SimpleTreeView from "./SimpleTreeView";
import ArticlesToolBox from "./ArticlesToolBox";
import Divider from '@material-ui/core/Divider';
import Tree2 from "./Tree2";

class Exercise extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            summary:{},
            tags: [],
            id: '',
            isRender : false,
            thumbnail: '',
            exerciseId: props.exerciseid,
            startTime: 8,
            userInteractionConfig : [
                {
                    type:'qa',
                    label:' پرسش و پاسخ',
                    model:'exercises'
                },
                {
                    type:'comment',
                    label:'نظرات',
                    model:'exercises'
                }
            ]
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        
        fetch(process.env.REACT_APP_API_URL+`exercises/${this.props.exerciseid}`, {
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
            })
            .then(response => response.json())
            .then(exercise => {
                this.setState(function(state, props) {
                    return {
                        summary: JSON.parse(JSON.stringify(exercise.summary)),
                        tags: JSON.parse(JSON.stringify(exercise.tags)),
                        thumbnail: exercise.thumbnail,
                        id: exercise.id,
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

    render () {
        return (
            <Grid container spacing={0} justify="center"> 
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} 
                        style={{
                            backgroundImage: `url(${this.state.thumbnail})`,
                            backgroundSize: 'cover',
                            height: '300px'
                        }}>
                        
                        <Typography
                            style={{
                                fontFamily: 'IranSans',
                                float: 'right',
                                marginTop: '16%',
                                marginRight: '5%',
                                fontSize: '22px',
                                borderBottom: 'solid'
                            }}
                        >
                            {this.state.summary.name}
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <Paper>
                            <ArticlesToolBox
                                model='definitions'
                                modelid={this.props.exerciseid}
                                token={this.state.token}
                                />
                            </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                            overflow:'hidden'
                        }}>
                        <Grid container spacing={1} justify="center" 
                            style={{
                                margin:0
                            }}
                        >
                            <Grid item xs={9} sm={4} md={4} lg={3} xl={3}>
                                <Paper>
                                    {/* <SimpleTreeView /> */}
                                    <Tree2 />
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={11} sm={7} md={7} lg={8} xl={8}>
                                <Paper
                                    style={{
                                        padding: '10px 37px'
                                    }}
                                >
                                    <Typography
                                        style={{
                                            direction: 'rtl',
                                            textAlign: 'justify',
                                            fontFamily:'IranSans',
                                            lineHeight: '2.5rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {this.state.summary.title}
                                    </Typography>
                                    <hr />
                                    <Typography
                                        style={{
                                            direction: 'rtl',
                                            textAlign: 'justify',
                                            fontFamily:'IranSans',
                                            lineHeight: '2.5rem',
                                            fontSize: '14px'
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

                                <Paper style={{direction:'rtl', textAlign:'right', margin: '10px 0px', padding: '10px 6px'}}>
                                    <Chip style={{fontFamily:'IranSans',fontSize:'14px'}} label="سرعت" component="a" href="#chip" clickable />
                                    <Chip style={{fontFamily:'IranSans',fontSize:'14px'}} label="جنبش مولکولی" component="a" href="#chip" clickable />
                                    <Chip style={{fontFamily:'IranSans',fontSize:'14px'}} label="انرژی" component="a" href="#chip" clickable />
                                    <Chip style={{fontFamily:'IranSans',fontSize:'14px'}} label="قانون پایستگی" component="a" href="#chip" clickable />
                                </Paper>

                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <ContentUserInteraction
                            config={this.state.userInteractionConfig}
                            modelid={this.state.definitionid}
                            />
                    </Grid>

                    <StickyFooter />

            </Grid>
        );
    }
}
export default Exercise;