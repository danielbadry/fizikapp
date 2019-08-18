import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class UserBasics extends React.Component {
    
    constructor(props) {
        super(props);
    }

    handleChange = (name) => {
        console.info('name:', name);
    }

    render() {
        return(
            <form noValidate autoComplete="off">
                <TextField
                    id="standard-name"
                    label="firstName"
                    // className={classes.textField}
                    // value='name'
                    onChange={this.handleChange('firstName')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="lastName"
                    // className={classes.textField}
                    // value='name'
                    onChange={this.handleChange('lastName')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="userName"
                    // className={classes.textField}
                    // value='name'
                    onChange={this.handleChange('userName')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="password"
                    // className={classes.textField}
                    // value='name'
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="email"
                    // className={classes.textField}
                    // value='name'
                    onChange={this.handleChange('email')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="phone"
                    // className={classes.textField}
                    // value='name'
                    onChange={this.handleChange('phone')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="mobile"
                    // className={classes.textField}
                    // value='name'
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

            </form>
        );
    }
}

export default UserBasics;