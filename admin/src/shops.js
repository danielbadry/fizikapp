import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
export const ShopsList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="productId" />
            <TextField source="shodDate" />
            <TextField source="count" />
            <TextField source="isDeleted" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
        </Datagrid>
    </List>
);