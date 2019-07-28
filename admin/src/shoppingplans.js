import React from 'react';
import { List,NumberInput, Create, Edit, SimpleForm, 
        DisabledInput, TextInput, DateInput, LongTextInput, Datagrid, 
        TextField, ShowButton, EditButton, TabbedShowLayout, Show, Tab } from 'react-admin';

export const ShoppingplansCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="type" label="type" />
            <NumberInput source="duration" label="duration" />
            <NumberInput source="firstPrise" label="first Prise" />
            <NumberInput source="secondPrise" label="second Prise" />
        </SimpleForm>
    </Create>
);

export const ShoppingplansEdit = (props) => (
    <Edit title="Shoppingplans edit" {...props}>
        <SimpleForm>
            <TextInput source="type" label="type" />
            <NumberInput source="duration" label="duration" />
            <NumberInput source="firstPrise" label="first prise" />
            <NumberInput source="secondPrise" label="second prise" />
        </SimpleForm>
    </Edit>
);

export const ShoppingplansShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>

            <Tab label="information">
                <TextField source="id" label="Id" />
                <TextField source="type" label="type" />
                <TextField source="firstPrise" label="first prise" />
                <TextField source="secondPrise" label="second prise" />
                <TextField source="duration" label="duration" />
            </Tab>

        </TabbedShowLayout>
    </Show>
);

export const ShoppingplansList = props => (
    <React.Fragment>
        <List {...props}>
            <Datagrid>
                <TextField source="type" label="type" />
                <TextField source="firstPrise" label="first prise" />
                <TextField source="secondPrise" label="second prise" />
                <TextField source="duration" label="duration" />
                <TextField source="jalaaliFullUserFriendlyUpdatedDate" label="update date" />
                <EditButton />
                <ShowButton />
            </Datagrid>
        </List>
        
    </React.Fragment>
);