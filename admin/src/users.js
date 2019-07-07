import React from 'react';
import { List, Datagrid, Create, SimpleForm, TextInput,
         ImageInput, ImageField, SelectInput, Show, TabbedShowLayout,
         Tab,ReferenceManyField, TextField , DateField, EditButton,NumberField,
         BooleanField,      
        } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import BestUsersChart  from './BestUsers';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import SwitchListSecondary from './UserManageTab';
import UserFinancialTab from './UserFinancialTab';
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
                
            <Datagrid rowClick="show">
                <TextField source="fullName" />
                <TextField source="lastLogin" />
                <TextField source="role" />
                <TextField source="fCoin" />
                <TextField source="totalPurchase" />
                <TextField source="email" />
                <TextField source="userName" />
                <TextField source="createdAt" />
                <TextField source="numberOfInvitation" />
                <TextField source="subType" />
            </Datagrid>
        
            </Tab>
                <Tab label="financial" path="financial">
                <UserFinancialTab />
            </Tab>

            <Tab label="manage" path="manage">
                <SwitchListSecondary />
            </Tab>
            
        </TabbedShowLayout>
    </Show>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="email" />
            <ImageInput source="thumbnail" label="Related pictures" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <SelectInput source="gender" choices={[
                { id: '0', name: 'Administrator' },
                { id: '1', name: 'Editor' },
                { id: '2', name: 'Author' },
                { id: '3', name: 'Contributor' },
                { id: '4', name: 'Subscriber' },
                { id: '5', name: 'Super Admin' },
            ]} />
        </SimpleForm>
    </Create>
);

export const UsersList = props => (

    <List {...props}>
        
        <Datagrid rowClick="show">
            <TextField source="fullName" />
            <TextField source="userName" />
            <TextField source="lastLogin" />
            <TextField source="role" />
            <TextField source="fCoin" />
            <TextField source="totalPurchase" />
            <TextField source="email" />
            <TextField source="createdAt" />
            <TextField source="numberOfInvitation" />
            <TextField source="subType" />
        </Datagrid>
        
    </List>
        
);