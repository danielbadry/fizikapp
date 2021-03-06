import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ShoppingPlansPurchaseChart from './ShoppingPlansPurchaseChart';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Thumbnail from './ThumbnailImage';
import { Pagination } from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import MyUrlField from './MyUrlField';

import {Show, TabbedShowLayout, Tab, NumberField,BooleanField,
    List, ReferenceManyField, Datagrid, TextField, DateField, EditButton, UrlField  } from 'react-admin';
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

const ShopPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const ShopsList = props => (
    <React.Fragment>
        <List {...props} pagination={<ShopPagination />}>
            <Datagrid >{/*  rowClick="show" */}
                <Thumbnail source="thumbnail" label="thumbnail" />
                <MyUrlField label="username"/>
                <TextField source="userInfo.fullName" label="name" />
                <TextField source="type" label="type" />
                <TextField source="price" label="amount" />
                <TextField source="jalaaliFullUserFriendlyCreatedDate" label="purchased Date" />

            </Datagrid>
        </List>
        <Card>
            <CardHeader title="shopping plans purchase chart" />
                <CardContent>
                    <ShoppingPlansPurchaseChart />
                </CardContent>
        </Card>
    </React.Fragment>
);