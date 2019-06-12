import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { GET_ONE, GET_LIST, withDataProvider } from 'react-admin';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

class ProductAnalytics extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      rows : [
        {
          id:1,
          name:'f1'
        }
      ],
      open : false,
      currentDirectory : 0
    }
  }
  
  componentDidMount() {
    this.fetchDirectory();
  }

  componentWillUnmount() {
    
  }
  
  fetchDirectory(rowId = this.state.currentDirectory) {
    const { dataProvider } = this.props;
    dataProvider(GET_LIST, 'categories', {
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'id', order: 'DESC' },
      rowId : rowId
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

  handleDblClickOnRow (rowId, event) {
    this.setState({currentDirectory: rowId});
    this.fetchDirectory(rowId);
  }

  handleClickOpen() {
    this.setState({open:true});
  }

  handleClose() {
    this.setState({open:false});
  }

  render() {
    return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>thumbnail</TableCell>
            <TableCell>name</TableCell>
            <TableCell>views</TableCell>
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
      <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="directory name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this)} color="primary">
            cancel
          </Button>
          <Button onClick={this.handleClose.bind(this)} color="primary">
            create
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
};
}
ProductAnalytics.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(ProductAnalytics);