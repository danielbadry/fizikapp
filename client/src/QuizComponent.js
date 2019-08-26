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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class QuizComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isQuizDialogOpen: false,
            quizes : [],
            step: 0
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
                   quizes: quizes 
                });
                console.info('hello:', quizes);
            });
    }

    handleDialogStatus = () => {
        this.setState({isQuizDialogOpen: !(this.state.isQuizDialogOpen)});
    }

    checkAndGoNextStep = () => {
        this.setState({
            step: (this.state.step + 1)
        });
    }
    
    checkAndGoBackStep = () => {
        this.setState({
            step: (this.state.step - 1)
        });
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
                        >quiz of this product
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        {this.state.quizes.map((quiz, index) => 
                            (index==this.state.step?<div
                                key={index}
                                >
                                    <div>{quiz.question}</div>
                                    <div>
                                        {quiz.options.map(
                                            (option, ind) =>
                                            <RadioGroup
                                            key={ind}
                                                aria-label="gender"
                                                name="gender1"
                                                // className={classes.group}
                                                // value={value}
                                                // onChange={handleChange}
                                                >
                                                <FormControlLabel value="female" control={<Radio />} label={option.title} />
                                                
                                            </RadioGroup>
                                        )}
                                    </div>
                                </div>:
                                <div
                                key={index}
                                ></div>
                                )
                            
                            
                        )}
                    </DialogContentText>
                    
                    </DialogContent>
                    <DialogActions>
                    <Button 
                        color="primary"
                        onClick={this.checkAndGoBackStep}
                        >
                        Back
                    </Button>
                    <Button 
                        color="primary"
                        onClick={this.checkAndGoNextStep}
                        >
                        Next
                    </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        );
    }
}
export default QuizComponent;