import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class UserActivityGrid extends React.Component {
    
    constructor() {
        super();
    }
    
render () {
    
    return (
        
          <Table>
            <TableHead>

                <TableRow>
                    <TableCell>operation</TableCell>
                    <TableCell align="right">Value</TableCell>
                </TableRow>
            
            </TableHead>
            <TableBody>
                {[
                    {
                        operation:'number of watched videos',
                        value: 12
                    },
                    {
                        operation:'number of invitation',
                        value: 4
                    },
                    {
                        operation:'total online time',
                        value: 63
                    },
                    {
                        operation:'number of registered device',
                        value: 2
                    },
                    {
                        operation:'number of passed queries',
                        value: 2
                    },
                    {
                        operation:'shopping level',
                        value: 2
                    }
                ].map(row => (
                    <TableRow key={row.name}>

                        <TableCell component="th" scope="row">
                            {row.operation}
                        </TableCell>

                        <TableCell align="right">
                            {row.value}
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
          </Table>
       
      );
    }
}

export default UserActivityGrid;