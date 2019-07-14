import React from 'react';
import {    List, Datagrid, Create, SimpleForm, TextInput,
            ImageInput, ImageField, SelectInput, Show, TabbedShowLayout,
            Tab, TextField, AutocompleteInput, NumberInput
        } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import BestUsersChart  from './BestUsers';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import UserManageTab from './UserManageTab';
import UserFinancialTab from './UserFinancialTab';
import UserActivityGrid from './UserActivityTab';
import Thumbnail from './ThumbnailImage';

export const userShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            
            <Tab label="information">
                <TextField label="Id" source="id" />
                <TextField source="city" />
                <TextField source="email" />
                <TextField source="phoneNumber" />
                <TextField source="gender" />
                <TextField source="grade" />
            </Tab>
            
            <Tab label="activities" path="activities">
                <UserActivityGrid />
            </Tab>
            
            <Tab label="financial" path="financial">
                <UserFinancialTab />
            </Tab>

            <Tab label="manage" path="manage">
                <UserManageTab />
            </Tab>
            
        </TabbedShowLayout>
    </Show>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="first_name" label="first name" />
            <TextInput source="last_name" label="last name" />
            <TextInput source="email" label="email" />
            <TextInput source="username" label="user" />
            <NumberInput source="fcoin" label="default f-coin" />
            <SelectInput source="gender" choices={[
                { id: '0', name: 'male' },
                { id: '1', name: 'female' },
                { id: '2', name: 'others' },
            ]} />
            <AutocompleteInput 
                source="address.country"
                label="country"
                choices={[
                    {id:'iran',name:'iran'},
                    {id:'afghanistan',name:'afghanistan'},
                    {id:'italy',name:'italy'},
                    {id:'russia',name:'russia'},
                    {id:'usa',name:'usa'},
                    {id:'japan',name:'japan'},
                    {id:'turkey',name:'turkey'},
                    {id:'brazil',name:'brazil'},
                    {id:'canada',name:'canada'},
                    {id:'panama',name:'panama'},
                    {id:'belgum',name:'belgum'},
                ]}
                />
            <ImageInput source="thumbnail" label="Related pictures" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            
        </SimpleForm>
    </Create>
);

export const UsersList = props => (

    <List {...props}>
        
        <Datagrid rowClick="show">
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="userName" label="user id" />
            <TextField source="fullName" label="full name" />
            <TextField source="jalaaliRegisterDate" label="last login" />
            <TextField source="totalPurchase" label="total purchase" />
            <TextField source="fCoin" label="f coin" />
            <TextField source="createdAt" label="register date" />
            <TextField source="numberOfInvitation" label="invitations" />
            <TextField source="subType" label="sub type" />
        </Datagrid>
        
    </List>
        
);