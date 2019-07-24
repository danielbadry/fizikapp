import React from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField, ShowButton, EditButton, DateInput } from 'react-admin';
        import RichTextInput from 'ra-input-rich-text';

import Thumbnail from './ThumbnailImage';
import RequestsUsersAnswer from './RequestsUsersAnswer';
import AnswerToRequestForm from './AnswerToRequestForm';

export const RequestShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="question">
                <TextField label="Id" source="id" />
                <TextField source="title" />
                <TextField source="teaser" />
            </Tab>
            
            <Tab label="my answer" path="myanswer">
                <AnswerToRequestForm {...props} />
            </Tab>
            <Tab label="users answer" path="usersanswer" >
                <RequestsUsersAnswer />
            </Tab>
            
        </TabbedShowLayout>
    </Show>
);

const PostPanel = ({ id, record, resource }) => (
    <div>hello</div>
);

export const RequestList = props => (
    
    <List {...props}>
        <Datagrid rowClick="show">
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="title" />
            <TextField source="userName" />
            <TextField source="name" />
            <TextField source="jalaaliCreatedDate" />
            <TextField source="jalaaliUserFriendlyCreatedDate" />
            <ShowButton />
        </Datagrid>
    </List>
);