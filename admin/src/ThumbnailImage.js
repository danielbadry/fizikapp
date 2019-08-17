import React from 'react';
import PropTypes from 'prop-types';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';

const styles = {
    
    onlineUser: {
        borderColor: '#39a739',
        borderWidth: '4px',
        borderStyle: 'solid'
    },
    
    offlineUser: {
        borderColor: '#ccc',
        borderWidth: '4px',
        borderStyle: 'solid'
    },
    
    suspendedUser: {
        borderColor: '#ccc',
        borderWidth: '4px',
        borderStyle: 'solid'
    }

  };

function Thumbnail(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <ListItemAvatar>
                {(props.record.isOnline) ? 
                <Avatar className={classes.onlineUser} title={props.record.firstName + ' ' + props.record.lastName} src={props.record[props.source]} />
                :
                <Avatar className={classes.offlineUser} title={props.record.firstName + ' ' + props.record.lastName} src={props.record[props.source]} />
                }
            </ListItemAvatar>
        </React.Fragment>
    );
}

Thumbnail.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Thumbnail);



// const Thumbnail = ({source,record = {}}) =>
//     <ListItemAvatar>
//         <Avatar alt="Remy Sharp" src={record[source]} />
//     </ListItemAvatar>;
// Thumbnail.PropTypes = {
//     label: PropTypes.string,
//     record: PropTypes.object,
//     source: PropTypes.string.isRequired
// }
// export default Thumbnail;