import React from 'react';
import PropTypes from 'prop-types';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const Thumbnail = ({source,record = {}}) =>
    <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={record[source]} />
    </ListItemAvatar>;
// Thumbnail.PropTypes = {
//     label: PropTypes.string,
//     record: PropTypes.object,
//     source: PropTypes.string.isRequired
// }
export default Thumbnail;