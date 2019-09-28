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
            userAnswers: [],
            step: 0,
            user : JSON.parse(localStorage.getItem('userInfo'))
        }
    }

    componentDidMount() {
        fetch(`http://localhost:1337/quizes?model=${this.props.model}&modelid=${this.props.modelid}`, {
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
                }, function() {

                    console.info('quizes:', this.state.quizes);
                    console.info('props:', this.props);
                    // fill out answers array
                    for (let qa of quizes) {
                        
                        let tempObject = {
                            userId : this.state.user.id,
                            quizId: qa.id,
                            responseId: null
                        }

                        this.state.userAnswers.push(tempObject);
                    }

                    console.info('answers:', this.state.userAnswers);
                });
                
            });
    }

    handleDialogStatus = () => {
        this.setState({isQuizDialogOpen: !(this.state.isQuizDialogOpen)});
    }
    
    handleChange = () => {
        console.info('hello');
    }
    
    itemHandleChange = (optionId, quizId) => {
        console.info('quiz id:', quizId);
        console.info('option id:', optionId);
        // fill the state.answers array here
        console.info('step:', this.state.quizes[this.state.step]);
        this.state.userAnswers[this.state.step].responseId = optionId;
       
        console.info('final result:', this.state.userAnswers);
    } 

    checkAndGoNextStep = () => {
        this.setState({
            step: (this.state.step + 1)
        });
    }
    
    calculateUserPointInQuiz = () => {
        let tempObject = {};
        let score = 0;
        for (let q of this.state.quizes) {
            
            for (let a of q.options) {
                if  (a.isAnswer) {
                    tempObject.id = a.id;
                }
                
            }
            console.info(`quiz:${q.id} - answer ${tempObject.id}`);
            for (let ua of this.state.userAnswers) {
                console.info('ua', ua);
                if (ua.quizId == q.id && ua.responseId == tempObject.id)
                    {
                        console.info('are okeye');
                        score ++;
                    }
            }
            
        }
        console.info('score:', score);
        this.catchMeHere.bind(this);
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
                                            onChange={this.handleChange}
                                            >
                                                {quiz.options.map(
                                                    (option, ind) =>
                                                <FormControlLabel
                                                    key={ind}
                                                    value={option.id}
                                                    control={<Radio
                                                    onChange={event => this.itemHandleChange(option.id, quiz.id)}
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
                        disabled = {this.state.step == 0}
                        color="primary"
                        onClick={this.checkAndGoBackStep}
                        style={{
                            fontFamily: "IranSans"
                        }}
                        variant="contained"
                        >
                        سوال قبلی
                    </Button>

                    <Button 
                        disabled = {this.state.step == this.state.quizes.length - 1}
                        color="primary"
                        onClick={this.checkAndGoNextStep}
                        style={{
                            fontFamily: "IranSans"
                        }}
                        variant="contained"
                        >
                        سوال بعدی
                    </Button> 
                    
                    <Button 
                        disabled = {Boolean(Number(this.state.quizes.length - 1) !== Number(this.state.step))}
                        color="secondary"
                        onClick={this.calculateUserPointInQuiz}
                        style={{
                            fontFamily: "IranSans"
                        }}
                        variant="contained"
                        >
                        امتیاز من را محاسبه و ثبت کن
                    </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        );
    }
}
export default QuizComponent;