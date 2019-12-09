import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class UserFinancialGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          financehistory : []
        }
    }
    
    componentDidMount() {

      fetch(process.env.REACT_APP_API_URL+`/users/financehistory?userId=${this.props.record.id}`, { 
        method: 'GET',
        headers: {}
      })
      .then((response) => {
          return response.json();
      })
      .then((myJson) => {

          this.setState({financehistory:myJson});

      })
      .catch((e) => {
          // showNotification('Error: comment not approved', 'warning')
      });
      
    }

    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }

render () {
      
    return (
        
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="right">firts Price</TableCell>
                <TableCell align="right">second Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.financehistory.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.shoppingPlanName}</TableCell>
                  <TableCell align="right">{row.shoppingPlanFirstPrise}</TableCell>
                  <TableCell align="right">{row.shoppingPlanSecondPrise}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        
      );
    }
}

export default UserFinancialGrid;