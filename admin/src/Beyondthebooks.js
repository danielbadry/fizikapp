import React from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ChipField, FileField ,FileInput,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField,ArrayField,SingleFieldList, SelectInput, ShowButton, EditButton, DeleteButton,
        DateInput ,ReferenceInput,required,
        minLength,
        maxLength,
        minValue,
        maxValue,
        number,
        regex,
        email,
        choices } from 'react-admin';

import { Pagination } from 'react-admin';
import TagComponent from './TagComponent';
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

import UploadComponent from './UploadComponent';
import ContentUserInteraction from "./ContentUserInteraction";
import MyEditor  from './TextEditor';

const validateBeyondTheBookName = [required(), minLength(5), maxLength(30)];
const validateBeyondTheBookTitle = [required(), minLength(10), maxLength(100)];
const validateBeyondTheBookDuration = [required(), minLength(1), maxLength(2000), minValue(1)];

export const BeyondthebooksCreate = (props) => (
    <Create {...props} >
        
        <SimpleForm redirect="list" submitOnEnter={true}>
            <TextInput source="name" label="name" validate={validateBeyondTheBookName} />
            <LongTextInput source="title" label="title" validate={validateBeyondTheBookTitle} />
            <MyEditor label="description" />
            {/* <LongTextInput source="description" label="description" /> */}
            <TagComponent source="tags" label="select tags (optional)" />
            <UploadComponent
                type="thumbnail"
                model="beyondthebooks"
                />
            <TextInput source="duration" label="duration in seconds" type="number" validate={validateBeyondTheBookDuration} />

            <UploadComponent 
                type="file"
                model="beyondthebooks"
                />
        </SimpleForm>
    </Create>
);

export const BeyondthebooksEdit = (props) => (
    <Edit title="Product edit" {...props}>
        <SimpleForm>
            <TextInput source="name" label="name" />
            <LongTextInput source="title" label="title" />
            <LongTextInput source="description" label="description" />
        </SimpleForm>
    </Edit>
);

const qaConfig = [
    {
        type:'qa',
        label:'پرسش و پاسخ',
        model:'beyondthebook'
    },
]

const cmConfig = [
    {
        type:'qa',
        label:'پرسش و پاسخ',
        model:'beyondthebook'
    },
]

export const BeyondthebooksShow = (props) => (
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
            <ContentUserInteraction 
                config={qaConfig}
                modelid={props.id}
                />
            </Tab>

            <Tab label="reports" path="report" >
                <ProductReports />
            </Tab>

            <Tab label="comments" path="comments">
            <ContentUserInteraction 
                config={cmConfig}
                modelid={props.id}
                />
            </Tab>

        </TabbedShowLayout>
    </Show>
);
const BeyondthebookPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const BeyondthebooksList = props => (
    
    <List {...props} pagination={<BeyondthebookPagination />}>
        <Datagrid rowClick="show">
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField 
                source="name" 
                label="Name" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black'
                }}
                />
            <ArrayField source="tagsArray">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
            <TextField 
                source="jalaaliFullUserFriendlyCreatedDate" 
                label="Date" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);