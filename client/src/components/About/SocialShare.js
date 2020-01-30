import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class SocialShare extends React.Component{
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const classes = {
            svgIcons: {
              width: '35px',
              display: 'inline-block',
              height: '35px',
              margin: '8px',
              // backgroundColor: 'cadetblue',
              // borderRadius: '50%',
              cursor: 'pointer',
              backgroundImage:"url(../telegram.svg)"
            }
          
          };
        return (
              <Link 
                component={RouterLink} 
                to="/about"
                target="_blank"
                style={classes.svgIcons}
                >
              </Link>
        )
    }
}
export default SocialShare;