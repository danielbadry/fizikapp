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
  return ['شماره تلفن را وارد کنید', 'کد تایید', 'انتخاب کلمه عبور جدید'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <TextField
          id="standard-phone"
          label="شماره تلفن"
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
        />
      );
    case 1:
      return (
        <TextField
          id="standard-verifycode"
          label="کد تایید"
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
        />
      );
    case 2:
      return (
        <React.Fragment>
          
          <TextField
            id="standard-lastname"
            label="کلمه ی عبور"
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
          
        </React.Fragment>
      );
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = step => {
    return step === 10;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const sendVerificationCodeToEmail = () => {
    console.info('sendVerificationCodeToEmail');
    setActiveStep(prevActiveStep => prevActiveStep + 1);

  }
  
  const verifySMSCode = () => {
    console.info('verifySMSCode');
    setActiveStep(prevActiveStep => prevActiveStep + 1);
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
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
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
                  onClick={sendVerificationCodeToEmail}
                  className={classes.button}
                >
                کلمه عبور جدید را جایگزین کن
              </Button>
              : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
