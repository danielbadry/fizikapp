import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import Home from '@material-ui/icons/Home';
import FileCopy from '@material-ui/icons/Delete';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import { GET_LIST, withDataProvider, CREATE, showNotification, SimpleForm, GET_ONE } from 'react-admin';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import DialogTitle from '@material-ui/core/DialogTitle';

class Di extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            open : false,
            replyMessage: ''
          }
    }
    sendReplyToQuestion = () => {
        const { dataProvider } = this.props;
        dataProvider(CREATE, 'productsquestions', {
            message:this.state.replyMessage,
          })
          .then((res) => {
            
            this.handleClose();
          })
          .catch((e) => {
              console.info('Error: comment not approved', 'warning')
          });
      }
  
      setReplyMessage = (e) => {
        this.setState((state, props) => {
          return {replyMessage: e.target.value};
        });
      };
  
      handleClickOpen() {
        this.setState((state, props) => {
          return {open: true};
        });
      }
      
      handleClose() {
        this.setState((state, props) => {
          return {open: false};
        });
      }

    render () {
        return (
            <React.Fragment>
                <Link
                    component="button"
                    variant="body2"
                    onClick={this.handleClickOpen.bind(this)}
                >
                    reply
                </Link>
                <div>milad</div>
                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">reply</DialogTitle>
                <DialogContent>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText> */}
                <TextField
                    margin="dense"
                    label="write your idea"
                    type="text"
                    onChange={this.setReplyMessage.bind(this)}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose.bind(this)} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.sendReplyToQuestion.bind(this)} color="primary">
                    Send
                </Button>
                </DialogActions>
            </Dialog>
            </React.Fragment>
        )
    }
}
export default withDataProvider(Di);