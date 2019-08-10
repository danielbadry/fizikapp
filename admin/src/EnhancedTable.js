import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Home from '@material-ui/icons/Home';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import FileCopy from '@material-ui/icons/FileCopy';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: 'avatar', numeric: false, disablePadding: true, label: 'avatar' },
  { id: 'name', numeric: false, disablePadding: true, label: 'name' },
  { id: 'fullJalaali', numeric: true, disablePadding: false, label: 'date' }
];

function EnhancedTableHead(props) {
    
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
              {orderBy === row.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
    const [rows, setRows] = useState([]);
    const [folderName, setFolderNameInState] = useState('');
    const [currentDirectory, setCurrentDirectory] = useState({id:0});
    const [firstTime, setFirstTime] = useState(true);
    const [rowId, setrowId] = useState(0);

    useEffect(() => {
        const dataRecord = {
            rowId: 0
        }
        if (firstTime) {
            fetch(`http://localhost:1337/categories/?rowId=${encodeURIComponent(0)}`, {
                method: "GET",
                headers: {},   
            })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setRows(myJson.data);
                setFirstTime(false);
            })
            .catch((e) => {
                
            });
        }
    });
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [itemsForCopy, setItemsForCopy] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }
  
  function handleDoubleClick(event, row) {
    setCurrentDirectory(row);
    fetch(`http://localhost:1337/categories/?rowId=${encodeURIComponent(row.id)}`, {
        method: "GET",
        headers: {},   
    })
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        setRows(myJson.data);
        // setFirstTime(false);
    })
    .catch((e) => {
        
    });
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function goUp () {

    var url = `http://localhost:1337/categories/?rowId=${encodeURIComponent(currentDirectory.parentId)}`;
    var result = fetch(url, {
        method: 'get',
      }).then(function(response) {
        return response.json(); // pass the data as promise to next then block
      }).then(function(data) {
        console.log('data.data:', data.data);
        setRows(data.data);
        return fetch(`http://localhost:1337/categories/findparentdirectoryid/?rowId=${encodeURIComponent(data.data[0].parentId)}`)
        .then(function(resp){
          return resp.json();
        })
        .then(function(re){
          console.info('re', re);
          setCurrentDirectory(re);
          return re.json();
        })
        ; // make a 2nd request and return a promise
      })
      .then(function(response) {
        console.info('response.json:', response.json());
        return response.json();
      })
      .catch(function(error) {
        
      })

    // I'm using the result variable to show that you can continue to extend the chain from the returned promise
    result.then(function(r) {
      console.log(r); // 2nd request result
    });

    // console.info(currentDirectory);
    // fetch(`http://localhost:1337/categories/?rowId=${encodeURIComponent(currentDirectory.parentId)}`, {
    //     method: "GET",
    //     headers: {},   
    // })
    // .then((response) => {
    //     return response.json();
    // })
    // .then((myJson) => {
    //     setRows(myJson.data);
    //     console.info('myJson:', myJson);

        
    // })
    // .catch((e) => {
        
    // });
  }
  
  function handleDblClickOnRow () {
    fetch(`http://localhost:1337/categories/?rowId=${encodeURIComponent(0)}`, {
        method: "GET",
        headers: {},   
    })
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        setRows(myJson.data);
    })
    .catch((e) => {
        
    });
  }

  function createNewFolderr () {
    const dataRecord = {
      name:values.name,
      parentId : currentDirectory.id
    }
    
    fetch('http://localhost:1337/categories', { method: 'POST', 
      body : JSON.stringify(dataRecord), 
      headers: {}
    })
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
      fetch(`http://localhost:1337/categories/?rowId=${encodeURIComponent(currentDirectory.id)}`, {
          method: "GET",
          headers: {},   
      })
      .then((response) => {
          return response.json();
      })
      .then((myJson) => {
          setRows(myJson.data);

      })
      .catch((e) => {
          
      });
        
    })
    .catch((e) => {
        
    });
  }
  
  function copySelected() {
    let itemToCopyIDs = [];
    for (let select of selected) {
      for (let item of rows) {
        if (select == item.name) {
          itemToCopyIDs.push(item);
        }
      }
    }
    setItemsForCopy(itemToCopyIDs);
  }
  
  function paste() {
    console.info('ItemsForCopy:', itemsForCopy);
    console.info('container folder:', currentDirectory);
    const dataRecord = {
      itemsForCopy: itemsForCopy,
      currentDirectory: currentDirectory
    }
    fetch('http://localhost:1337/categories/paste', { method: 'POST', body : JSON.stringify(dataRecord), headers: {}})
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        
    })
    .catch((e) => {
        // showNotification('Error: comment not approved', 'warning')
    });
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const classes1 = useToolbarStyles();
  const { numSelected } = selected.length;
  const [values, setValues] = React.useState({
    name: ''
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <div className={classes1.root}>
      
        
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
{/* start */}
  <TextField
        id="standard-name"
        label="Name"
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
      />
    <Toolbar
      className={clsx(classes1.root, {
        [classes1.highlight]: numSelected > 0,
      })}
    >
      <div className={classes1.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            
          </Typography>
        )}
      </div>
      <div className={classes1.spacer} />
      <div className={classes1.actions}>
        {numSelected > 0 ? (
          <Tooltip title="paste">
            <IconButton>
              <CloudDoneIcon />
            </IconButton>
          </Tooltip>
        ) : (
        <div>
        {/* <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
        </Tooltip> */}
        <Tooltip title="up">
            <IconButton onClick={() => goUp()}>
                <ExpandLess />
            </IconButton>
        </Tooltip>
        <Tooltip title="paste">
        <IconButton onClick={() => paste()}>
            <CloudDoneIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="home">
        <IconButton onClick={() => handleDblClickOnRow()} color="primary">
            <Home />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="copy">
        <IconButton color="primary" onClick={() => copySelected()}>
            <FileCopy />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="new">
        <IconButton 
            onClick={()=> createNewFolderr()} color="primary">
            <CreateNewFolder />
        </IconButton>
      </Tooltip>
        </div>     
        )}
      </div>
    </Toolbar>

{/* end */}


        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name)}
                      onDoubleClick={(event)=>handleDoubleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={row.thumbnail} />
                        </ListItemAvatar>
                        
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">{row.name}</TableCell>
                      <TableCell align="right">{row.fullJalaali}</TableCell>
        
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
       {/* <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="directory name"
            type="text"
            fullWidth
            // onChange={}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            cancel
          </Button>
          <Button color="primary">
            create
          </Button>
        </DialogActions>
      </Dialog>  */}
    </div>
  );
}
