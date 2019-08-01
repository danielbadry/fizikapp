import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class UserFinancialGrid extends React.Component {
    
    constructor() {
        super();
    }
    
    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }

render () {
    const rows = [
        this.createData('A', 159, 25030, 24, '6104-3372-5107-1500'),
        this.createData('G', 237, 98000, 37, '6104-3372-5107-1500'),
        this.createData('F', 262, 13100, 24, '6104-3372-5107-1500'),
        this.createData('B', 305, 36900, 67, '6104-3372-5107-1500'),
        this.createData('C', 356, 78200, 49, '6104-3372-5107-1500'),
      ];
      
    return (
        
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Transaction</TableCell>
                <TableCell align="right">Cart Number</TableCell>
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
        
      );
    }
}

export default UserFinancialGrid;