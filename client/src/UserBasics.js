import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

class UserBasics extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userBasicInfo : {}
        };
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        fetch(process.env.REACT_APP_API_URL+`users/${user.id}`, {
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
        .then(userInfo => {
            this.setState((state, props) => {
                return {userBasicInfo: userInfo};
            });
        })
        ; // parses JSON response into native JavaScript objects     
    }

    handleChange = pr => event => {
        event.persist();
        this.setState({userBasicInfo:{...this.state.userBasicInfo, [pr]: event.target.value}});
        console.info(this.state);
    };

    updateForm = (event) => {
        event.preventDefault();
        let user = JSON.parse(localStorage.getItem('userInfo'));
        fetch(process.env.REACT_APP_API_URL+`users/${user.id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(this.state.userBasicInfo), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(userInfo => {
            this.setState((state, props) => {
                return {userBasicInfo: userInfo};
            });
        })
        ;
    }
    
    render() {
    
        return(
            <form 
                noValidate 
                autoComplete="off"
                onSubmit={this.updateForm}
                >
                <TextField
                    id="standard-name"
                    label="نام"
                    value={this.state.userBasicInfo.firstName}
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
                <TextField
                    id="standard-name"
                    label="نام خانوادگی"
                    value={this.state.userBasicInfo.lastName}
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
                <TextField
                    id="standard-name"
                    label="نام کاربری"
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    value={this.state.userBasicInfo.userName}
                    onChange={this.handleChange('userName')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="کلمه عبور"
                    value={this.state.userBasicInfo.password}
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="ایمیل"
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    value={this.state.userBasicInfo.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="تلفن ثابت"
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    value={this.state.userBasicInfo.phone}
                    onChange={this.handleChange('phone')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="موبایل"
                    InputLabelProps={{
                        style: {
                            fontFamily: "IranSans"
                        }
                    }}
                    value={this.state.userBasicInfo.mobile}
                    onChange={this.handleChange('mobile')}
                    margin="normal"
                />

                <Select
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
                </Select>
                
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

                <Button
                    type="submit"
                    variant="contained"
                    component="button"
                    style={{ fontFamily: 'IranSans' }}
                    // disabled={this.haveErrors(errors)}
                >
                    ذخیره
                </Button>

            </form>
        );
    }
}

export default UserBasics;