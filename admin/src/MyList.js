import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import Home from '@material-ui/icons/Home';
import FileCopy from '@material-ui/icons/Delete';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import { GET_LIST, withDataProvider, CREATE, showNotification, SimpleForm, GET_ONE } from 'react-admin';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
class Mylist extends React.Component {
  
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
      currentDirectory : 0,
      folderName : 'fifi'
    }
  }
  
  componentDidMount() {
    this.fetchDirectory(0);
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
        rows:res.data,
        currentDirectory: rowId
      });
    })
    .catch((e) => {
        console.info('Error: comment not approved', 'warning')
    });
  }

  handleDblClickOnRow (rowId) {
    this.setState({currentDirectory: rowId});
    this.fetchDirectory(rowId);
  }

  handleClickOpen() {
    this.setState({open:true});
  }

  handleClose() {
    this.setState({open:false});
  }
  
  goUp = () => {
    const { dataProvider } = this.props;
    dataProvider(GET_ONE, 'categories', {
      id : this.state.currentDirectory
    })
    .then((res) => {
      this.fetchDirectory(res.data.parentId);

    })
    .catch((e) => {
        console.info('Error: comment not approved', 'warning')
    });
  }
  
  createNewFolder = () => {
    const dataRecord = {
      name:this.state.folderName,
      parentId : this.state.currentDirectory
    }
    fetch('http://localhost:1337/categories', { method: 'POST', 
      body : JSON.stringify(dataRecord), 
      headers: {}
    })
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
      this.fetchDirectory(this.state.currentDirectory);
      this.handleClose();
    })
    .catch((e) => {
        
    });
  }
  
  setFolderName = (e) => {
    this.setState({folderName:e.target.value});
  };
  
  render() {
    return (
    <Paper>
      <div>
      <Tooltip title="up">
        <IconButton onClick={() => this.goUp()}>
            <ExpandLess />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="delete">
        <IconButton>
            <DeleteIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="home">
        <IconButton onClick={() => this.handleDblClickOnRow(0)} color="primary">
            <Home />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="copy">
        <IconButton color="primary">
            <FileCopy />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="new">
        <IconButton onClick={this.handleClickOpen.bind(this)} color="primary">
            <CreateNewFolder />
        </IconButton>
      </Tooltip>
      </div>
      <List dense>

      {this.state.rows.map((item, index) => {
        return (
          <ListItem 
            key={item.id} 
            // button
            onDoubleClick={(e) => this.handleDblClickOnRow(item.id,e)}
            >
            <ListItemAvatar>
              <Avatar src={item.thumbnail} />
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </ListItem>
        );
      })}

    </List>
      {/* <Table>
        
        <TableHead>
          <TableRow>
            <TableCell align="left">name</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {this.state.rows.map(row => (
            <TableRow key={row.id} onDoubleClick={(e) => this.handleDblClickOnRow(row.id,e)}>
              <TableCell>
              {/* <ListItemAvatar> 
              <Avatar
                alt={`Avatar n°${1}`}
                src={`/static/images/avatar/${1}.jpg`}
              />
            </ListItemAvatar>
                {row.itemType}
                {row.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table> */}

      <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="directory name"
            type="text"
            fullWidth
            onChange={this.setFolderName.bind(this)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this)} color="primary">
            cancel
          </Button>
          <Button onClick={this.createNewFolder.bind(this)} color="primary">
            create
          </Button>
        </DialogActions>
      </Dialog>

    </Paper>
  )
};
}
Mylist.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(Mylist);