import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import Thumbnail from './ThumbnailImage';

export const PoliceList = props => (
    <List {...props}>
        <Datagrid>
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="name" label="name" />
            <TextField source="userName" label="username" />
            <TextField source="message" label="warning" />
            <TextField source="jalaaliCreatedDate" label="jalaali Created Date" />
            <TextField source="jalaaliUserFriendlyCreatedDate" label="User Friendly Date" />
        </Datagrid>
    </List>
);