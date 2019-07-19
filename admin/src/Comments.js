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

class Comments extends React.Component {
    
    constructor (props) {
        super(props);
        
        // console.info(props.record.productsquestions);

        // change flat list into tree list
        // this.state.tree = this.unflatten(props.record.productsquestions);
        console.info(this.props.record.productsquestions);
    }
    
    componentDidMount () {
       
    }
    
    render () {

      var data = [],
          mappedArr = {},
          arrElem,
          mappedElem;

      // First map the nodes of the array to an object -> create a hash table.
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
                            <Link href="http://www.google.com">
                              reply
                            </Link>
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