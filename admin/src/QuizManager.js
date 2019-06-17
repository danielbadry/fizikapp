import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import { SimpleForm } from 'react-admin';
import { RadioButtonGroupInput } from 'react-admin';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
// }));

class QuizManager extends React.Component {
constructor (props) {
    super(props);
    this.state = {
        rows : [
            {
                key:1,
                value:'1'
            },
            {
                key:2,
                value:'1'
            },
            {
                key:3,
                value:'1'
            }
        ],
        open : false,
        currentDirectory : 0
      }
}
render() {
  return (
    <div >
        <div dir="rtl">
            <Tooltip title="new question">
                <IconButton onClick={(e) => this.handleDblClickOnRow(0, e)} color="primary">
                    <CreateNewFolder />
                </IconButton>
            </Tooltip>
        </div>   
        <br />
        
        
            <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>
                what does gravity mean?
            </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <FormControl component="fieldset">
                    <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    >
                        <FormControlLabel
                            value="female"
                            control={<Radio />} 
                            label="gravity is a state"
                            />
                        <FormControlLabel 
                            value="male" 
                            control={<Radio />} 
                            label="Male"
                            />
                        <FormControlLabel 
                            value="other" 
                            control={<Radio />} 
                            label="i dont know what is it" 
                            />
                        <FormControlLabel
                            value="disabled"
                            control={<Radio />}
                            label="gravity is not very important in physics"
                        />
                    </RadioGroup>
                </FormControl>
            </ExpansionPanelDetails>
        </ExpansionPanel>
       
    
    </div>
  )};
}

export default QuizManager;