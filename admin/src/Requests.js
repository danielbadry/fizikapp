import React from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField, ShowButton, EditButton, DateInput, TabbedForm, FormTab } from 'react-admin';
        import RichTextInput from 'ra-input-rich-text';

import Thumbnail from './ThumbnailImage';
import RequestsUsersAnswer from './RequestsUsersAnswer';
import RequestsResponseBox from './RequestsResponseBox';

export const RequestEdit = (props) => (
    <Edit title="Product edit" {...props}>
       
    </Edit>
);

export const RequestShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            
            <Tab label="question">
                <TextField source="thumbnail" label="title" />
                <TextField source="message" />
            </Tab>
            
            <Tab label="users answer" path="usersanswer" >
                <RequestsUsersAnswer {...props} />
            </Tab>
            
        </TabbedShowLayout>
    </Show>
);

const RequestPanel = ({ id, record, resource }) => (
    <React.Fragment>
        <p><strong>Question:</strong></p>
        <div>{record.message}</div>
        {
            !record.isResponsed ? <RequestsResponseBox record={record} /> : 
            
            <div>
                <p><strong>Admin answer:</strong></p>
                {record.adminAnswer[0].message}
            </div>
    }
    </React.Fragment>
);

export const RequestList = props => (
    <List {...props}>
        <Datagrid rowClick="show" expand={<RequestPanel />}>
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="name" label="name" />
            <TextField source="userName" label="user name" />
            <TextField source="title" label="title" />
            <TextField source="jalaaliCreatedDate" label="jalaali Created Date" />
            <TextField source="jalaaliUserFriendlyCreatedDate" label="User Friendly Date" />
            <BooleanField source="isResponsed" label="isResponsed" label="isResponsed" />
        </Datagrid>
    </List>
);