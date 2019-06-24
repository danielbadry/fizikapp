import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import MyTextField from './MyTextfield';
import Button from '@material-ui/core/Button';

const CriticismsPanel = ({ id, record, resource }) => (
    <React.Fragment>
    <MyTextField
        id="filled-multiline-flexible"
        label="response"
        multiline
        rowsMax="4"
        margin="normal"
      />
    <Button variant="outlined" color="primary">
      send
    </Button>  
    </React.Fragment>
);

export const CriticismsList = props => (
    <List {...props}>
        <Datagrid expand={<CriticismsPanel />}>
            <TextField source="id" />
            <TextField source="idUser" />
            <TextField source="comment" />
        </Datagrid>
    </List>
);