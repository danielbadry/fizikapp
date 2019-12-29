import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import UploadComponent from './UploadComponent';

class UserBasics extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firstName : '',
            lastName: '',
            email:'',
            mobile:''
        };
    }

    componentDidMount() {
        let token = window.localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`users/userinfo`, {
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
        .then(userInfo => {
            this.setState((state, props) => {
                return {
                    firstName: userInfo.data.firstName,
                    lastName: userInfo.data.lastName,
                    mobile: userInfo.data.mobile,
                    email: userInfo.data.email,
                };
            });
        })
        ; // parses JSON response into native JavaScript objects     
    }

    handleChange = pr => event => {
        event.persist();
        this.setState({[pr]: event.target.value});
    };

    updateForm = () => {
        let data = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            mobile : this.state.mobile,
            email : this.state.email
        }
        let token = window.localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`users/updateuserinfo`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(data => {
            this.setState((state, props) => {
                return {
                    firstName: data.data.firstName,
                    lastName: data.data.lastName,
                    email: data.data.email,
                    mobile: data.data.mobile
                }
            }, () => {
                window.location.reload();
            });
        });
    }
    
    render() {
    
        return(
            <React.Fragment>
            <UploadComponent 
                type="thumbnail"
                model="users"
                />
            <Button
                    type="submit"
                    variant="contained"
                    component="button"
                    style={{ fontFamily: 'IranSans' }}
                    onClick={()=>{
                        let token = window.localStorage.getItem('token');
                        let data = {
                            thumbnail: window.localStorage.getItem('userThumbnail')
                        }
                        fetch(process.env.REACT_APP_API_URL+`users/updateuserinfo`, {
                            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                            mode: 'cors', // no-cors, cors, *same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': `Bearer ${token}`,
                            },
                            redirect: 'follow', // manual, *follow, error
                            referrer: 'no-referrer', // no-referrer, *client
                            body: JSON.stringify(data), // body data type must match "Content-Type" header
                        })
                        .then(response => response.json())
                        .then(userInfo => {
                            window.location.reload();
                            // this.setState((state, props) => {
                            //     return {userBasicInfo: userInfo.data};
                            // });
                        })
                        ;
                    }}
                >
                    ثبت تصویر جدید
                </Button> 
                <br />   
            {/* <form 
                noValidate 
                autoComplete="off"
                onSubmit={this.updateForm}
                > */}
                <TextField
                    id="standard-name"
                    label="نام"
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                    margin="normal"
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    InputProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                />
                <br />
                <TextField
                    id="standard-name"
                    label="نام خانوادگی"
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                    margin="normal"
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    InputProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                />
                <br />
                {/* <TextField
                    id="standard-name"
                    label="نام کاربری"
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    value={this.state.userName}
                    onChange={this.handleChange('userName')}
                    margin="normal"
                /> */}
                
                <TextField
                    id="standard-name"
                    label="ایمیل"
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                />
                <br />
                {/* <TextField
                    id="standard-name"
                    label="تلفن ثابت"
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    value={this.state.phone}
                    onChange={this.handleChange('phone')}
                    margin="normal"
                /> */}
                <TextField
                    id="standard-name"
                    label="موبایل"
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    value={this.state.mobile}
                    onChange={this.handleChange('mobile')}
                    margin="normal"
                />

                {/* <Select
                    // value={values.age}
                    // onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-simple',
                    }}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select> */}
                <br />
                <Select
                    // value={values.age}
                    // onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-simple',
                    }}
                    >
                    <MenuItem value={10}>دهم</MenuItem>
                    <MenuItem value={20}>یازدهم</MenuItem>
                    <MenuItem value={30}>دوازدهم</MenuItem>
                </Select>
                <br />
                <Button
                    type="submit"
                    variant="contained"
                    component="button"
                    style={{ fontFamily: 'IranSans' }}
                    onClick={this.updateForm}
                    // disabled={this.haveErrors(errors)}
                >
                    آپدیت اطلاعات
                </Button>
            {/* </form> */}
            </React.Fragment>
        );
    }
}

export default UserBasics;