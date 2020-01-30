import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import LocalPhone from '@material-ui/icons/LocalPhone';

class StickyFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            definitions: [],
            products: []
        }
    }

    componentDidMount() {

        fetch(process.env.REACT_APP_API_URL+`definitions?limit=10`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            })
            .then(response => response.json())
            .then(definitions => {
                this.setState((state, props) => {
                return {
                    definitions: definitions.data
                    };
                });
            });

        fetch(process.env.REACT_APP_API_URL+`products?limit=10`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            })
            .then(response => response.json())
            .then(products => {
                this.setState((state, props) => {
                return {
                    products: products.data
                    };
                });
            });    
    }

    render() {
        return(
            <Grid container
                style={{
                    backgroundColor:'#262626',
                }}
                >
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={0}>
                    
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}
                            style={{
                                direction:'rtl'
                            }}
                            >
                            <dl
                            style={{
                                marginRight:'15px'
                            }}
                            >
                            <dt
                                    style={{
                                        fontFamily: 'IranSans',
                                        fontSize: '14px',
                                        color:'#e67e22',
                                        borderBottom:'solid 1px #333333',
                                        paddingBottom: '9px',
                                        marginBottom: '13px',
                                        width:'80%'
                                    }}>ارتباط با ما</dt>
                                <Grid container justify="center" spacing={0}
                                    style={{
                                        direction:'rtl',
                                        marginBottom:'4%'
                                    }}
                                    >
                                    <Grid item md={4}>
                                        <LocalPhone
                                        style={{
                                            backgroundColor:'#333333',
                                            padding:'20px',
                                            borderRadius:'3px',
                                            width:'3em',
                                            height:'3em',
                                            color:'rgb(38, 38, 38)'
                                        }}
                                        />
                                    </Grid>
                                    <Grid item md={4}>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                            واحد فروش
                                        </Grid>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                            واحد پشتیبانی
                                        </Grid>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                            طراحی و توسعه
                                        </Grid>
                                    </Grid>
                                    <Grid item md={4}>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                            ٠٢١٢٨٣١١
                                        </Grid>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                        ٢٨٣١٢٠٢١
                                        </Grid>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                        ٢٨٣١٢٠٢١
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                                <Grid container justify="center" spacing={0}
                                    style={{
                                        direction:'rtl'
                                    }}
                                    >
                                    <Grid item md={4}>
                                        <ShoppingCart
                                        style={{
                                            backgroundColor:'#333333',
                                            padding:'20px',
                                            borderRadius:'3px',
                                            width:'3em',
                                            height:'3em',
                                            color:'rgb(38, 38, 38)'
                                        }}
                                        />
                                    </Grid>
                                    <Grid item md={4}>

                                    <img 
                                        id = 'jxlzfukzapfuesgtwlaonbqe' 
                                        style = {{
                                            cursor: 'pointer'
                                        }} 
                                        onClick = {()=>window.open("https://logo.samandehi.ir/Verify.aspx?id=165042&p=rfthgvkadshwobpdaodsuiwk", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")}//window.open('https://www.google.com')}
                                        alt = 'logo-samandehi'
                                        src = 'https://logo.samandehi.ir/logo.aspx?id=165042&p=nbpdwlbqujynlymashwlodrf' 
                                        />
                                        {/* <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                            فروش
                                        </Grid>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                         پشتیبانی
                                        </Grid>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                            مدیریت
                                        </Grid> */}
                                    </Grid>
                                    <Grid item md={4}>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                            ٠٢١٢٨٣١١
                                        </Grid>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                        ٢٨٣١٢٠٢١
                                        </Grid>
                                        <Grid style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                color:'white'
                                            }}>
                                        ٢٨٣١٢٠٢١
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </dl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}
                            style={{
                                direction:'rtl'
                            }}
                            >
                            <dl
                                style={{
                                    marginRight:'15px'
                                }}
                                >
                                <dt
                                    style={{
                                        fontFamily: 'IranSans',
                                        fontSize: '14px',
                                        color:'#e67e22',
                                        borderBottom:'solid 1px #333333',
                                        paddingBottom: '9px',
                                        marginBottom: '13px',
                                        width:'80%'
                                    }}
                                    >آخرین تعریفی ها</dt>
                                {this.state.definitions.map(
                                    (item, index) => (
                                        <dd
                                            key={item.id}
                                            style={{
                                                color:'white',
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2'
                                            }}
                                            >
                                                <Link 
                                                    color="inherit"
                                                    style={{
                                                        fontFamily: 'IranSans_Ultralight',
                                                        fontSize: '13px',
                                                        margin:'0',
                                                        lineHeight:'2'
                                                    }}
                                                    component={RouterLink} 
                                                    to={`/definition/${item.id}`}>{item.name}
                                                    </Link>
                                        </dd>
                                ))}
                            </dl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}
                            style={{
                                direction:'rtl'
                            }}
                            >
                            <dl
                                style={{
                                    marginRight:'15px'
                                }}
                                >
                                <dt
                                    style={{
                                        fontFamily: 'IranSans',
                                        fontSize: '14px',
                                        color:'#e67e22',
                                        borderBottom:'solid 1px #333333',
                                        paddingBottom: '9px',
                                        marginBottom: '13px',
                                        width:'80%'
                                    }}
                                    >آخرین ویدیو ها</dt>
                                {this.state.products.map(
                                    (item, index) => (
                                        <dd
                                            key={item.id}
                                            style={{
                                                color:'white',
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2'
                                            }}
                                            >
                                                <Link 
                                                    color="inherit"
                                                    style={{
                                                        fontFamily: 'IranSans_Ultralight',
                                                        fontSize: '13px',
                                                        margin:'0',
                                                        lineHeight:'2'
                                                    }}
                                                    component={RouterLink} 
                                                    to={`/product/${item.id}`}>{item.name}
                                                    </Link>
                                        </dd>
                                ))}
                            </dl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}
                            style={{
                                direction:'rtl'
                            }}
                            >
                            <dl
                                style={{
                                    marginRight:'15px'
                                }}
                                >
                                <dt
                                    style={{
                                        fontFamily: 'IranSans',
                                        fontSize: '14px',
                                        color:'#e67e22',
                                        borderBottom:'solid 1px #333333',
                                        paddingBottom: '9px',
                                        marginBottom: '13px',
                                        width:'80%'
                                    }}
                                    >سایت مپ</dt>
                                
                                <dd
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    >
                                        <Link 
                                            color="inherit"
                                            style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2'
                                            }}
                                            component={RouterLink} 
                                            to={`/`}>صفحه ی اصلی</Link>
                                            </dd>
                                
                                <dd
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    >
                                        <Link 
                                            color="inherit"
                                            style={{
                                                fontFamily: 'IranSans_Ultralight',
                                                fontSize: '13px',
                                                margin:'0',
                                                lineHeight:'2',
                                                cursor:'pointer'
                                            }}
                                            component={RouterLink} 
                                            to={`/about`}>
                                        درباره ی ما</Link>

                                        </dd>
                                
                                <dd
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    ><Link 
                                    color="inherit"
                                    style={{
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    component={RouterLink} 
                                    to={`/terms-conditions`}>قوانین و مقررات</Link></dd>
                                
                                <dd
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    ><Link 
                                    color="inherit"
                                    style={{
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    component={RouterLink} 
                                    to={`/privacy-policy`}>حریم شخصی</Link></dd>
                                
                                <dd
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    ><Link 
                                    color="inherit"
                                    style={{
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    component={RouterLink} 
                                    to={`/disclaimer`}>رفع مسئولیت</Link></dd>
                                
                                <dd
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    ><Link 
                                    color="inherit"
                                    style={{
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    component={RouterLink} 
                                    to={`/faq`}>سوالات متداول</Link></dd>
                                
                                <dd
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    ><Link 
                                    color="inherit"
                                    style={{
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    component={RouterLink} 
                                    to={`/shopping-plans`}>طرح های خرید</Link></dd>

                                <dd
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    >
                                        <Link 
                                    color="inherit"
                                    style={{
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    component={RouterLink} 
                                    to={`/signin`}>ورود</Link>
                                    </dd>    
                                
                                <dd
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    >
                                        <Link 
                                    color="inherit"
                                    style={{
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    component={RouterLink} 
                                    to={`/contact-us`}>ارتباط با ما</Link>
                                    </dd>    
                                
                            </dl>
                        </Grid>
                    
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <div
                        style={{
                            textAlign: 'center',
                            height: '40px',
                            fontSize: '13px',
                            fontFamily: 'IranSans',
                            color: 'white',
                            backgroundColor: '#333333'
                        }}
                        >
                        <span>1398</span>
                        <span 
                            style={{
                                color:'red',
                                margin: '0 6px',
                                lineHeight: '3'
                            }}
                        >
                            ❤
                        </span>
                        تهیه شده توسط تیم فیزیک اپ با   
                        
                    </div>
                </Grid>

            </Grid>
        )
        
    }

}
export default StickyFooter;