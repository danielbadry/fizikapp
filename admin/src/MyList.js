import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withDataProvider } from 'react-admin';
import PropTypes from 'prop-types';

import EnhancedTable from './EnhancedTable' ;

class Mylist extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        
      }
  }
  
  // componentDidMount() {
  //   this.fetchDirectory(0);
  // }

  // componentWillUnmount() {
    
  // }
  
  // fetchDirectory(rowId = this.state.currentDirectory) {
  //   const { dataProvider } = this.props;
  //   dataProvider(GET_LIST, 'categories', {
  //     pagination: { page: 1, perPage: 10 },
  //     sort: { field: 'id', order: 'DESC' },
  //     rowId : rowId
  //   })
  //   .then((res) => {
  //     this.setState({
  //       rows:res.data,
  //       currentDirectory: rowId
  //     });
  //   })
  //   .catch((e) => {
  //       console.info('Error: comment not approved', 'warning')
  //   });
  // }

  // handleDblClickOnRow (rowId) {
  //   this.setState({currentDirectory: rowId});
  //   this.fetchDirectory(rowId);
  // }

  // handleClickOpen() {
  //   this.setState({open:true});
  // }

  // handleClose() {
  //   this.setState({open:false});
  // }
  
  // goUp = () => {
  //   const { dataProvider } = this.props;
  //   dataProvider(GET_ONE, 'categories', {
  //     id : this.state.currentDirectory
  //   })
  //   .then((res) => {
  //     this.fetchDirectory(res.data.parentId);

  //   })
  //   .catch((e) => {
  //       console.info('Error: comment not approved', 'warning')
  //   });
  // }
  
  // createNewFolder = () => {
  //   const dataRecord = {
  //     name:this.state.folderName,
  //     parentId : this.state.currentDirectory
  //   }
  //   fetch('http://localhost:1337/categories', { method: 'POST', 
  //     body : JSON.stringify(dataRecord), 
  //     headers: {}
  //   })
  //   .then((response) => {
  //       return response.json();
  //   })
  //   .then((myJson) => {
  //     this.fetchDirectory(this.state.currentDirectory);
  //     this.handleClose();
  //   })
  //   .catch((e) => {
        
  //   });
  // }
  
  // setFolderName = (e) => {
  //   this.setState({folderName:e.target.value});
  // };
  
  render() {
    return (
    <Paper>
      <EnhancedTable />
    </Paper>
  )
};
}
Mylist.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(Mylist);