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
import TextField from '@material-ui/core/TextField';

class Tamrins extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            startedDate : 1390,
            endDate : 1398,
            tamrins: [],
            riazi : false,
            tajrobi : true
        }
    }

    handleField = field => (event) => {
        event.persist();
        console.info('field:', event.target.value);
        this.setState({
            [field]: event.target.value
        });
        // this.setState((state, props) => {
        //     return {[field]: event.target.value};
        // });
        // console.info('ena:', this.state);
        // this.fetchTamrins();
    }

    fetchTamrins = () => {
        fetch(`http://localhost:1337/tamrins?tajrobi=${this.state.tajrobi}&riazi=${this.state.riazi}&startedDate=${this.state.startedDate}&endDate=${this.state.endDate}`, {
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
            .then(tamrins => {
                this.setState({
                   tamrins: tamrins.data
                });
                console.info('tamrins:', tamrins);
            });
    }

    componentDidMount() {
        this.fetchTamrins();
    }

    yee = () => {
        console.info('state:', this.state);
    }

    render() {
        return (
            <Grid container spacing={0}>
                <Grid item xs={9}>
                    <Paper>
                        {
                            this.state.tamrins.map(
                                (tamrin, index) => 
                                    <TamrinCard 
                                        key= {index}
                                    />
                            )
                        }  

                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper>
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker 
                            minDate={Date("2010-01-01")}
                            maxDate={Date("2030-01-01")}
                            views={["year"]}
                            value={this.startedDate} 
                            onChange={this.filterResult}
                        />
                        </MuiPickersUtilsProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker 
                            minDate={Date("2015-01-01")}
                            maxDate={Date("2022-01-01")}
                            views={["year"]}
                            value={this.endDate} 
                            onChange={this.filterResult}
                        />
                        </MuiPickersUtilsProvider> */}
                        
                        <TextField
                            id="standard-name"
                            label="Name"
                            value={this.state.startedDate}
                            // onChange={this.handleField('startedDate')}
                            onKeyDown={this.handleField('startedDate')}
                            onKeyUp={this.yee()}
                            margin="normal"
                        />
                        
                        <TextField
                            id="standard-name"
                            label="Name"
                            value={this.state.endDate}
                            onChange={this.handleField('endDate')}
                            margin="normal"
                        />

                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.riazi}
                                        // onChange={this.handleField('riazi')}
                                        value="riazi"
                                        color="primary"
                                    />
                                    }
                                    label="riazi"
                                />
                                
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.tajrobi}
                                        // onChange={this.handleField('tajrobi')}
                                        value="tajrobi"
                                        color="primary"
                                    />
                                    }
                                    label="tajrobi"
                                />
                            </Grid>
                        </Typography>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">subjects</FormLabel>
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