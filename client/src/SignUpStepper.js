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
import { withSnackbar } from 'notistack';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Redirect } from "react-router-dom";

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

function HorizontalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSignupSuccess, setisSignupSuccess] = React.useState(false);
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

  const sendVerificationCodeViaSMS = () => {
    
    fetch(process.env.REACT_APP_API_URL + `users/checkformobilerepetition`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({mobileNumber:mobileNumber}), // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(response => {
          if (response.numberExists) {
            const action = key => (
              <React.Fragment>
                  <Button 
                      // onClick={() => { alert(`I belong to snackbar with key ${key}`); }}
                      style={{
                        fontFamily: 'IranSans',
                        fontSize: '14px'
                      }}
                      href="#/signin"
                      >
                      ورود
                  </Button>
                  {/* <Button onClick={() => { this.props.closeSnackbar(key) }}>
                      Dismiss
                  </Button> */}
              </React.Fragment>
          );
            props.enqueueSnackbar(
              <React.Fragment>

                <Typography style={{
                  fontFamily: 'IranSans',
                  fontSize: '14px',
                  direction: 'rtl'
                }}>
                کاربری با این شماره تلفن در سیستم موجود است
                </Typography>
                
              </React.Fragment>, { 
              variant: 'warning',
              action,
            });
          }
          else {
            let verify = Math.floor((Math.random() * 99999) + 10000);
            setValidVerifyCode(verify);

            let data = {
              verifyCode : verify,
              mobileNumber: mobileNumber
            }
            
            fetch(process.env.REACT_APP_API_URL + `users/sendsms`, {
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
      });

  }
  
  const verifySMSCode = () => {
    if(userEnteredCode == validVerifyCode)
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    else {
      const action = key => (
        <React.Fragment>
            {/* <Button 
                onClick={() => { alert(`I belong to snackbar with key ${key}`); }}
                style={{
                  fontFamily: 'IranSans',
                  fontSize: '14px'
                }}
                href="#/signin"
                >
                ورود
            </Button> */}
            {/* <Button onClick={() => { this.props.closeSnackbar(key) }}>
                Dismiss
            </Button> */}
        </React.Fragment>
      );
      props.enqueueSnackbar(
        <React.Fragment>

          <Typography style={{
            fontFamily: 'IranSans',
            fontSize: '14px',
            direction: 'rtl'
          }}>
          کد تایید را درست وارد نکردید
          </Typography>
          
        </React.Fragment>, { 
        variant: 'error',
        action,
      });
    }
    
  }

  const signUpNewUser = () => {
    let newUserData = {
      firstName:firstName,
      lastName:lastName,
      grade:grade,
      password:password,
      mobile:mobileNumber
    }
    fetch(process.env.REACT_APP_API_URL + `users`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(newUserData), // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(response => {
          if (response.status.auth) {
            window.localStorage.setItem('token', response.status.token);
            props.enqueueSnackbar(
              <React.Fragment>

                <Typography style={{
                  fontFamily: 'IranSans',
                  fontSize: '14px',
                  direction: 'rtl'
                }}>
                شما با موفقیت در سیستم ثبت شدید
                </Typography>
                
              </React.Fragment>, { 
              variant: 'success'
            });
            
            setTimeout(function()
            { 
              props.enqueueSnackbar(
                <React.Fragment>
  
                  <Typography style={{
                    fontFamily: 'IranSans',
                    fontSize: '14px',
                    direction: 'rtl'
                  }}>
                  بعد از 5 ثانیه به طور خودکار وارد برنامه می شوید
                  </Typography>
                  
                </React.Fragment>, { 
                variant: 'info',
                autoHideDuration: 3000,
              });
            }, 1000);

            setTimeout(function()
            { 
              setisSignupSuccess(true);
            }, 5000);
          }
      });
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
if(isSignupSuccess) {
  return (
    <Redirect to="/" />
  )
} else
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
                  placeholder="09xxxxxxxxx"
                  type="number"
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
              <React.Fragment
                style={{
                  direction:'rtl'
                }}  
                >
                <div>
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
                </div>
                <div>
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
              </div>
              <div>
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
              </div>
              <div>
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
              </div>
              <div>
              <FormControl component="fieldset">
                <FormLabel 
                  component="legend"
                  style={{
                    fontFamily:'IranSans',
                    fontSize:'14px'
                  }}
                >مقطع تحصیلی</FormLabel>
                <RadioGroup aria-label="position" name="position" value={grade} onChange={saveUserGrade} row>
                  <FormControlLabel
                    value="10"
                    control={<Radio color="primary" style={{
                      fontFamily:'IranSans',
                      fontSize:'14px'
                    }} />}
                    label="دهم"
                    labelPlacement="دهم"
                  />
                  <FormControlLabel
                    value="11"
                    control={<Radio color="primary" style={{
                      fontFamily:'IranSans',
                      fontSize:'14px'
                    }} />}
                    label="یازدهم"
                    labelPlacement="یازدهم"
                  />
                  <FormControlLabel
                    value="12"
                    control={<Radio color="primary" style={{
                      fontFamily:'IranSans',
                      fontSize:'14px'
                    }} />}
                    label="دوازدهم"
                    labelPlacement="دوازدهم"
                  />
                </RadioGroup>
              </FormControl>
              </div>
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
                  onClick={sendVerificationCodeViaSMS}
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
export default withSnackbar(HorizontalLinearStepper);