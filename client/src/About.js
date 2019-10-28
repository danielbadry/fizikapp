import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import StickyFooter2 from "./StickyFooter2";
import HeaderSlider from "./HeaderSlider";
import SocialShare from "./SocialShare";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class About extends React.Component {
    render() {
        
        return (
            <div>
                <Grid container spacing={0}>

                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>

                    <Grid 
                        item
                        lg={12}
                        style={{
                            backgroundImage: `url(https://cdn.kastatic.org/images/impact/background.svg)`,
                            height: '300px'
                        }}
                        >
                        <h2
                        style={{
                            fontFamily: 'IranSans',
                            color: 'white',
                            width: '50%',
                            direction: 'rtl',
                            marginRight: '25%',
                            position: 'relative',
                            marginLeft: '25%',
                            lineHeight: '3rem',
                            marginTop: '7%'
                        }}
                        >
                        مدتیست داغ شدن کنکور ارزش فراگیری عمیق دروس را کم کرده ، و باعث شده دانش آموزان فقط به زدن گزینه ی صحیح بسنده کنند .
                        </h2>
                    </Grid>
                    
                    <Grid item lg={12}>
                        <Grid container spacing={0}>

                            <Grid item lg={12}>
                                <p
                                    style={{
                                        fontFamily: 'IranSans',
                                        textAlign: 'right',
                                        fontSize: 'x-large',
                                        width: '50%',
                                        float: 'right'
                                    }}
                                    >
                                    پر واضح است که این روند میرود تا وضعیت تحصیلی و آموزشی و سواد جمعی را در کشور به خطر بیندازد
                                </p>
                            </Grid>

                            <Grid item lg={4}>
                                <img alt="Cartoon of a multiple choice test with a book and pen." src="https://cdn.kastatic.org/images/sat/sat.svg"></img>
                            </Grid>
                            
                            <Grid item lg={8}>
                                <Grid container spacing={0}>
                                    
                                    <Grid item lg={12}>
                                        <p
                                        style={{
                                            fontFamily: 'IranSans',
                                            float: 'right',
                                            direction: 'rtl',
                                            fontWeight: '600'
                                        }}
                                        >
                                            در بعضی از دروس احتمالا مسیر یافتن گزینه ی صحیح همان خوب یادگرفتن موضوع باشد و تاثیری بر کیفیت آموزش آن درس نداشته باشد.
                                        </p>
                                    </Grid>
                                    <Grid item lg={12}>
                                        <p
                                            style={{
                                                fontFamily:'IranSans',
                                                direction: 'rtl',
                                                fontSize: '14px',
                                                textAlign: 'justify',
                                                width: '79%',
                                                float: 'right',
                                                lineHeight: '1.9rem'
                                            }}
                                            >
                                        ولی هر چه درس مفهومی تر ، تحلیلی تر و نیاز به کار و تمرین بیشتر داشته باشد، تمرکز کردن بر روی یافتن گزینه ی صحیح ، دانش آموز را از عمیق و با کیفیت یاد گرفتن مطلب دور میکند. سر دسته ی این دروس "فیزیک" است !!! 
شاید باور اینکه درس " فیزیک " بر خلاف باور عموم از ریاضی هم در این خصوص پیشی‌ میگیرد، سخت باشد ؛ چرا که ریاضی علی رغم تکنیک و تحلیل بسیار زیادی که دارد ، نهایتا در دنیای دو بعدی کاغذ و دفتر خلاصه میشود ، در حالی که فیزیک را هر‌روز و همه وقت و همه جا در زندگیمان تجربه میکنیم و با آن سروکار داریم   میشه گفت بشر ریاضی را برای تحلیل قوانین طبیعت اختراع کرده ، به عبارتی ریاضیات  یک جعبه ابزار است در دست فردی مکانیک به اسم "فیزیک".
                                        </p>

                                    </Grid>

                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </Grid>

                    <Grid 
                        item
                        lg={12}
                        style={{
                            backgroundImage: `url(https://cdn.kastatic.org/images/impact/featured.png)`,
                            height: '300px',
                            backgroundSize: 'cover'
                        }}
                        >
                    </Grid>

                    <Grid 
                        item
                        lg={12}
                        style={{
                            backgroundColor:'#0c7f99',
                            height:'300px'
                        }}
                        >

                            <Grid container spacing={0}>
                                
                                <Grid item lg={4}>
                                    <img src="https://cdn.kastatic.org/images/impact/laptop.svg" />
                                </Grid>
                                
                                <Grid item lg={8}>
                                    <p
                                    style={{
                                        fontFamily: 'IranSans',
                                        color: 'white',
                                        width: '82%',
                                        direction: 'rtl',
                                        // marginRight: '25%',
                                        position: 'relative',
                                        float: 'right',
                                        // lineHeight: '3rem',
                                        // marginTop: '7%' 
                                    }}
                                    >
                                        آموزش غیر مفهومی درس فیزیک نه تنها دانشمندان علوم پایه ، بلکه تمام مهندسان در تمامی‌گرایش ها  و حتی پزشکان را مورد تهدید قرار میدهد.
                                        چرا که همانطور که گفته شد فیزیک را میتوان علم مادر در نظر گرفت 
                                        هر چه درک شهودی ما از این علم غنی تر باشد ، در رشته ای که در آن تخصص داریم مهارت و کیفیت بیشتری خواهیم داشت .
                                        این دغدغه ما را بر آن داشت که در راه هرچه گویا تر کردن مطالب بکوشیم ، نهایت تلاش را کرده ایم تا تکنیک ELI 5 را پیاده سازی کنیم 
                                        </p>
                                </Grid>

                            </Grid>

                    </Grid>

                    <Grid item lg={12}>
                        <Grid item lg={12}>
                            Khan Academy is the leading online learning resource used and trusted by US teachers and students.
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item lg={4}>
                                <Grid container spacing={0}>
                                    <Grid item lg={12}>
                                        <Typography
                                            style={{
                                                fontSize: '80px',
                                                fontWeight: 'bold',
                                                color: '#71B307'
                                            }}
                                            >
                                            90%
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid item lg={12}>
                                    <Typography
                                            style={{
                                                fontFamily: 'IranSans_UltraLight'
                                            }}
                                            >
                                            توضیحاتش
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={4}>
                                90%
                            </Grid>
                            <Grid item lg={4}>
                                90%
                            </Grid>
                        </Grid>
                        <Grid item lg={12}>
                            <Typography
                                style={{
                                    fontFamily: 'IranSans_UltraLight'
                                }}
                                >
                                در این قسمت می توان متنی را در رابطه با این قسمت قرار داد
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item lg={12}
                        style={{
                            height:'300px',
                            backgroundImage: `url(https://cdn.kastatic.org/images/impact/bg-cta.svg)`,
                        }}
                        >

                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                                style={{ minHeight: '87vh' }}
                                >
                                <Grid item lg={3}>
                                    <Grid container spacing={0}>

                                        <Grid item lg={12}>
                                            <div
                                                style={{
                                                    color:'white',
                                                    fontFamily:'IranSans'
                                                }}
                                                >آیا هنوز در فیزیک اپ ثبت نام نکرده اید؟</div>
                                            <div
                                                style={{
                                                    color:'white',
                                                    fontFamily:'IranSans'
                                                }}
                                            >آیا هنوز در فیزیک اپ ثبت نام نکرده اید؟</div>
                                        </Grid>

                                        <Grid item lg={12}>
                                            <Button 
                                                variant="outlined"
                                                style={{
                                                    fontFamily:'IranSans'
                                                }}
                                                >
                                                ثبت نام
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                            
                    </Grid>

                </Grid>
            </div>
            
        );
    }
}

export default About;