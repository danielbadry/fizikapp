import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {Show, TabbedShowLayout, Tab, NumberField,BooleanField,
    List, ReferenceManyField, Datagrid, TextField, DateField, EditButton } from 'react-admin';
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
    export const shopShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            
            <Tab label="information">
                <TextField label="Id" source="id" />
                <TextField source="title" />
                <TextField source="teaser" />
            </Tab>
            
        </TabbedShowLayout>
    </Show>
);

export const ShopsList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="userId" label="user ID" />
            <TextField source="createdAt" label="shop Date" />
            <TextField source="tarhName" />
            <TextField source="status" />
        </Datagrid>
    </List>
);