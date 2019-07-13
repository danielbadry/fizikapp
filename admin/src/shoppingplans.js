import React from 'react';
import { List, Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton } from 'react-admin';

export const ShoppingplansCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="period" />
            <TextInput source="price" />
        </SimpleForm>
    </Create>
);

export const ShoppingplansEdit = (props) => (
    <Edit title="Shoppingplans edit" {...props}>
        <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <TextInput source="title" />
            <LongTextInput source="teaser" />
            <DateInput label="Publication date" source="published_at" />
        </SimpleForm>
    </Edit>
);

export const ShoppingplansList = props => (
    <React.Fragment>
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="title" />
                <TextField source="price" />
                <TextField source="isDelete" />
                <TextField source="downloadable" />
                <TextField source="createdAt" />
                <TextField source="updatedAt" />
            </Datagrid>
        </List>
        
    </React.Fragment>
);