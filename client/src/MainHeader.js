import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PrimarySearchAppBar from "./AppBar";

class MainHeader extends React.Component {
    render() {
        return (
          <div>
            <Paper>
              <Button 
                variant="outlined"
                href="exercises"
                style={{
                  fontFamily: "IranSans"
                }}
                >
                آموزش
              </Button>
    
              <Button 
                variant="outlined" 
                href="exercises"
                style={{
                  fontFamily: "IranSans"
                }}
                >
                حل تمرین و تست
              </Button>
    
              <Button 
                variant="outlined" 
                href="/requests"
                style={{
                  fontFamily: "IranSans"
                }}
                >
                درخواست ها
              </Button>

              <Button 
                variant="outlined" 
                href="/definitions"
                style={{
                  fontFamily: "IranSans"
                }}
                >
                تعریفی ها
              </Button>

              <Button 
                variant="outlined" 
                href="/shopping-plans"
                style={{
                  fontFamily: "IranSans"
                }}
                >
                طرح خرید
              </Button>
            </Paper>
            <Paper>
              {/* <PrimarySearchAppBar /> */}
            </Paper>
          </div>
        )
    }
}

export default MainHeader;