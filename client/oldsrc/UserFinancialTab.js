import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    fontFamily: "IranSans"
  },
  table: {
    fontFamily: "IranSans",
    minWidth: 650,
  },
  cell: {
    fontFamily: "IranSans",
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('6104-3372-2365-3232', 159, 'خرید طرح', 24, 1),
  createData('7474-7616-7891-7800', 237, 'انتقال f-coin', 37, 2),
  createData('2536-3372-3619-5494', 262, 'خرید طرح', 24, 3),
  createData('6268-1231-2365-5626', 305, 'خرید طرح', 67, 4),
  createData('1425-3372-2365-8989', 356, 'خرید طرح', 49, 5),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    // <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>شماره کارت</TableCell>
            <TableCell className={classes.cell} align="right">مبلغ</TableCell>
            <TableCell className={classes.cell} align="right">نام عمل</TableCell>
            <TableCell className={classes.cell} align="right">تاریخ</TableCell>
            <TableCell className={classes.cell} align="right">ردیف</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className={classes.cell} align="right">{row.calories}</TableCell>
              <TableCell className={classes.cell} align="right">{row.fat}</TableCell>
              <TableCell className={classes.cell} align="right">{row.carbs}</TableCell>
              <TableCell className={classes.cell} align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    // </Paper>
  );
}
