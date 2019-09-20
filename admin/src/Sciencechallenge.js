import React from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ChipField, FileField ,FileInput,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField,ArrayField,SingleFieldList, SelectInput, ShowButton, EditButton, DeleteButton,
        DateInput ,ReferenceInput } from 'react-admin';

import { Pagination } from 'react-admin';
import TagComponent from './TagComponent';
import CategoryComponent from './CategoryComponent';
import QuizManager from './QuizManager';
import ProductReports from './ProductReports';
import Mycheckbox from './MyNewField2';
import Thumbnail from './ThumbnailImage';
import VideoPlayerField from './VideoPlayerField';
import ProductsQuestions from './ProductsQuestions';
import ProductsComments from './ProductsComments';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// import RichTextInput from 'ra-input-rich-text';
import RichTextInput from 'aor-rich-text-input';

export const SciencechallengeCreate = (props) => (
    <Create {...props} >
        
        <SimpleForm redirect="list">
            <TextInput source="name" label="name" />
            <LongTextInput source="title" label="title" />
            {/*
            TODO: add richTextInput here
            */}
            <LongTextInput source="description" label="description" />
            <TagComponent source="tags" label="tags" />
            
            <CategoryComponent source="category" label="category" />
             
            {/* <NumberInput source="price" label="price" /> */}
            {/*
            TODO: add boolean field here
            */}
            
            {/* <Mycheckbox label="categories" />   */}
            
            <ImageInput source="thumbnail" label="thumbnail image" accept="image/*">
                <ImageField source="thumbnail" title="title" />
            </ImageInput>
            
            <FileInput source="file" label="Related files" accept="video/mp4">
                <FileField source="file" title="title" />
            </FileInput>
            {/*TODO: use DateTimeInput instead because we want to publish a video on a certain time!*/}
        </SimpleForm>
    </Create>
);

export const SciencechallengeEdit = (props) => (
    <Edit title="Sciencechallenge edit" {...props}>
        <SimpleForm>
            <TextInput source="name" label="name" />
            <LongTextInput source="title" label="title" />
            <LongTextInput source="description" label="description" />
        </SimpleForm>
    </Edit>
);

export const SciencechallengeShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>

            <Tab label="information">
                <TextField source="id" label="Id" />
                <Thumbnail source="thumbnail" label="thumbnail" />
                <TextField source="summary.title" label="title" />
                <TextField source="summary.name" label="name" />
                <VideoPlayerField />
                <TextField source="summary.description" label="description" />
                <ArrayField source="summary.tagsArray" label="tags">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ArrayField>
            </Tab>

            <Tab label="qa" path="qa">
                <ProductsQuestions />
            </Tab>

            <Tab label="comments" path="comments">
                <ProductsComments />
            </Tab>

        </TabbedShowLayout>
    </Show>
);
const SciencechallengePagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const SciencechallengeList = props => (
    
    <List {...props} pagination={<SciencechallengePagination />}>
        <Datagrid rowClick="show">
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="name" label="Name" />
            <ArrayField source="tagsArray">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
            <BooleanField source="isEnabled" label="Enable" />
            <BooleanField source="hasQuiz" label="hasQuiz" />
            <TextField source="jalaaliFullUserFriendlyCreatedDate" label="Date" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);