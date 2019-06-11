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
import FileCopy from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import { GET_ONE, GET_LIST, withDataProvider } from 'react-admin';
import dataProvider from './dataProvider';
import PropTypes from 'prop-types';

function createData(id, name) {
  return { id, name };
}

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
    this.state = {
      rows : [
        {
          id:1,
          name:'f1'
        }
      ]
    }
  }
  
  componentDidMount() {
    const { dataProvider } = this.props;
    dataProvider(GET_LIST, 'categories', {
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'id', order: 'DESC' }
    })
    .then((res) => {
      this.setState({
        rows:res.data
      });
    })
    .catch((e) => {
        console.info('Error: comment not approved', 'warning')
    });
  }

  componentWillUnmount() {
    
  }
  
  handleDblClickOnRow (rowId, event) {
    console.info('dbl click:', rowId);
    
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
      
      <Tooltip title="copy">
        <IconButton color="primary">
            <FileCopy />
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
            <TableCell>id</TableCell>
            <TableCell align="right">name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map(row => (
            <TableRow key={row.id} onDoubleClick={(e) => this.handleDblClickOnRow(row.id,e)}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
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