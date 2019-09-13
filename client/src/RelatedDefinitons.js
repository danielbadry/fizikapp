import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

class RealtedDefinitions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
relatedDefinitions : []
        }
    }
    componentDidMount() {
        fetch(`http://localhost:1337/definitions/relateddefinitions`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(relatedDefinitions => {
                this.setState((state, props) => {
                return {relatedDefinitions: relatedDefinitions};
                });
            });
    }
render() {
    return(
        <div
        style={{
            fontFamily: "IranSans",
            direction: 'rtl'
        }}
        >
            <List>
        {this.state.relatedDefinitions.map(
                (item, index) =>
                <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={<Link href={'https://www.google.com'}
          style={{
            fontFamily: "IranSans",
            textAlign: 'right',
            float: 'right'
          }}
          >
          {item.name}
          </Link>}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                style={{
                    fontFamily: "IranSans",
                    textAlign: 'right',
                    float: 'right'
                }}
                variant="body2"
                // className={classes.inline}
                color="textPrimary"
              >
                {item.title}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
            )
        }
        </List>
        </div>
        
    )
}
}
export default RealtedDefinitions;