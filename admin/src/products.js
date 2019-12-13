import React, { Fragment } from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ChipField, FileField ,FileInput,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField,ArrayField,SingleFieldList, SelectInput, ShowButton, EditButton, DeleteButton,
        DateInput ,ReferenceInput } from 'react-admin';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Pagination } from 'react-admin';
import TagComponent from './TagComponent';
import Book from './Book';
import QuizManager from './QuizManager';
import ProductReports from './ProductReports';
import Mycheckbox from './MyNewField2';
import Thumbnail from './ThumbnailImage';
import UploadComponent from './UploadComponent';
import VideoPlayerField from './VideoPlayerField';
import ProductsQuestions from './ProductsQuestions';
import ProductsComments from './ProductsComments';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// import RichTextInput from 'ra-input-rich-text';
import RichTextInput from 'aor-rich-text-input';
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
import { change } from 'redux-form';
import ContentUserInteraction from "./ContentUserInteraction";

let formElementValues = {};

const formInformationHolder = (formData) => {
    formElementValues = formData;
}

const GetCategory = () => {
    let res = [];
    fetch(process.env.REACT_APP_API_URL+'/categories/allCategories', { method: 'GET', headers: {}})
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.info('inja', myJson);
        res = [{'id':'1','name':'a'}];
        // return res;
    })
    .catch((e) => {
        // showNotification('Error: comment not approved', 'warning')
    });
    return res;
}

export const ProductCreate = (props) => (
    <Create {...props} >
        
        <SimpleForm redirect="list">
            <TextInput source="name" label="name" />
            <LongTextInput source="title" label="title" />
            <LongTextInput source="description" label="description" />
            <TagComponent source="tags" label="tags" />
            <BooleanInput label="is medal" source="isMedal" />
            
            <Book 
                {...props}
                />
                
            <UploadComponent 
                type="thumbnail"
                model="products"
                />

            <TextInput source="duration" label="duration in seconds" type="number" />

            <UploadComponent 
                type="file"
                model="products"
                />

        </SimpleForm>

    </Create>
);

export const ProductEdit = (props) => (
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
        model:'products'
    },
]

const cmConfig = [
    {
        type:'qa',
        label:'پرسش و پاسخ',
        model:'products'
    },
]

export const ProductShow = (props) => (
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
            <Tab label="qa" path="qa">
                <ContentUserInteraction 
                    config={qaConfig}
                    modelid={props.id}
                    />
            </Tab>
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

            <Tab label="quiz" path="quiz">
                <QuizManager
                    model="products"
                 />
            </Tab>

        </TabbedShowLayout>
    </Show>
);
const ProductPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const ProductsList = props => (
    
    <List {...props} pagination={<ProductPagination />}>
        <Datagrid rowClick="show">
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="name" label="Name" />
            <ArrayField source="tagsArray">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
            <BooleanField source="isMedal" label="isMedal" />
            <BooleanField source="hasQuiz" label="hasQuiz" />
            <TextField source="jalaaliFullUserFriendlyCreatedDate" label="Date" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);