import React, { Fragment } from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ChipField, FileField ,FileInput,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField,ArrayField,SingleFieldList, SelectInput, ShowButton, EditButton, DeleteButton,
        DateInput ,ReferenceInput } from 'react-admin';

import { Pagination } from 'react-admin';
import TagComponent from './TagComponent';
import Book from './Book';
import CategoryComponent from './CategoryComponent';
import QuizManager from './QuizManager';
import ProductReports from './ProductReports';
import Mycheckbox from './MyNewField2';
import Thumbnail from './ThumbnailImage';
import ThumbnailUploadComponent from './ThumbnailUploadComponent';
import FileUploadComponent from './FileUploadComponent';
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
            {/* <CategoryComponent source="category" label="category" /> */}
            <Book 
                {...props}
                />
            <ThumbnailUploadComponent />
            <FileUploadComponent />
            {/* <FormDataConsumer>
                {({ formData, dispatch, ...rest }) => (
                    <Fragment>
                        <SelectInput
                            source="category"
                            label="book"
                            choices={GetCategory()}
                            onChange={value => dispatch(
                                change(REDUX_FORM_NAME, 'season', null)
                            )}
                            {...rest}
                        /> */}
                        {/* <SelectInput
                            // source="season"
                            label="season"
                            choices={GetProvincesFor(formData.country)}
                            onChange={value => dispatch(
                                change(REDUX_FORM_NAME, 'city', null)
                            )}
                            {...rest}

                        />
                        <SelectInput
                            // source="city"
                            label="city"
                            choices={GetCitiesFor(formData.province)}
                            {...rest}

                        /> */}
                    {/* </Fragment>
                )}
            </FormDataConsumer> */}


            
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
                <ProductsQuestions />
            </Tab>

            <Tab label="reports" path="report" >
                <ProductReports />
            </Tab>

            <Tab label="comments" path="comments">
            <ProductsComments />
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
            <BooleanField source="isEnabled" label="Enable" />
            <BooleanField source="hasQuiz" label="hasQuiz" />
            <TextField source="jalaaliFullUserFriendlyCreatedDate" label="Date" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);