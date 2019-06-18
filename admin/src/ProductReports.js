import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';

class ProductReports extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            reports : [
                {
                    id : 1,
                    reasonId: 23,
                    reasonMessage:'gravity is very videoNameimportant',
                    count: 11
                },
                {
                    id : 2,
                    reasonId: 14,
                    reasonMessage:'i did`nt like this video',
                    count: 11
                },
            ]
        }
    }
    render() {
        return (
            <React.Fragment>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell align="right">reason</TableCell>
                        <TableCell align="right">count</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.reports.map(row => (
                        <TableRow key={row.id} onDoubleClick={(e) => this.handleDblClickOnRow(row.id,e)}>
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="right">
                            {row.reasonMessage}
                        </TableCell>
                        <TableCell align="right">
                            {row.count}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <Tooltip title="enable / disable">
                    <Switch value="checkedC" inputProps={{ 'aria-label': 'primary checkbox' }} />
                </Tooltip>
            </React.Fragment>
        );
    }
}
export default ProductReports;