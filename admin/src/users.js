import React from 'react';
import { List, Datagrid, Create, SimpleForm, TextInput,
         ImageInput, ImageField, SelectInput, Show, TabbedShowLayout,
         Tab,ReferenceManyField, TextField , DateField, EditButton,NumberField,
         BooleanField,      
        } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import  BestUsersChart  from './BestUsers';
export const userShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            
            <Tab label="information">
                <TextField label="Id" source="id" />
                <TextField source="title" />
                <TextField source="teaser" />
            </Tab>
            
            <Tab label="activity" path="activity">
                <ReferenceManyField reference="comments" target="post_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="body" />
                        <DateField source="created_at" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            
            <Tab label="manage" path="manage">
                <TextField label="Password (if protected post)" source="password" type="password" />
                <DateField label="Publication date" source="published_at" />
                <NumberField source="average_note" />
                <BooleanField label="Allow comments?" source="commentable" defaultValue />
                <TextField label="Nb views" source="views" />
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
    <React.Fragment>
        <List {...props}>
            
            <Datagrid rowClick="show">
                <TextField source="id" />
                <TextField source="fullName" />
                {/* <TextField source="lastName" /> */}
                <TextField source="role" />
                <TextField source="fCoin" />
                <TextField source="email" />
                <TextField source="userName" />
                <TextField source="createdAt" />
                {/* <TextField source="updatedAt" /> */}
            </Datagrid>
            
        </List>
        <Card>
            <CardHeader title="best user Analytics" />
                <CardContent>
                    <BestUsersChart />
                </CardContent>
            </Card>
    </React.Fragment>
);