import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Inbox from './Inbox';
import WatchedVideosList from './WatchedVideosList';
import UserBasics from './UserBasics';
import UserFinancialTab from './UserFinancialTab';

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Basics" {...a11yProps(0)} />
        <Tab label="Financial" {...a11yProps(1)} />
        <Tab label="Watched videos" {...a11yProps(2)} />
        <Tab label="Settings" {...a11yProps(3)} />
        <Tab label={
              <Badge className={classes.padding} color="secondary" badgeContent={4}>
                  Inbox
              </Badge>
            } {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserBasics />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserFinancialTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WatchedVideosList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Settings
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Inbox />
      </TabPanel>
    </div>
  );
}
