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
import { RadioButtonGroupInput, BooleanField } from 'react-admin';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
            
            <Table>
        <TableHead>
          <TableRow>
            <TableCell>option</TableCell>
            <TableCell>isAnswer</TableCell>
            <TableCell>delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[{id:1},{id:2}].map(row => (
            <TableRow key={row.id} onDoubleClick={(e) => this.handleDblClickOnRow(row.id,e)}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">
              <BooleanField source="commentable" />

            </TableCell>
              <TableCell align="right">
              <Fab aria-label="Delete">
                <DeleteIcon />
                </Fab>

            </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
                
                <Card>
                    
                <TextField
        id="standard-name"
        label="new option"
        
        margin="normal"
      />
                    
                    <CardActions>
                    <Fab variant="extended" color="primary" aria-label="Add">
          <NavigationIcon />
          add
        </Fab>
      </CardActions>
                </Card>
            </ExpansionPanelDetails>
            
        </ExpansionPanel>
       
    
    </div>
  )};
}

export default QuizManager;