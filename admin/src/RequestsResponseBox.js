import React from 'react';
import Button from '@material-ui/core/Button';
import { push } from 'react-router-redux';
import { CREATE, withDataProvider} from 'react-admin';
import MyTextField from './MyTextfield';
import { UPDATE } from 'ra-core';

class RequestsResponseBox extends React.Component {
    
    constructor (props) {
        super (props);
        this.state = {
            response : ''
        }
    }
    
    componentDidMount () {
        
    }
    
    handleChange = (e) => {
        e.persist();
        this.setState((state, props) => {
            return {response: e.target.value};
          });
    }
    
    sendAdminResponse = () => {
        console.info('sendAdminResponse happend');
        const { dataProvider, dispatch, record } = this.props;
        const ResponseRecord = { 
            adminAnswer: this.state.response,
            id: record.id,
        };
        dataProvider(UPDATE, 'requests', { id: record.id, data: ResponseRecord })
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
                    label="what do you think?"
                    multiline
                    rowsMax="4"
                    margin="normal"
                    onChange={this.handleChange.bind(this)}
                />
                <br />
                <Button 
                    label="Approve" 
                    onClick={this.sendAdminResponse} 
                    >
                    send answer
                </Button>
            </React.Fragment>
        )
    }

}

export default withDataProvider(RequestsResponseBox);