import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './sticky-footer.css';

class StickyFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            definitions: [],
            products: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:1337/definitions?limit=10`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(definitions => {
                this.setState((state, props) => {
                return {
                    definitions: definitions.data
                };
                });
            });

        fetch(`http://localhost:1337/products?limit=10`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
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
        
  return (
    <div className="container">
        <div className="row">
            <div 
                className="column"
                style={{
                    width: '20%'
                }}
                >
                <h2>fizik.app</h2>
                <p
                    style={{
                        fontFamily: 'IranSans_UltraLight',
                        fontSize: '12px',
                        textAlign: 'justify',
                        direction: 'rtl'
                    }}
                >رسالت ما تهیه و توزیع بهترین ویدیوهای آموزشی است که شما در هیچ کجای دیگر قادر به پیدا کردن آن نیستید</p>
            </div>
            <div 
                className="column" 
                style={{
                    width: '20%'
                }}>
                <TextField
                    id="standard-name"
                    label="تایتل"
                    // className={classes.textField}
                    // value={values.name}
                    // onChange={handleChange('name')}
                    margin="normal"
                />
                <TextField
                    id="standard-uncontrolled"
                    label="متن"
                    // defaultValue="foo"
                    // className={classes.textField}
                    margin="normal"
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    className="button"
                    >
                    ارسال
                </Button>
            </div>
            <div 
                className="column"
                style={{
                    width: '60%',
                    direction: 'rtl'
                }}
                >
                <div className="rowSingle">
                    <div className="columnHeader">بخش های اصلی سایت</div>
                    <ul className="ul">
                        <li>
                        <Link component={RouterLink} to="/about">
                            درباره ی ما
                        </Link>
                        </li>
                        <li>
                        <Link component={RouterLink} to="/careers">
                            فرصت های شغلی
                        </Link>
                        </li>
                        <li>
                        <Link component={RouterLink} to="/faq">
                            سوالات متداول
                        </Link>    
                            </li>
                        <li>
                        <Link component={RouterLink} to="/contact-us">
                            ارتباط با ما
                        </Link>
                            </li>
                        <li>
                        <Link component={RouterLink} to="/terms-conditions">
                            قوانین و مقررات
                        </Link>
                        </li>
                        <li>
                        <Link component={RouterLink} to="/privacy-policy">
                            حریم شخصی
                        </Link>
                        </li>
                        <li>
                        <Link component={RouterLink} to="/about">
                            اپلیکیشن Android
                        </Link>
                        </li>
                        <li>
                        <Link component={RouterLink} to="/about">
                            اپلیکیشن iOS
                        </Link>
                        </li>
                        <li>
                        <Link component={RouterLink} to="/disclaimer">
                            رفع مسوولیت
                        </Link>
                        </li>
                        <li>
                        <Link component={RouterLink} to="/about">
                            آموزش
                        </Link>
                        </li>
                    </ul>
                </div>

                <div className="rowSingle">
                    <div className="columnHeader">آخرین ویدیو ها</div>
                    <ul className="ul">
                        {this.state.definitions.map(
                            (item, index) => 
                        <li><Link component={RouterLink} to={`/product/${item.id}`}>{item.name}</Link></li>
                        )}  
                    </ul>
                </div>

                <div className="rowSingle">
                    <div className="columnHeader">آخرین ویدیو ها</div>
                    <ul className="ul">
                        {this.state.products.map(
                            (item, index) => 
                        <li><Link component={RouterLink} to={`/product/${item.id}`}>{item.name}</Link></li>
                        )}  
                    </ul>
                </div>

            </div>
        </div>
        <div
            style={{
                backgroundColor: '#333333',
                textAlign:"center"
            }}
            >
            <span
                className="svgIcons"
                style={{
                    backgroundImage:"url(gatsby.svg)"
                }}
            >
            </span>
            <span
                className="svgIcons"
                style={{
                    backgroundImage:"url(facebook.svg)"
                }}
            >
            </span>
            <span
                className="svgIcons"
                style={{
                    backgroundImage:"url(googlechrome.svg)"
                }}
            >
            </span>
            <span
                className="svgIcons"
                style={{
                    backgroundImage:"url(googleplay.svg)"
                }}
            >
            </span>
            <span
                className="svgIcons"
                style={{
                    backgroundImage:"url(googlepodcasts.svg)"
                }}
            >
            </span>
            <span
                className="svgIcons"
                style={{
                    backgroundImage:"url(linkedin.svg)"
                }}
            >
            </span>
            <span
                className="svgIcons"
                style={{
                    backgroundImage:"url(telegram.svg)"
                }}
            >
            </span>
            <span
                className="svgIcons"
                style={{
                    backgroundImage:"url(twitter.svg)"
                }}
            >
            </span>
            <span
                className="svgIcons"
                style={{
                    backgroundImage:"url(Yekan.svg)"
                }}
            >
            </span>
        </div>
        <div
            style={{
                textAlign: 'center',
                height: '40px',
                fontSize: '13px'
            }}
            >
            <span>1398</span>
            <span 
                style={{
                    color:'red',
                    margin: '0 6px'
                }}
            >
                ❤
            </span>
            تهیه شده توسط تیم فیزیک اپ با   
            
        </div>
    </div>
  )};
}
export default StickyFooter;