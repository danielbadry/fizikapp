import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import Thumbnail from './ThumbnailImage';

export const PoliceList = props => (
    <List {...props}>
        <Datagrid>
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="userName" label="username" />
            <TextField source="name" label="name" />
            <TextField source="message" label="warning" />
            <TextField source="jalaaliFullUserFriendlyCreatedDate" label="date" />
        </Datagrid>
    </List>
);