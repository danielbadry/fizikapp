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
            userHasCharge: true,
            quizes : [],
            mode : 'quiz',
            quizesResponse : [],
            isAttended : null,
            userAnswers: [],
            step: 0,
            token: null,
            user:null,
            calculateButtonText : 'امتیاز من را محاسبه کن',
            quizResultText:null
        }
    }
    
    getUserQuizResponse (token) {
        fetch(process.env.REACT_APP_API_URL+`quizes/getuserquizresponse?model=${this.props.model}&modelid=${this.props.modelid}`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(response => {
                
                this.setState({
                   quizesResponse: response.userQuizResponse,
                   isAttended : response.isAttended
                }, function() {

                    console.info('state:', this.state);
                    // console.info('props:', this.props);
                    // // fill out answers array
                    // for (let qa of quizes) {
                        
                    //     let tempObject = {
                    //         userId : this.state.user.id,
                    //         quizId: qa.id,
                    //         responseId: null
                    //     }

                    //     this.state.userAnswers.push(tempObject);
                    // }

                    // console.info('answers:', this.state.userAnswers);
                });
                
            });
    }
    
    componentDidMount() {
        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`users/userinfo`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(userinfo => {
                this.setState({
                   user: userinfo 
                }, function() {
                    
                });
                
            });

        this.setState(function(state, props) {
            return {
                token: token
            }}, function() {
                
            });
        this.getUserQuizResponse(token);
        fetch(process.env.REACT_APP_API_URL+`quizes?model=${this.props.model}&modelid=${this.props.modelid}`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
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
    
    handleDialogStatusForResponse = () => {
        this.setState({isQuizDialogOpen: !(this.state.isQuizDialogOpen)});
        this.setState({mode: 'showAnswers'});
        this.setState({quizResultText: 'امتیاز شما از این کوییز 2 است'});
    }
    
    handleChange = () => {
        console.info('hello');
    }
    
    itemHandleChange = (optionId, quizId) => {
        // if(false) {
        //     return;
        // } else {
            console.info('quiz id:', quizId);
            console.info('option id:', optionId);
            // fill the state.answers array here
            console.info('step:', this.state.quizes[this.state.step]);
            this.state.userAnswers[this.state.step].responseId = optionId;
            console.info('final result:', this.state.userAnswers);
        // }
        
    } 

    checkAndGoNextStep = () => {
        this.setState({
            step: (this.state.step + 1)
        });
    }
    
    calculateUserPointInQuiz = async () => {
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
        this.changeHandler();
        await this.saveUserScoreInDatabase();
        this.state.quizResultText = `امتیاز شما ${score} است و در سایت ثبت شد`; 
        
    }
    
    saveUserScoreInDatabase = () => {
        console.info('write in database');
        let data = {
            answers : JSON.stringify(this.state.userAnswers)
        }
        fetch(process.env.REACT_APP_API_URL+`quizesanswer`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(result => {
                console.info('after write in database:', result);
            });    
    }

    changeHandler = () => {
        this.props.endFunc();
    }

    checkForAnswer = (id) => {
        // console.info('iddd:', id);
        // console.info(this.state.quizes[this.state.step].options);
        for (let oo of this.state.quizes[this.state.step].options) {
            if(oo.id == id && oo.isAnswer)
                return true;
        }
        console.info('quizesResponse:', this.state);
        
        for (let oo of this.state.quizesResponse) {
            if(oo.responseId == id)
                return true;
        }
    }

    OptionsPad (quiz) { 
        if (this.state.mode === 'quiz') {
            return (
            <div>
                <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    // className={classes.group}
                    // value={'03444'}
                    onChange={this.handleChange}
                    >
                        {quiz.options.map(
                            (option, ind) =>
                        <FormControlLabel
                            key={ind}
                            disabled = {false}
                            value={option.id}
                            control={<Radio
                            onChange={event => this.itemHandleChange(option.id, quiz.id)}
                            style={{
                                color : 'green'
                            }}
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
            )
        } else if (this.state.mode === 'showAnswers') {
            return (
                <div>
                    {quiz.options.map(
                        (option, ind) =>
                            <FormControlLabel
                                disabled = {false}
                                checked = {this.checkForAnswer(option.id)}
                                control={<Radio
                                style={{
                                    color : 'green'
                                }}
                                />}
                            label={
                            <Typography 
                                style={{ 
                                    fontFamily: 'IranSans_Light',
                                    fontSize: 12
                                }}
                                >
                                {option.title} - {option.id}
                                </Typography>
                                }
                            />
                    )}
                </div>
            )
        }
    }

    checkAndGoBackStep = () => {
        this.setState({
            step: (this.state.step - 1)
        });
    }

    WarningForAttend () {
        if (this.state.isAttended){
            return (
            <div
                style={{
                    color : 'orange'
                }}
            >شما قبلا در این کوییز شرکت کرده اید، اما می توانید دوباره شرکت کنید ولی امتیاز قبلی شما همچنان پابرجاست</div>
        );
        } else {
            return (
                <div>شرکت کن</div>
            )
        }
    }

    render() {
        const classes = {
            radio : {
                color : 'red'
            }
        }
        return(
            <React.Fragment>
                {(this.state.token && this.state.quizes.length)? 
                
                    <React.Fragment>

                        {((this.state.userHasCharge) && (!this.state.isAttended))?
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
                        :null}
                        {(this.state.isAttended) ?
                            <Button 
                                variant="contained" 
                                color="secondary"
                                onClick={this.handleDialogStatusForResponse}
                                style={{
                                    fontFamily: "IranSans"
                                }}
                                >
                                نمایش جواب هاو مقایسه با جواب های من
                            </Button> :
                            null
                        }
                        

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
                                        {this.props.title}
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
                                            {this.OptionsPad(quiz)}
                                        </div>:
                                        <div
                                        key={index}
                                        ></div>
                                        )
                                    
                                )}
                                <Typography
                                    style={{
                                        fontFamily: 'IranSans',
                                        fontSize: '14px'
                                    }}
                                    >
                                   {this.state.quizResultText}
                                </Typography>
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
                            
                            {((!this.state.quizResultText) && (this.state.mode == 'quiz')) ? 
                                <Button 
                                    disabled = {Boolean(Number(this.state.quizes.length - 1) !== Number(this.state.step))}
                                    color="secondary"
                                    onClick={this.calculateUserPointInQuiz}
                                    style={{
                                        fontFamily: "IranSans"
                                    }}
                                    variant="contained"
                                    >
                                    {this.state.calculateButtonText}
                                </Button>    
                                : null}

                                {((!this.state.quizResultText) || (this.state.mode == 'showAnswers')) ? 
                                    <Button 
                                        onClick={this.handleDialogStatus}
                                        style={{
                                            fontFamily: "IranSans"
                                        }}
                                        variant="contained">
                                            بستن
                                    </Button> : null
                                }

                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                : null    
                } 

                {((this.state.token) && (this.state.quizes.length == 0)) ?
                    <div>کوییزی موجود نیست</div> :
                    null
                }

                {(!this.state.token) ?
                    <div>شما لاگین نیستید</div>:
                    null
                }
            </React.Fragment>
        );
    }
}
export default QuizComponent;