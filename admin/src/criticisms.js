import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import MyTextField from './MyTextfield';
import Button from '@material-ui/core/Button';
import Thumbnail from './ThumbnailImage';

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
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="userName" />
            <TextField source="name" />
            <TextField source="message" />
            <TextField source="response" />
            <TextField source="jalaaliCreatedDate" />
            <TextField source="jalaaliUserFriendlyCreatedDate" />
        </Datagrid>
    </List>
);