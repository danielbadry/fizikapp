import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Container from '@material-ui/core/Container';
import ItemsCarousel from 'react-items-carousel';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import UserToolInAppbar from './UserToolInAppbar';

//import StickyFooter from "./StickyFooter";
//import RequestCard from "./RequestCard";
//import SingleRow from "./SingleRow";
//import NiceCard2 from "./NiceCard";

import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Routs from './Routs';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



export default function MiniDrawer() {
  const [isGoToSearchProcess, setIsGoToSearchProcess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  function setSearchContent(e) {
    setSearchValue(e.target.value);
    console.info(e.target.value);
  }

  function redirectToSearchPage (e) {
    console.info(e.keyCode);
    switch (e.keyCode) {
      case 13 :
          setIsGoToSearchProcess(true);
    }
  }

  function redirectToSearchPage (e) {
    console.info(e.keyCode);
    switch (e.keyCode) {
      case 13 :
          setIsGoToSearchProcess(true);
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (isGoToSearchProcess) {
    return <Redirect to={`/search/${searchValue}`}/>;
  } else 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={ (e) => setSearchContent(e) }
              onKeyDown={ (e) => redirectToSearchPage(e) }
              placeholder="جستجو کنید"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 
                'aria-label': 'search',
                style: {
                  fontFamily: "IranSans_Light",
                  fontSize: '13px'
                }
              }}
            />
          </div>

          <UserToolInAppbar />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[{'text':'صفحه اصلی آموزش','link':'/'}, {'text':'حل تست و تمرین','link':'/exercises'}, {'text':'تعریفی ها', 'link':'/definitions'}, {'text':'فراتر از کتاب','link':'/beyondthebooks'}, {'text':'چالش های علمی','link':'/sciencechallenges'}, {'text':'درخواست ها','link':'/requests'},].map((text, index) => (
            <ListItem button key={index} component={Link} to={text.link}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={<Typography style={{
                fontFamily: 'IranSans',
                fontSize:'14px'
              }}>{text.text}</Typography>} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[, {'text':'خرید اشتراک', 'link':'/shopping-plans'}, {'text':'هدف ما', 'link':'/about'}].map((text, index) => (
            <ListItem button key={index} component={Link} to={text.link}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={<Typography style={{
                fontFamily: 'IranSans',
                fontSize:'14px'
              }}>{text.text}</Typography>} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Routs />
            {/* <StickyFooter /> */}
      </main>
    </div>
  );
}
