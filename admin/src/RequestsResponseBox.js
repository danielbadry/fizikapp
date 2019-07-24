import React from 'react';
import Button from '@material-ui/core/Button';
import { push } from 'react-router-redux';
import { UPDATE, withDataProvider} from 'react-admin';
import MyTextField from './MyTextfield';

class RequestsResponseBox extends React.Component {
    
    constructor (props) {
        super (props);
        this.state = {
            response : ''
        }
        console.info('props:', props);
    }
    
    componentDidMount () {
        
    }
    
    handleChange = (e) => {
        e.persist();
        this.setState((state, props) => {
            return {response: e.target.value};
          });
    }
    
    handleClick = () => {

        const { dataProvider, dispatch, record } = this.props;
        const updatedRecord = { response: this.state.response };
        dataProvider(UPDATE, 'requests', { id: record.id, data: updatedRecord })
            .then(() => {
               
               dispatch(push('/requests'));
            })
            .catch((e) => {
               
            });
    }

    render () {
        return (
            <React.Fragment>
                <MyTextField
                    id="filled-multiline-flexible"
                    label="response"
                    multiline
                    rowsMax="4"
                    margin="normal"
                    onChange={this.handleChange.bind(this)}
                />
                <Button 
                    label="Approve" 
                    onClick={this.handleClick} 
                    >
                    approve
                </Button>
            </React.Fragment>
        )
    }

}

export default withDataProvider(RequestsResponseBox);