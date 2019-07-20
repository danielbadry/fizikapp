import React from 'react';
import Thumbnail from './ThumbnailImage';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Comments extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
          open : false
        }
    }
    
    componentDidMount () {
       
    }
    
    handleClickOpen() {
      this.setState((state, props) => {
        return {open: true};
      });
    }
    
    handleClose() {
      this.setState((state, props) => {
        return {open: false};
      });
    }

    render () {

      var data = [],
          mappedArr = {},
          arrElem,
          mappedElem;
      {/*TODO: we MUST create a component for COMMENT as a tree view!*/}
      // First map the nodes of the array to an object -> create a hash table.

      {/*TODO: we must change the below code to a function!*/} 
      for(var i = 0, len = this.props.record.productsquestions.length; i < len; i++) {
        arrElem = this.props.record.productsquestions[i];
        mappedArr[arrElem.id] = arrElem;
        mappedArr[arrElem.id]['children'] = [];
      }

      for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
          mappedElem = mappedArr[id];
          // If the element is not at the root level, add it to its parent array of children.
          if (mappedElem.parentId) {
            mappedArr[mappedElem['parentId']]['children'].push(mappedElem);
          }
          // If the element is at the root level, add it to first level elements array.
          else {
            data.push(mappedElem);
          }
        }
      }

      const Menu = ({data}) => {
        {/*TODO: we have lots of errors in console for this DOM node style!*/}
            return (
              <List>
                {data.map((m,i) => {
                  return (
                     
                    <ListItem key={i} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={m.message}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              Ali Connors
                            </Typography>
                            
                            {" — 2 days ago - "} 
                            <Link
                              component="button"
                              variant="body2"
                              onClick={this.handleClickOpen.bind(this)}
                            >
                              reply
                            </Link>
                            
                            <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
                              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  To subscribe to this website, please enter your email address here. We will send updates
                                  occasionally.
                                </DialogContentText>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="name"
                                  label="Email Address"
                                  type="email"
                                  fullWidth
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={this.handleClose.bind(this)} color="primary">
                                  Cancel
                                </Button>
                                <Button onClick={this.handleClose.bind(this)} color="primary">
                                  Subscribe
                                </Button>
                              </DialogActions>
                            </Dialog>

                            {m.children && <Menu data={m.children} />}
                          </React.Fragment>
                        }
                      />
                      
                    </ListItem>
                  );
                })}
              </List>
            );
          }

        return (
            <Menu data={data} />
        )
    }

}

export default Comments;