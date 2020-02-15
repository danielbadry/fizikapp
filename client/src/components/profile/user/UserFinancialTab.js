import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//import { createMuiTheme } from '@material-ui/core/styles';
// const useStyles = makeStyles(theme => ({
//   root: {
//	 width: '100%',
//	 marginTop: theme.spacing(3),
//	 overflowX: 'auto',
//	 fontFamily: "IranSans"
//   },
//   table: {
//	 fontFamily: "IranSans",
//	 minWidth: 650,
//   },
//   cell: {
//	 fontFamily: "IranSans",
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('6104-3372-2365-3232', 159, 'خرید طرح', 24, 1),
//   createData('7474-7616-7891-7800', 237, 'انتقال f-coin', 37, 2),
//   createData('2536-3372-3619-5494', 262, 'خرید طرح', 24, 3),
//   createData('6268-1231-2365-5626', 305, 'خرید طرح', 67, 4),
//   createData('1425-3372-2365-8989', 356, 'خرید طرح', 49, 5),
// ];

class SimpleTable extends React.Component {
	constructor(props) {
		super (props);
		this.state = {
			rows : []
		}
	}

	componentDidMount() {
		let token = window.localStorage.getItem('token');
		fetch(process.env.REACT_APP_API_URL+`users/financehistory`, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
			'Content-Type': 'application/json',
			'authorization': `Bearer ${token}`,
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
			// body: JSON.stringify(data), // body data type must match "Content-Type" header
		})
		.then(response => response.json())
		.then(result => {
		this.setState(function(state, props) {
		return {
		rows: result
		}
		});
		console.info(result);
		});
	}

render() {
	return (
		<Table  stickyHeader>
			<TableHead>
				<TableRow>
				<TableCell align="right"  style={{fontFamily: "IranSans"}}>نوع طرح</TableCell>
				<TableCell align="right"  style={{fontFamily: "IranSans"}}>قیمت اصلی</TableCell>
				<TableCell align="right"  style={{fontFamily: "IranSans"}}>قیمت خرید</TableCell>
				{/* <TableCell align="right">تاریخ</TableCell> */}
				</TableRow>
			</TableHead>
			<TableBody>
				{this.state.rows.map(row => (
					<TableRow key={row.id}>
						<TableCell align="right"  style={{fontFamily: "IranSans"}} component="th" scope="row">{row.shoppingPlanName}</TableCell>
						<TableCell align="right"  style={{fontFamily: "IranSans"}}>{row.shoppingPlanFirstPrise}</TableCell>
						<TableCell align="right"  style={{fontFamily: "IranSans"}}>{row.shoppingPlanSecondPrise}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
  
}

export default SimpleTable;
