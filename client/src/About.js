import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import StickyFooter from "./StickyFooter";
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
                        
                            <Grid 
                                item 
                                xs={12} sm={12} md={12} lg={12} xl={12}
                                >
                                <p
                                    style={{
                                        fontFamily: 'IranSans',
                                        textAlign: 'right',
                                        fontSize: 'x-large',
                                        float: 'right',
                                        padding:'1px 25px'
                                    }}
                                    >
                                    پر واضح است که این روند میرود تا وضعیت تحصیلی و آموزشی و سواد جمعی را در کشور به خطر بیندازد
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{
                                textAlign: 'center'
                            }}>
                                <img 
                                    style={{
                                        padding: '31px 22px',
                                    }}
                                    alt="Cartoon of a multiple choice test with a book and pen." 
                                    src="https://cdn.kastatic.org/images/sat/sat.svg"></img>
                            </Grid>
                            
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                <Grid container spacing={0}>
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <p
                                        style={{
                                            fontFamily: 'IranSans',
                                            float: 'right',
                                            direction: 'rtl',
                                            fontWeight: '600',
                                            padding:'1px 25px'
                                        }}
                                        >
                                            در بعضی از دروس احتمالا مسیر یافتن گزینه ی صحیح همان خوب یادگرفتن موضوع باشد و تاثیری بر کیفیت آموزش آن درس نداشته باشد.
                                        </p>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <p
                                            style={{
                                                fontFamily:'IranSans',
                                                direction: 'rtl',
                                                fontSize: '14px',
                                                textAlign: 'justify',
                                                width: '79%',
                                                float: 'right',
                                                lineHeight: '1.9rem',
                                                padding:'1px 25px'
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
                        md={12}
                        sm={12}
                        xl={12}
                        xs={12}
                        style={{
                            backgroundImage: `url(https://cdn.kastatic.org/images/impact/featured.png)`,
                            height: '300px',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover'
                        }}
                        >
                    </Grid>

                    <Grid 
                        item
                        xs={12} sm={12} md={12} lg={12} xl={12}
                        style={{
                            backgroundColor:'#0c7f99',
                            textAlign: 'center'
                        }}
                        >

                            <Grid container spacing={0}>
                                
                                <Grid 
                                    item 
                                    xs={12} sm={12} md={4} lg={4} xl={4}
                                    >
                                    <img 
                                        style={{
                                            padding: '31px 22px',
                                        }}
                                        src="https://cdn.kastatic.org/images/impact/laptop.svg"
                                        
                                        />
                                </Grid>
                                
                                <Grid 
                                    item xs={12} sm={12} md={8} lg={8} xl={8}>
                                    <p
                                    style={{
                                        fontFamily: 'IranSans',
                                        color: 'white',
                                        width: '82%',
                                        direction: 'rtl', 
                                        position: 'relative',
                                        float: 'right',
                                        padding: '31px 22px',
                                        lineHeight: '2rem',
                                        textAlign: 'right'
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
                            <p
                                style={{
                                    fontFamily: 'IranSans_UltraLight',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    direction: 'rtl',
                                }}
                            >
                                گفتنیست درست است که هدف اصلی و اولویت ما یادگیری عمیق و مفهومیست
                            </p>
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <Typography
                                            style={{
                                                fontSize: '80px',
                                                fontWeight: 'bold',
                                                color: '#71B307',
                                                textAlign: 'center',
                                                padding: '18px 25px'
                                            }}
                                            >
                                            90%
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid item lg={12}>
                                    <Typography
                                            style={{
                                                fontFamily: 'IranSans_UltraLight',
                                                fontSize: '14px',
                                                textAlign: 'justify',
                                                padding: '10px',
                                                direction: 'rtl',
                                                lineHeight: '1.7rem'
                                            }}
                                            >
                                            تا هر دانش‌آموزی که به هر دلیلی در سر کلاس خوب مطلب‌ را نگرفته و حتی کسانی که اصلا دانش آموز نیستند ، بتوانند با علاقه و از صفر به یادگیری بپردازند و فیزیک را در حد دبیرستان و کنکور به خوبی فرابگیرند ، در این راه از تصاویر و انیمیشن ها  استفاده کرده ایم که مقداری از آنها از منابع گوناگون تهییه شده است.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <Typography
                                            style={{
                                                fontSize: '80px',
                                                fontWeight: 'bold',
                                                color: '#71B307',
                                                textAlign: 'center',
                                                padding: '18px 25px'
                                            }}
                                            >
                                            90%
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid item lg={12}>
                                    <Typography
                                            style={{
                                                fontFamily: 'IranSans_UltraLight',
                                                fontSize: '14px',
                                                textAlign: 'justify',
                                                padding: '10px',
                                                direction: 'rtl',
                                                lineHeight: '1.7rem'
                                            }}
                                            >
                                            تا هر دانش‌آموزی که به هر دلیلی در سر کلاس خوب مطلب‌ را نگرفته و حتی کسانی که اصلا دانش آموز نیستند ، بتوانند با علاقه و از صفر به یادگیری بپردازند و فیزیک را در حد دبیرستان و کنکور به خوبی فرابگیرند ، در این راه از تصاویر و انیمیشن ها  استفاده کرده ایم که مقداری از آنها از منابع گوناگون تهییه شده است.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <Typography
                                            style={{
                                                fontSize: '80px',
                                                fontWeight: 'bold',
                                                color: '#71B307',
                                                textAlign: 'center',
                                                padding: '18px 25px'
                                            }}
                                            >
                                            90%
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid item lg={12}>
                                    <Typography
                                            style={{
                                                fontFamily: 'IranSans_UltraLight',
                                                fontSize: '14px',
                                                textAlign: 'justify',
                                                padding: '10px',
                                                direction: 'rtl',
                                                lineHeight: '1.7rem'
                                            }}
                                            >
                                            تا هر دانش‌آموزی که به هر دلیلی در سر کلاس خوب مطلب‌ را نگرفته و حتی کسانی که اصلا دانش آموز نیستند ، بتوانند با علاقه و از صفر به یادگیری بپردازند و فیزیک را در حد دبیرستان و کنکور به خوبی فرابگیرند ، در این راه از تصاویر و انیمیشن ها  استفاده کرده ایم که مقداری از آنها از منابع گوناگون تهییه شده است.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12}>
                            <Typography
                                style={{
                                    fontFamily: 'IranSans_UltraLight',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    padding: '8px 0px'
                                }}
                                >
                                در این قسمت می توان متنی را در رابطه با این قسمت قرار داد
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
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
                                style={{ 
                                }}
                                >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid container spacing={0}>

                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                                            <p
                                                style={{
                                                    color:'white',
                                                    fontFamily:'IranSans',
                                                    textAlign: 'center',
                                                    marginTop:'90px'
                                                }}
                                            >آیا هنوز در فیزیک اپ ثبت نام نکرده اید؟</p>

                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <p
                                                style={{
                                                    textAlign: 'center'
                                                }}
                                                >
                                                    <Button 
                                                        href='/signup'
                                                        variant="contained"
                                                        color="secondary"
                                                        style={{
                                                            // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                                            border: 0,
                                                            fontFamily:'IranSans',
                                                            borderRadius: 3,
                                                            // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                                            color: 'white',
                                                            height: 48,
                                                            width:250,
                                                            padding: '0 30px',
                                                        }}
                                                        >
                                                ثبت نام
                                            </Button>
                                            </p>
                                            
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                            
                    </Grid>

                </Grid>
                <StickyFooter />
            </div>
            
        );
    }
}

export default About;