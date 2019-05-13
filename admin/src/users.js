import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
export const UsersList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="email" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
        </Datagrid>
    </List>
);