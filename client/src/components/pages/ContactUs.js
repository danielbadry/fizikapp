import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import StickyFooter from "../header/footer/StickyFooter";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';

class ContactUs extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firstName : '',
            lastName : '',
            fullName : '',
            mobile : '',
            email : '',
            existingUser: false,
            message: '',
            userId: null
        }
    }

    componentDidMount() {
        let token = window.localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`users/userinfo`, {
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
            .then(user => {
                if (user.id) {
                    this.setState({
                        existingUser: true,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        mobile: user.mobile,
                        email: user.email,
                        userId: user.id,
                    });
                }
                
            });
    }
    
    handleChange = pr => event => {
      console.info(event.target.value);
      event.persist();
      this.setState((state, props) => {
          return {[pr]: event.target.value};
      });
  };

    insertCritisism = () => {
      console.info('state:', this.state);
        let data;
        if (this.state.existingUser) {
            data = {
                userId : this.state.userId,
                message: this.state.message,
                type: this.state.type
            }
        } else {
            data = {
                fullName : this.state.fullName,
                message: this.state.message,
                email: this.state.email,
                mobile: this.state.mobile,
                type: this.state.type
            }
        }
        
        fetch(process.env.REACT_APP_API_URL+`criticisms`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(result => {
                
            });
    }

    render() {
        
        return (
            <React.Fragment>
              <Grid 
                container 
                spacing={3} 
                alignContent="center" 
                alignItems="center"
                style={{
                    direction: 'rtl'
                }}
                >
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                    <Paper
                    style={{
                        direction : 'rtl',
                        paddingRight: '1%'
                    }}
                    >
                      <br />
                      <Typography
                        style={{
                          fontFamily: 'IranSans'
                        }}
                      >
                        دانش آموزان گرامی نظرات خود را با ما در میان بگذارید
                      </Typography>
                    <form noValidate autoComplete="off">
                <TextField
                    id="standard-fullname"
                    label="نام و نام خانوادگی"
                    // value={this.state.firstName + ' ' + this.state.lastName}
                    margin="normal"
                    disabled = {this.state.existingUser ? true : false}
                    onChange={this.handleChange('fullName')}
                    style={{
                      fontFamily: "IranSans",
                      display : 'block'
                    }}
                    InputProps={{
                      style: {
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      },
                    }}
                    InputLabelProps={{
                      style:{
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      }
                    }}
                />
            
                <TextField
                    id="standard-mobile"
                    label="شماره تلفن همراه"
                    disabled = {this.state.existingUser ? true : false}
                    value={this.state.mobile}
                    margin="normal"
                    onChange={this.handleChange('mobile')}
                    style={{
                      fontFamily: "IranSans",
                      display : 'block'
                    }}
                    InputProps={{
                      style: {
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      },
                    }}
                    InputLabelProps={{
                      style:{
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      }
                    }}
                />

                <TextField
                    id="standard-email"
                    label="ایمیل"
                    margin="normal"
                    value={this.state.email}
                    disabled = {this.state.existingUser ? true : false}
                    onChange={this.handleChange('email')}
                    style={{
                      fontFamily: "IranSans",
                      display : 'block'
                    }}
                    InputProps={{
                      style: {
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      },
                    }}
                    InputLabelProps={{
                      style:{
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      }
                    }}
                />

                <FormControl style={{
                  direction: 'rtl'
                }}>
                    <InputLabel 
                      id="demo-simple-select-label"
                      >
                        دسته بندی مرتبط را انتخاب کنید
                      </InputLabel>
                    <Select
                    MenuProps={{ style: { direction: 'rtl' } }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={1}
                        onChange={this.handleChange('type')}
                        >
                        <MenuItem value={1} style={{fontFamily:'IranSans', fontSize:'12px'}}>خرید یا فعال سازی اشتراک</MenuItem>
                        <MenuItem value={2} style={{fontFamily:'IranSans', fontSize:'12px'}}>مشکلات حساب کاربری</MenuItem>
                        <MenuItem value={3} style={{fontFamily:'IranSans', fontSize:'12px'}}>مشکل در تماشای فیلم</MenuItem>
                        <MenuItem value={4} style={{fontFamily:'IranSans', fontSize:'12px'}}>موارد محتوایی</MenuItem>
                        <MenuItem value={5} style={{fontFamily:'IranSans', fontSize:'12px'}}>سایر موضوعات</MenuItem>
                        <MenuItem value={6} style={{fontFamily:'IranSans', fontSize:'12px'}}>درخواست همکاری</MenuItem>
                        <MenuItem value={7} style={{fontFamily:'IranSans', fontSize:'12px'}}>پیشنهاد یا انتقاد</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    id="standard-multiline-static"
                    label="پیام خود را اینجا بنویسید"
                    multiline
                    rows="4"
                    defaultValue=""
                    onChange={this.handleChange('message')}
                    style={{
                      fontFamily: "IranSans",
                      display : 'block'
                    }}
                    InputProps={{
                      style: {
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      },
                    }}
                    InputLabelProps={{
                      style:{
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      }
                    }}
                    />
                <br />
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={this.insertCritisism}
                    style={{
                      fontFamily: 'IranSans'
                    }}
                    startIcon={<SendIcon />}
                    >
                      &nbsp;
                    ثبت نظر
                </Button>
                </form>    
                    </Paper>
                </Grid>
                
                
                </Grid>
                <StickyFooter />
            </React.Fragment>
        );
    }
}

export default ContactUs;