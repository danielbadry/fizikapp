import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import Home from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { showNotification, GET_ONE, GET_LIST, withDataProvider } from 'react-admin';
import dataProvider from './dataProvider';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

class Mylist extends React.Component {
  
  constructor(props) {
    super(props);
    const { dataProvider, dispatch, record } = this.props;
    dataProvider(GET_LIST, 'categories', {
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'id', order: 'DESC' }
    })
    .then((res) => {
      showNotification('Comment approved');
      console.info(res)
    })
    .catch((e) => {
        showNotification('Error: comment not approved', 'warning')
    });
  }

  componentDidMount() {
    console.info('componentDidMount happened');
  }

  componentWillUnmount() {
    console.info('componentWillUnmount happened');
  }

  render() {
    return (
    <Paper>
      
      <Tooltip  title="up">
        <IconButton>
            <ExpandLess />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="delete">
        <IconButton>
            <DeleteIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="home">
        <IconButton color="primary">
            <Home />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="new">
        <IconButton color="primary">
            <CreateNewFolder />
        </IconButton>
      </Tooltip>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
};
}
Mylist.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(Mylist);