import React from 'react';
import PropTypes from 'prop-types';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        borderColor: '#19ab19',
        borderWidth: '2px',
        borderStyle: 'double'
    },
  };

function Thumbnail(props) {
    console.info('p:', props.record);
    const { classes } = props;
    return (
        <React.Fragment>
            <ListItemAvatar>
                {(props.record.isOnline) ? 
                <Avatar className={classes.root} alt="Remy Sharp" src={props.record[props.source]} />
                :
                <Avatar alt="Remy Sharp" src={props.record[props.source]} />
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