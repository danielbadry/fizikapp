import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PrimarySearchAppBar from "./AppBar";

class MainHeader extends React.Component {
    render() {
        return (
          <div>
            <Paper>
              <Button variant="contained">
                آموزش
              </Button>
    
              <Button variant="contained" color="primary">
                حل تمرین و تست
              </Button>
    
              <Button variant="contained" color="secondary">
                درخواست ها
              </Button>
            </Paper>
            <Paper>
              <PrimarySearchAppBar />
            </Paper>
          </div>
        )
    }
}

export default MainHeader;