import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SlowMotionVideo from '@material-ui/icons/SlowMotionVideo';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import QuizOptionsList from './QuizOptionsList';
// import CreateQuizDialog from './CreateQuizDialog';
import dataProvider from './dataProvider';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GET_LIST, withDataProvider, CREATE, showNotification, SimpleForm, GET_ONE } from 'react-admin';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class QuizManager extends React.Component {
 
    constructor (props) {
        console.info('props:', props);
        super (props);
        this.state = {
            open : true,
            quizes: [],
            dialogOpen: false,
            text:'',
            showOptionDialog: false,
            optionText: '',
            itemId:''
        }    
        
    }  

    componentDidMount () {
        this.fetchQuizes();
    }

    handleClick() {
        this.setState((state, props) => {
            return {open: !state.open};
        });
    }

    fetchQuizes = () => {
        fetch('http://localhost:1337/quizes', { method: 'GET', headers: {}})
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            this.setState((state, props) => {
                return {quizes: myJson};
            });
            this.handleClose();
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
    }
    
    insertQuizItem = () => {
        const dataRecord = {
            question: this.state.text,
            productId: this.props.record.id
        }
        fetch('http://localhost:1337/quizes', { method: 'POST', body : JSON.stringify(dataRecord), headers: {}})
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            this.fetchQuizes();
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
    }
    
    insertQuizItemOption = () => {
        const dataRecord = {
            optionText: this.state.optionText
        }
        fetch('http://localhost:1337/quizes/' + this.state.itemId , { method: 'PUT', body : JSON.stringify(dataRecord), headers: {}})
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            this.fetchQuizes();
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
    }
    
    insertQuizOption = () => {
        const dataRecord = {
            question: this.state.text
        }
        fetch('http://localhost:1337/quizes', { method: 'PUT', body : JSON.stringify(dataRecord), headers: {}})
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            this.fetchQuizes();
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
    }

    handleClickOpen = () => {
        this.setState((state, props) => {
            return {dialogOpen: true};
        });
    }

    handleClose = () => {
        this.setState((state, props) => {
            return {dialogOpen: false};
        });
    }
    
    setItemText = (event) => {
        event.persist();
        this.setState((state, props) => {
            return {text: event.target.value};
        });
    }
    
    setOptionText = (event) => {
        event.persist();
        this.setState((state, props) => {
            return {optionText: event.target.value};
        });
    }

    showAddOptionDialog = (obj, parentid) => {
        this.setState((state, props) => {
            return {
                showOptionDialog: true,
                itemId: obj
            };
        });
    }
    
    makeThisOptionCorrectAnswer = () => {
        const dataRecord = {
           quizItemId: '5d4280e29c6d300478f6395f',
           optionId: 1,
           isAnswer: true
        };
        
        fetch('http://localhost:1337/quizes/' + this.state.itemId , {
            method: 'PUT', 
            body : JSON.stringify(dataRecord), 
            headers: {}
        })
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            this.fetchQuizes();
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
    }
    
    closeOptionDialog = () => {
        this.setState((state, props) => {
            return {showOptionDialog: false};
        });
    }

    render () {

    return (
        <React.Fragment>
        
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            ADD
        </Button>

        <Dialog open={this.state.dialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            write question here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="question"
            type="text"
            fullWidth
            onChange={this.setItemText.bind()}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.insertQuizItem}>
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={this.state.showOptionDialog} 
        onClose={this.closeOptionDialog} 
        aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Option</DialogTitle>
        <DialogContent>
          <DialogContentText>
            write option here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="option title"
            type="text"
            fullWidth
            onChange={this.setOptionText.bind()}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.insertQuizItemOption}>
            Insert Option
          </Button>
        </DialogActions>
      </Dialog>

        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        >
        {this.state.quizes.map(
            (item, index) => (
                <React.Fragment key={index}>
                    <ListItem 
                        button>
                        <ListItemIcon>
                        <SlowMotionVideo />
                        </ListItemIcon>
                        <ListItemText primary={item.question} />
                        
                        <Tooltip title="visible">
                            <IconButton>
                                <VisibilityOffIcon />
                            </IconButton>
                        </Tooltip>
                        
                        <Tooltip 
                            title="add option"
                            onClick={this.showAddOptionDialog.bind(this, item.id)}
                            >
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="delete">
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        {this.state.open ? <ExpandLess onClick={this.handleClick.bind(this)} /> : <ExpandMore onClick={this.handleClick.bind(this)} />}
                    </ListItem>
                    <Collapse 
                        in={this.state.open} 
                        timeout="auto" 
                        unmountOnExit 
                        >
                        
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>answers</TableCell>
                                <TableCell align="right">correct answer</TableCell>
                                <TableCell align="right">delete</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {item.options.map(
                                    (option, optionIndex) => (
                                        <TableRow key={optionIndex}>
                                            <TableCell component="th" scope="row">{option.title}</TableCell>
                                            <TableCell align="right">
                                            <Tooltip 
                                                title="make this option the correct answer"
                                                onClick={this.makeThisOptionCorrectAnswer}
                                                >
                                                <IconButton aria-label="Done">
                                                    <ClearIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="Delete">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}

                            </TableBody>
                        </Table>

                    </Collapse>
                </React.Fragment>
            )
        )}
        
        </List>
    </React.Fragment>
    )};
}

// QuizManager.propTypes = {
//     push: PropTypes.func,
//     showNotification: PropTypes.func,
// };

// export default connect(null, {
//     showNotification,
//     push,
// })(QuizManager);

export default withDataProvider(QuizManager);