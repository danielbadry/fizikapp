import React from 'react';
import Typography from '@material-ui/core/Typography';

class ProductAppBar extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Typography>like 3 / dislike 4</Typography>
                <Typography>2019 june 22</Typography>
            </React.Fragment>
        )
    }
}

export default ProductAppBar;