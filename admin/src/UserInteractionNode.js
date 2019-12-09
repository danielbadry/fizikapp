/*
        TODO: 
        1 - it's better to add new messages in memory tree and then sync it with server
    */
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

import PropTypes from 'prop-types';
// import Di from './d';

class UserInteractionNode extends React.Component {
    
    constructor (props) {
      super(props);
      this.state = {
        interactionData: []
      }
    }

    componentDidMount () {
      this.fetchProductsQuestions();
    }

    showReplyMessage () {
      return this.replyMessage;
    }

    sendReplyToQuestion (item) {
      const dataRecord = {
        message:this.replyMessage,
        parentId: (item != null) ? item.id : '',
        modelId: this.props.modelid,
        model: this.props.model,
        type: this.props.type
      }
      const token = localStorage.getItem('token');
      fetch(process.env.REACT_APP_API_URL+'userinteractions', {
        method: 'POST', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
        },
        body : JSON.stringify(dataRecord), 
        redirect: 'follow',
        referrer: 'no-referrer',
        })
        .then(response => response.json())
        .then((myJson) => {
          this.replyMessage = '';
            this.fetchProductsQuestions();
            
        });

      // fetch(process.env.REACT_APP_API_URL+'userinteractions', {
      //     method: 'POST', 
      //     body : JSON.stringify(dataRecord), 
      //     headers: {}
      //   }
      // )
      // .then((response) => {
      //   return response.json();
      // })
      // .then((myJson) => {
      //   this.replyMessage = '';
      //     this.fetchProductsQuestions();
          
      // })
      // .catch((e) => {
      //     // showNotification('Error: comment not approved', 'warning')
      // });
    }

    setReplyMessage = (e) => {
      this.replyMessage = e.target.value;
    };

    fetchProductsQuestions = () => {
      fetch(process.env.REACT_APP_API_URL+`/userinteractions?model=${this.props.model}&modelid=${this.props.modelid}&type=${this.props.type}`, {
        method: 'GET', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        })
        .then(response => response.json())
        .then(interactionData => {
            this.setState({
              interactionData: interactionData
            }, function() {
                
            });
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
      for(var i = 0, len = this.state.interactionData.length; i < len; i++) {
        arrElem = this.state.interactionData[i];
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
              <React.Fragment>
              <List>
                {data.map((m,i) => {
                  return (
                    <ListItem key={i} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar 
                          title={m.userInfo.firstName + ' ' + m.userInfo.lastName} 
                          alt={m.userInfo.firstName + ' ' + m.userInfo.lastName} 
                          src={m.userInfo.thumbnail} />
                      </ListItemAvatar>
                      <ListItemText

                        primary={<Typography 
                          style={{ 
                            fontFamily: 'IranSans_UltraLight',
                            color:'black'
                          }}
                          >
                          {m.message}
                          </Typography>}
                        
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                            <Link 
                              href={m.userInfo.url}
                              style={{ fontFamily: 'IranSans_UltraLight' }}
                              >
                              {m.userInfo.firstName + ' ' + m.userInfo.lastName}
                            </Link>
                              
                            </Typography>
                            &nbsp;
                            <Typography
                            style={{ fontFamily: 'IranSans_UltraLight' }}
                            >
                            {m.jalaaliUserFriendlyCreatedDate}
                            </Typography> 
                            {(localStorage.getItem('token')) ? 
                            <div>
                            <TextField
                                margin="dense"
                                label="ضضنظرتان را بنویسید"
                                type="text"
                                onChange={this.setReplyMessage.bind()}
                                fullWidth
                                InputLabelProps={{
                                  style: {
                                      fontFamily: "IranSans",
                                      fontSize:'12px'
                                  }
                                }}
                                InputProps={{
                                    style: {
                                        fontFamily: "IranSans",
                                        fontSize:'12px'
                                    }
                                }}
                            />
                            
                            <Button 
                              variant="contained" 
                              onClick= {this.sendReplyToQuestion.bind(this, m)}
                              color="primary"
                              style={{ 
                                fontFamily: 'IranSans_UltraLight'
                              }}
                              >
                              ارسال پیام
                            </Button>
                            </div>
                            :null}
                            &nbsp;
                            {m.children && <Menu data={m.children} />}
                          </React.Fragment>
                        }
                      />
                      
                    </ListItem>
                  );
                })}
              </List>
              </React.Fragment>
            );
          }

        return (
          <React.Fragment>
            {(localStorage.getItem('token')) ? 
            <div>
            <TextField
                margin="dense"
                label="نظرتان را بنویسید"
                type="text"
                // value={this.showReplyMessage.bind()}
                onChange={this.setReplyMessage.bind()}
                fullWidth
                InputLabelProps={{
                  style: {
                      fontFamily: "IranSans",
                      fontSize:'12px'
                  }
                }}
                InputProps={{
                    style: {
                        fontFamily: "IranSans",
                        fontSize:'12px'
                    }
                }}
            />
            
            <Button 
              variant="contained" 
              onClick= {this.sendReplyToQuestion.bind(this, null)}
              color="primary"
              style={{ 
                fontFamily: 'IranSans_UltraLight'
              }}
              >
              ارسال پیام
            </Button>
            </div>
            :null}
            <Menu data={data} />
          </React.Fragment>
        )
    }

}

export default UserInteractionNode;