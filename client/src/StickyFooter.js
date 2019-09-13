import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },

  container: {
    width: '100%',
    fontFamily: 'IranSans_Light',
    backgroundColor: '#262626',
    color: 'aliceblue'
  },

  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },

  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },

  column: {
    float: 'left',
    width: '33.33%',
    padding: '10px',
    height: '300px'
  },

  row: {
    display: 'flex',
  },

  ul: {
      fontSize: '14px',
      direction: 'rtl',
      listStyleType: 'none',
      paddingRight: '10px'
  },

  columnHeader: {
      direction: 'rtl',
      color: '#e67e22',
      fontSize: '14px'
  },

  rowSingle: {
      width: '150px',
      display: 'inline-block'
  },

  svgIcons: {
    width: '35px',
    display: 'inline-block',
    height: '35px',
    margin: '8px',
    // backgroundColor: 'cadetblue',
    // borderRadius: '50%',
  }

}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <div className={classes.row}>
            <div 
                className={classes.column}
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
                className={classes.column} 
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
                    className={classes.button}
                    >
                    ارسال
                </Button>
            </div>
            <div 
                className={classes.column}
                style={{
                    width: '60%',
                    direction: 'rtl'
                }}
                >
                <div className={classes.rowSingle}>
                    <div className={classes.columnHeader}>بخش های اصلی سایت</div>
                    <ul className={classes.ul}>
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
                <div className={classes.rowSingle}>
                    <div className={classes.columnHeader}>آخرین تعریفی ها</div>
                    <ul className={classes.ul}>
                        <li>تعریفی شماره یک</li>
                        <li>تعریفی شماره دوم</li>
                        <li>تعریفی شماره سوم</li>
                        <li>تعریفی شماره چهارم</li>
                        <li>تعریفی شماره پنجم</li>
                        <li>تعریفی شماره ششم</li>
                        <li>تعریفی شماره هفتم</li>
                        <li>تعریفی شماره هشتم</li>
                        <li>تعریفی شماره نهم</li>
                        <li>تعریفی شماره دهم</li>
                    </ul>
                </div>
                <div className={classes.rowSingle}>
                    <div className={classes.columnHeader}>آخرین ویدیو ها</div>
                    <ul className={classes.ul}>
                        <li>ویدیو شماره یک</li>
                        <li>ویدیو شماره دوم</li>
                        <li>ویدیو شماره سوم</li>
                        <li>ویدیو شماره چهارم</li>
                        <li>ویدیو شماره پنجم</li>
                        <li>ویدیو شماره ششم</li>
                        <li>ویدیو شماره هفتم</li>
                        <li>ویدیو شماره هشتم</li>
                        <li>ویدیو شماره نهم</li>
                        <li>ویدیو شماره دهم</li>
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
                className={classes.svgIcons}
                style={{
                    backgroundImage:"url(gatsby.svg)"
                }}
            >
            </span>
            <span
                className={classes.svgIcons}
                style={{
                    backgroundImage:"url(facebook.svg)"
                }}
            >
            </span>
            <span
                className={classes.svgIcons}
                style={{
                    backgroundImage:"url(googlechrome.svg)"
                }}
            >
            </span>
            <span
                className={classes.svgIcons}
                style={{
                    backgroundImage:"url(googleplay.svg)"
                }}
            >
            </span>
            <span
                className={classes.svgIcons}
                style={{
                    backgroundImage:"url(googlepodcasts.svg)"
                }}
            >
            </span>
            <span
                className={classes.svgIcons}
                style={{
                    backgroundImage:"url(linkedin.svg)"
                }}
            >
            </span>
            <span
                className={classes.svgIcons}
                style={{
                    backgroundImage:"url(telegram.svg)"
                }}
            >
            </span>
            <span
                className={classes.svgIcons}
                style={{
                    backgroundImage:"url(twitter.svg)"
                }}
            >
            </span>
            <span
                className={classes.svgIcons}
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
  );
}