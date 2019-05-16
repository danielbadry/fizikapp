import React from 'react';
import { List, Datagrid, TextField, Create, SimpleForm, TextInput, ImageInput, ImageField, SelectInput } from 'react-admin';

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