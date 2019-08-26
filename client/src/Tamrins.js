import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TamrinCard from './TamrinCard';
import DateFnsUtils from "@date-io/date-fns"; // choose your lib1
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from "@material-ui/pickers";

class Tamrins extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedDate : 2018
        }
    }

    componentDidMount() {
        fetch(`http://localhost:1337/products/tamrins`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(quizes => {
                this.setState({
                   quizes: quizes 
                });
                console.info('hello:', quizes);
            });
    }
    
    render() {
        return (
            <Grid container spacing={0}>
                <Grid item xs={9}>
                    <Paper>
                        <TamrinCard />  
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker 
                            views={["year"]}
                            value={this.selectedDate} 
                            // onChange={handleDateChange}
                        />
                        </MuiPickersUtilsProvider>
                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>ریاضی</Grid>
                                <Grid item>
                                    <Switch
                                    checked={true}
                                    // onChange={}
                                    value="checkedC"
                                    />
                                </Grid>
                                <Grid item>تجربی</Grid>
                            </Grid>
                        </Typography>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Assign responsibility</FormLabel>
                            <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={true} value="gilad" />}
                                label="Gilad Gray"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={true} value="jason" />}
                                label="Jason Killian"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={true} value="antoine" />
                                }
                                label="Antoine Llorca"
                            />
                            </FormGroup>
                            <FormHelperText>Be careful</FormHelperText>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
  
}

export default Tamrins;