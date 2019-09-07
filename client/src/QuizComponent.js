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
import Typography from '@material-ui/core/Typography';

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
        const classes = {
            radio : {
                color : 'red'
            }
        }
        return(
            <React.Fragment>

                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.handleDialogStatus}
                    style={{
                        fontFamily: "IranSans"
                    }}
                    >
                    شروع کوییز
                </Button>

                <Dialog 
                    onClose={this.handleDialogStatus} 
                    aria-labelledby="simple-dialog-title" 
                    open={this.state.isQuizDialogOpen}
                    style={{ 
                        direction: 'rtl',
                    }}
                    >
                    <DialogTitle 
                        id="simple-dialog-title"
                        >
                            <Typography
                                        style={{ 
                                            fontFamily: 'IranSans_Light',
                                            fontSize: 12
                                        }}
                                        >
                                        اسم این ویدیو ذکر شود
                                    </Typography>
                            
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        {this.state.quizes.map((quiz, index) => 
                            (index==this.state.step?<div
                                key={index}
                                >
                                    <Typography
                                        style={{ 
                                            fontFamily: 'IranSans_Light',
                                            fontSize: 12
                                        }}
                                        >
                                        {quiz.question}
                                    </Typography>
                                    <div>
                                        <RadioGroup
                                            aria-label="gender"
                                            name="gender1"
                                            // className={classes.group}
                                            // value={value}
                                            // onChange={handleChange}
                                            >
                                                {quiz.options.map(
                                                    (option, ind) =>
                                                <FormControlLabel
                                                    key={ind}
                                                    value={option.id}
                                                    control={<Radio
                                                    />}
                                                label={
                                                <Typography 
                                                    style={{ 
                                                        fontFamily: 'IranSans_Light',
                                                        fontSize: 12
                                                    }}
                                                    >
                                                    {option.title}
                                                    </Typography>
                                                    }
                                                />
                                            )}
                                        </RadioGroup>
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
                        style={{
                            fontFamily: "IranSans"
                        }}
                        >
                        سوال قبلی
                    </Button>
                    <Button 
                        color="primary"
                        onClick={this.checkAndGoNextStep}
                        style={{
                            fontFamily: "IranSans"
                        }}
                        >
                        سوال بعدی
                    </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        );
    }
}
export default QuizComponent;