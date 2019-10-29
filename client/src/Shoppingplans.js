import React from 'react';
import ShoppingPlanCard from './ShoppingplanCard';
import MainHeader from "./MainHeader";
import Container from '@material-ui/core/Container';
import StickyFooter2 from "./StickyFooter2";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class Shoppingplans extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            shoppingplans: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`shoppingplans`, {
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
            // data: JSON.stringify({name:'milad'}), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(shoppingplans => {
                this.setState((state, props) => {
                    return {shoppingplans: shoppingplans.data};
                });
            });
    }

    render() {
        return (
            <div
            style={{
                background: 'url(https://www.filimo.com/_/assets/web/ui/img-nM32Gle1NLCorhcsZMAUTA/payments/bg.jpg) no-repeat fixed center/cover'
            }}
            >
                <MainHeader />
                <Grid 
                    container 
                    alignItems="center"
                    justify="center" 
                    spacing={0} 
                    style={{
                        fontFamily:'IranSans'
                    }}>
                    
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} 
                        style={{
                            textAlign:'center'
                        }}>
                        <img 
                            style={{
                                width:'120px',
                                padding: '40px 0px 0px 0px'
                            }}
                            src="https://www.filimo.com/_/assets/web/ui/img-nM32Gle1NLCorhcsZMAUTA/logos/fa-dark.png" />
                    </Grid>

                    <Grid item xs={12} sm={10} md={8} lg={8} xl={8}>
                        <Paper style={{
                            margin: '44px 30px'
                        }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                    textAlign:'center',
                                    fontWeight: 'bold',
                                    margin: '19px 0'
                                }}>
                                    خرید اشتراک فیزیک اپ
                                </Grid>
                                    {[1,2,3,4].map(
                                        (item, index) => 
                                        <Grid key={index} item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                            backgroundColor: '#fafafa',
                                            border: '1px solid #ededed',
                                            margin:'9px 10px',
                                            padding: '10px 3px',
                                            borderRadius: '3px'
                                        }}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{
                                                    color:'#19ab56',
                                                }}>
                                                    <KeyboardArrowLeftIcon />
                                                    
                                                    <Typography
                                                        style={{
                                                            display:'inline',
                                                            fontFamily:'IranSans',
                                                            color:'#19ab56',
                                                            fontSize:'14px'
                                                        }}
                                                        >
                                                        انتخاب و ادامه
                                                    </Typography>
                                                    
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                            fontSize: '14px',
                                                            fontWeight: '600'
                                                        }}>
                                                            اشتراک یک ماهه
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                                            display:'inline',
                                                            fontFamily:'IranSans',
                                                            color:'#19ab56',
                                                            fontSize:'14px'
                                                        }}>
                                                            25000 تومان
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                                    عکس
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                )}
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography 
                                        style={{
                                            fontFamily:'IranSans',
                                            fontSize:'14px',
                                            color:'#828282',
                                            fontWeight:'500',
                                            direction:'rtl',
                                            textAlign:'right',
                                            fontWeight: '700',
                                            padding: '15px 13px'
                                        }}>
                                        %9 مالیات بر ارزش افزوده به همه انواع اشتراک‌ها اضافه می‌شود
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                                    style={{
                                        backgroundColor: '#fbfbfd',
                                        padding: '30px 30px',
                                        marginTop: '10px',
                                        direction: 'rtl',
                                        textAlign: 'right',
                                        fontSize: '14px',
                                        
                                    }}>
                                        <dl>
                                            <dt style={{
                                                fontWeight: 'bold'
                                            }}>شما با داشتن اشتراک فیزیک اپ به امکانات زیر دسترسی دارید:</dt>
                                            <dd style={{
                                                fontSize: '14px',
                                                lineHeight: '2rem'
                                            }}>هزاران ساعت فیلم و سریال ایرانی و خارجیِ دوبله و زیرنویس شده</dd>
                                            <dd style={{
                                                fontSize: '14px',
                                                lineHeight: '2rem'
                                            }}>امکان دانلود فیلم به صورت درون برنامه‌ای، برای تماشای آفلاین و زمانی که اینترنت ندارید.</dd>
                                            <dd style={{
                                                fontSize: '14px',
                                                lineHeight: '2rem'
                                            }}>تماشای فیلم‌ها به صورت همزمان روی ۳ دستگاه (تلویزیون، کامپیوتر، گوشی یا تبلت)</dd>
                                            <dd style={{
                                                fontSize: '14px',
                                                lineHeight: '2rem',
                                                color:'#e09422'
                                            }}>شرایط حجم اینترنت رایگان تماشا و دانلود فیلم‌های فیزیک اپ</dd>
                                        </dl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                                    fontSize: '14px',
                                    direction: 'rtl',
                                    padding: '13px 14px'
                                }}>
                                    <img
                                        style={{
                                            width:'25px',
                                            height:'25px',
                                            margin:'0 8px'
                                        }} 
                                        src="https://www.filimo.com/_/assets/web/ui/img-nM32Gle1NLCorhcsZMAUTA/payments/invite-gift.png" />
                                    با هر بار خرید اشتراک‌ ماهانه، شما یک کد تخفیف به دلخواه و انتخاب خودتان از سایت‌های (دیجی کالا، اسنپ فود، فیدیبو، پلاک، سینماتیکت، تیوال و...) هدیه می‌گیرید.
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                </Grid>
                <StickyFooter2 />
            </div>
        );
    }

}

export default Shoppingplans;