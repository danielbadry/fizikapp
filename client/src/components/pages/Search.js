import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProductSearchList from '../Product/ProductSearchList';
import DefinitionsSearchList from '../Definition/DefinitionsSearchList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      'IranSans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));

export default function Search(props) {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [result, setResult] = React.useState({
    allProducts: [],
    allDefinitions: [],
  });
  const [firstTime, setFirstTime] = React.useState(true);
  
  function handleChange(event, newValue) {
    setValue(newValue);
  }
  if(firstTime)
    fetch(process.env.REACT_APP_API_URL+`search/search?searchterm=${props.searchTerm}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(nat => {
        setResult(nat);
        setFirstTime(false);
      });

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs 
          value={value} 
          onChange={handleChange} 
          aria-label="ant example"
          >
          <AntTab 
            label="ویدیوها" 
            />
          <AntTab 
            label="تعریفی ها" 
            />
        </AntTabs>
        <div>
    
          <TabPanel value={value} index={0}>
            <ProductSearchList list={result.allProducts} />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <DefinitionsSearchList list={result.allDefinitions} />
          </TabPanel>

        </div>
      </div>
    </div>
  );
}
