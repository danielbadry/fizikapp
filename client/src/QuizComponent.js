import React from 'react';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

class QuizComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isQuizDialogOpen: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:1337/quizes`, {
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
                    
                });
            });
    }

    handleDialogStatus = () => {
        this.setState({isQuizDialogOpen: !(this.state.isQuizDialogOpen)});
    }

    render() {
        return(
            <React.Fragment>

                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.handleDialogStatus}
                    >
                    start quiz
                </Button>

                <Dialog 
                    onClose={this.handleDialogStatus} 
                    aria-labelledby="simple-dialog-title" 
                    open={this.state.isQuizDialogOpen}
                    >
                    <DialogTitle 
                        id="simple-dialog-title"
                        >Set backup account
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    
                    </DialogContent>
                    <DialogActions>
                    <Button color="primary">
                        Back
                    </Button>
                    <Button color="primary">
                        Next
                    </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        );
    }
}
export default QuizComponent;