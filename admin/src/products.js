import React from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField, SimpleShowLayout, ChipField, FileField, AutocompleteArrayInput ,FileInput, ImageField, ImageInput, NumberInput, BooleanInput, DateTimeInput, List, Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, ShowButton, EditButton } from 'react-admin';

import Chips from './chips';

export const ProductCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="title" />
            {/* <RichTextInput source="description" /> */}
            <Chips source="tags"></Chips>
            <NumberInput source="price" />
            <BooleanInput source="isEnable" />
            <ImageInput source="thumbnail" label="Related pictures" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <FileInput source="files" label="Related files" accept="application/pdf">
                <FileField source="file" title="upload file" />
            </FileInput>
            <DateTimeInput source="publishedDate" />
        </SimpleForm>
    </Create>
);

export const ProductEdit = (props) => (
    <Edit title="Product edit" {...props}>
        <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <TextInput source="title" />
            <LongTextInput source="teaser" />
            <DateInput label="Publication date" source="published_at" />
        </SimpleForm>
    </Edit>
);

export const ProductShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField label="Id" source="id" />
                <TextField source="title" />
                <TextField source="teaser" />
            </Tab>
            <Tab label="body" path="body">
                <RichTextField source="body" addLabel={false} />
            </Tab>
            <Tab label="qa" path="qa">
                <TextField label="Password (if protected post)" source="password" type="password" />
                <DateField label="Publication date" source="published_at" />
                <NumberField source="average_note" />
                <BooleanField label="Allow comments?" source="commentable" defaultValue />
                <TextField label="Nb views" source="views" />
            </Tab>
            <Tab label="reports" path="report" >
                Reports
            </Tab>
            <Tab label="comments" path="comments">
                <ReferenceManyField reference="comments" target="post_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="body" />
                        <DateField source="created_at" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

const PostPanel = ({ id, record, resource }) => (
    <div>hello</div>
);

export const ProductsList = props => (
    
    <List {...props}>
        <Datagrid rowClick="show" expand={<PostPanel />}>
            <TextField source="id" />
            <ImageField source="thumbnail" />
            <TextField source="name" label="Name" />
            <TextField source="title" label="Title" />
            <ChipField source="tags" label="Tags" />
            <TextField source="price" label="Price" />
            <BooleanField source="isEnable" label="Enable" />
            <BooleanField source="downloadable" label="Downloadable" />
            <TextField source="createdAt" label="Created" />
            <TextField source="updatedAt" label="Update" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);