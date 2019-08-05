import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import Thumbnail from './ThumbnailImage';
import { Pagination } from 'react-admin';

const PolicePagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const PoliceList = props => (
    <List {...props} pagination={<PolicePagination />}>
        <Datagrid>
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="userName" label="username" />
            <TextField source="name" label="name" />
            <TextField source="message" label="warning" />
            <TextField source="jalaaliFullUserFriendlyCreatedDate" label="date" />
        </Datagrid>
    </List>
);