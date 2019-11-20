import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

class UserSecurity extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <TextField
                    id="standard-name"
                    label="کلمه عبور فعلی"
                    // value={this.state.userBasicInfo.firstName}
                    // onChange={this.handleChange('firstName')}
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
                    label="کلمه عبور جدید"
                    // value={this.state.userBasicInfo.firstName}
                    // onChange={this.handleChange('firstName')}
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
                    label="تایید کلمه عبور جدید"
                    // value={this.state.userBasicInfo.firstName}
                    // onChange={this.handleChange('firstName')}
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

                <Button
                    type="submit"
                    variant="contained"
                    component="button"
                    style={{ fontFamily: 'IranSans' }}
                    // disabled={this.haveErrors(errors)}
                >
                    ذخیره
                </Button>
                <Typography>
                    شما در دستگاه های زیر لاگین هستید
                </Typography>
                
            </React.Fragment>
        )
    }
}
export default UserSecurity;