import React from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ChipField, FileField ,FileInput,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField, ShowButton, EditButton, DateInput ,ReferenceInput } from 'react-admin';


import TagComponent from './TagComponent';
import QuizManager from './QuizManager';
import ProductReports from './ProductReports';
import Mycheckbox from './MyNewField2';
import Thumbnail from './ThumbnailImage';
import Comments from './Comments';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// import RichTextInput from 'ra-input-rich-text';
import RichTextInput from 'aor-rich-text-input';
export const ProductCreate = (props) => (
    <Create {...props} >
        
        <SimpleForm>
            <TextInput source="name" label="name" />
            <LongTextInput source="title" label="title" />
            {/*
            TODO: add richTextInput here
            */}
            <LongTextInput source="description" label="description" />
            <TagComponent source="tags" label="tags" />
            <NumberInput source="price" label="price" />
            {/*
            TODO: add boolean field here
            */}
            
            {/* <Mycheckbox label="categories" />   */}
            
            <ImageInput source="thumbnail" label="thumbnail image" accept="image/*">
                <ImageField source="thumbnail" title="title" />
            </ImageInput>
            
            <FileInput source="files" label="Related files" accept="application/pdf">
                <FileField source="src" title="title" />
            </FileInput>
            {/*TODO: use DateTimeInput instead because we want to publish a video on a certain time!*/}
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
            <BooleanInput
              source="isEnable"
              label="enable"
            />
        </SimpleForm>
    </Edit>
);

export const ProductShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>

            <Tab label="information">
                <TextField label="Id" source="id" />
                <TextField source="title" />
                <TextField source="teaser" />
            </Tab>

            <Tab label="qa" path="qa">
                <Comments {...props} />
            </Tab>

            <Tab label="reports" path="report" >
                <ProductReports />
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

            <Tab label="quiz" path="quiz">
                <QuizManager />
            </Tab>

        </TabbedShowLayout>
    </Show>
);

export const ProductsList = props => (
    
    <List {...props}>
        <Datagrid rowClick="show">
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="name" label="Name" />
            <TextField source="title" label="Title" />
            <ChipField source="tags" label="Tags" />
            <TextField source="price" label="Price" />
            <BooleanField source="isEnable" label="Enable" />
            <BooleanField source="hasQuiz" label="hasQuiz" />
            <TextField source="jalaaliCreatedDate" label="jalaali Created Date" />
            <TextField source="jalaaliUserFriendlyCreatedDate" label="User Friendly Date" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);