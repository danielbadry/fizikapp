import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing(1),
    fontFamily: 'IranSans'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['شماره تلفن را وارد کنید', 'کد تایید', 'اطلاعات فردی'];
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [mobileNumber, setMobileNumber] = React.useState(null);
  const [userEnteredCode, setUserEnteredCode] = React.useState(null);
  const [validVerifyCode, setValidVerifyCode] = React.useState(null);
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [grade, setGrade] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = step => {
    return step === 10;
  };

  const saveMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  }

  const saveUserEnteredCode = (e) => {
    setUserEnteredCode(e.target.value);
  }
  
  const saveUserFirstName = (e) => {
    setFirstName(e.target.value);
  }
  
  const saveUserLastName = (e) => {
    setLastName(e.target.value);
  }
  
  const saveUserPassword = (e) => {
    setPassword(e.target.value);
  }
  
  const saveUserGrade = (e) => {
    setGrade(e.target.value);
  }

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const sendVerificationCodeToEmail = () => {
    let verify = Math.floor((Math.random() * 99999) + 10000);
    
    setValidVerifyCode(verify);

    let data = {
      verifyCode : verify,
      mobileNumber: mobileNumber
    }
    
    fetch(process.env.REACT_APP_API_URL+`users/sendsms`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(request => {
          this.setState((state, props) => {
              return ({title: '', message:''});
          });
      });
    setActiveStep(prevActiveStep => prevActiveStep + 1);

  }
  
  const verifySMSCode = () => {
    if(userEnteredCode == validVerifyCode)
      setActiveStep(prevActiveStep => prevActiveStep + 1);
  }
  const signUpNewUser = () => {
    console.info('firstName:', firstName);
    console.info('lastName:', lastName);
    console.info('grade:', grade);
    console.info('password:', password);
  }

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel 
                
                {...labelProps}>
                <Typography style={{
                  fontFamily: 'IranSans',
                  fontSize: '14px'
                }}>{label}</Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
            {activeStep === 0 ? 
              <Typography className={classes.instructions}>
                <TextField
                  id="standard-phone"
                  label="شماره تلفن"
                  margin="normal"
                  onChange={saveMobileNumber}
                  InputProps={{
                    style: {
                      fontFamily: 'IranSans',
                      fontSize: '14px'
                    },
                  }}
                  InputLabelProps={{
                    style:{
                      fontFamily: 'IranSans',
                      fontSize: '14px'
                    }
                  }}
                />
              </Typography> : null}
            {activeStep === 1 ? 
              <Typography className={classes.instructions}>
                <TextField
                  id="standard-verifycode"
                  label="کد تایید"
                  margin="normal"
                  onChange={saveUserEnteredCode}
                  InputProps={{
                      style: {
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      },
                    }}
                    InputLabelProps={{
                      style:{
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      }
                    }}
                />
              </Typography> : null}
            {activeStep === 2 ? 
              <React.Fragment>
              <TextField
                id="standard-firstname"
                label="نام"
                margin="normal"
                onChange={saveUserFirstName}
                style={{
                  fontFamily: "IranSans"
                }}
                InputProps={{
                  style: {
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  },
                }}
                InputLabelProps={{
                  style:{
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  }
                }}
              />
              <TextField
                id="standard-lastname"
                label="نام خانوادگی"
                margin="normal"
                onChange={saveUserLastName}
                InputProps={{
                  style: {
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  },
                }}
                InputLabelProps={{
                  style:{
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  }
                }}
              />
              <TextField
                id="standard-lastname"
                label="کلمه ی عبور"
                margin="normal"
                onChange={saveUserPassword}
                InputProps={{
                  style: {
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  },
                }}
                InputLabelProps={{
                  style:{
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  }
                }}
                type="password"
              />
              <TextField
                id="standard-lastname"
                label="تکرار کلمه ی عبور"
                margin="normal"
                InputProps={{
                  style: {
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  },
                }}
                InputLabelProps={{
                  style:{
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  }
                }}
                type="password"
              />
              <FormControl>
                <InputLabel 
                  
                  style={{
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  }}
                  id="demo-simple-select-label">مقطع</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={grade}
                  onChange={saveUserGrade}
                >
                  <MenuItem
                  style={{
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  }}
                   value={10}>دهم</MenuItem>
                  <MenuItem 
                  style={{
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  }}
                  value={11}>یازدهم</MenuItem>
                  <MenuItem 
                  style={{
                    fontFamily: 'IranSans',
                    fontSize: '14px'
                  }}
                  value={12}>دوازدهم</MenuItem>
                </Select>
              </FormControl>
            </React.Fragment> : null}
            <div>
              {activeStep === 1 ? 
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  تصحیح شماره تلفن
                </Button>
              :
              null  
            }
              
              {activeStep === 0 ? 
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendVerificationCodeToEmail}
                  className={classes.button}

                >
                ارسال کد تایید
              </Button>
              : null}

              {activeStep === 1 ? 
                <Button
                  variant="contained"
                  color="primary"
                  onClick={verifySMSCode}
                  className={classes.button}
                >
                  تایید کد و مرحله ی بعد
                </Button>
              : null}

              {activeStep === 2 ? 
                <Button
                  variant="contained"
                  color="primary"
                  onClick={signUpNewUser}
                  className={classes.button}
                >
                ثبت نام
              </Button>
              : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
