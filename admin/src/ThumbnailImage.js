import React from 'react';
import PropTypes from 'prop-types';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
function Thumbnail(props) {
    let src;
    if (typeof(props.record.data) != 'undefined'){
        src = props.record.data.thumbnail;
    } else {
        src = '';
    }
    return (
        <React.Fragment>
            <ListItemAvatar>
                <Avatar 
                    title={'title'} 
                    src={src} 
                    />
            </ListItemAvatar>
        </React.Fragment>
    );
}

Thumbnail.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default Thumbnail;