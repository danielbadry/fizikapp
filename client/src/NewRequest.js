import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

class NewRequest extends React.Component {
    
    handleChange = () => {
        console.info('hello');
    }

    render () {
        const values = {
            name: 'Cat in the Hat',
            age: '',
            multiline: 'Controlled',
            currency: 'EUR',
          };
        return (
            <Grid container spacing={3}>
                        
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper>
                        <form noValidate autoComplete="off">
                            
                            <TextField
                                id="standard-name"
                                label="Name"
                                value={values.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />

                            <TextField
                                id="standard-full-width"
                                label="Label"
                                style={{ margin: 8 }}
                                placeholder="Placeholder"
                                helperText="Full width!"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <Button variant="contained" color="primary">
                                send request
                            </Button>
                        </form>    
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper></Paper>
                    </Grid>

                    <MainFooter />

            </Grid>
        );
    }
}
export default NewRequest;