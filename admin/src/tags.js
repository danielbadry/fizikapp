import React from 'react';
import { List, Create, Edit, SimpleForm, DisabledInput,
         TextInput,Datagrid, TextField, EditButton
        }
         from 'react-admin';
         
export const TagCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

export const TagEdit = (props) => (
    <Edit title="tag edit" {...props}>
        <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);


export const TagsList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" label="Name" />
            <TextField source="count" label="Count" />
            <TextField source="jalaaliCreatedDate" label="Jalaali date" />
            <TextField source="jalaaliUserFriendlyCreatedDate" label="Jalaali user friendly date" />
            <EditButton />
        </Datagrid>
    </List>
);