import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';

class QuizOptionsList extends React.Component {
    
    constructor ( props ) {
        super (props);
    }

    render () {
        return (
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>answers</TableCell>
                    <TableCell align="right">correct answer</TableCell>
                    <TableCell align="right">delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key="1">
                        <TableCell component="th" scope="row">answer 1</TableCell>
                        <TableCell align="right">
                        <Tooltip title="make this option the correct answer">
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
                    <TableRow key="2">
                        <TableCell component="th" scope="row">answer 2</TableCell>
                        <TableCell align="right">
                        <Tooltip title="this is the correct answer">
                        <IconButton aria-label="Delete">
                            <DoneIcon fontSize="small" color="primary" />
                        </IconButton>
                        </Tooltip>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton aria-label="Delete">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell component="th" scope="row">answer 3</TableCell>
                        <TableCell align="right">
                        <IconButton aria-label="Delete">
                            <ClearIcon fontSize="small" />
                        </IconButton>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton aria-label="Delete">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell component="th" scope="row">answer 4</TableCell>
                        <TableCell align="right">
                        <IconButton aria-label="Delete">
                            <ClearIcon fontSize="small" />
                        </IconButton>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton aria-label="Delete">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    };
}

export default QuizOptionsList;