import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
export const CriticismsList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="userName" />
            <TextField source="comment" />
        </Datagrid>
    </List>
);