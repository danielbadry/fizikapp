import React from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ChipField, FileField ,FileInput,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField,ArrayField,SingleFieldList, SelectInput, ShowButton, EditButton, DateInput ,ReferenceInput } from 'react-admin';

import { Pagination } from 'react-admin';
import TagComponent from './TagComponent';
import CategoryComponent from './CategoryComponent';
import QuizManager from './QuizManager';
import ProductReports from './ProductReports';
import Mycheckbox from './MyNewField2';
import Thumbnail from './ThumbnailImage';
import ProductsQuestions from './ProductsQuestions';
import ProductsComments from './ProductsComments';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// import RichTextInput from 'ra-input-rich-text';
import RichTextInput from 'aor-rich-text-input';
import { RadioButtonGroupInput } from 'react-admin';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CheckboxGroupInput } from 'react-admin';

export const TamrinsCreate = (props) => (
    <Create {...props} >
        <SimpleForm redirect="list">
            <TextInput source="name" label="name" />
            <LongTextInput source="title" label="title" />
            <LongTextInput source="description" label="description" />

            <CheckboxGroupInput source="riazi" choices={[
                { id: 'riazi', name: 'riazi' }
            ]} />
            
            <CheckboxGroupInput source="tajrobi" choices={[
                { id: 'tajrobi', name: 'tajrobi' }
            ]} />

            <SelectInput source="year" choices={[
                { id: '1381', name: '1381' },
                { id: '1382', name: '1382' },
                { id: '1383', name: '1383' },
                { id: '1384', name: '1384' },
                { id: '1385', name: '1385' },
                { id: '1386', name: '1386' },
                { id: '1387', name: '1387' },
                { id: '1388', name: '1388' },
                { id: '1389', name: '1389' },
                { id: '1390', name: '1390' },
                { id: '1391', name: '1391' },
                { id: '1392', name: '1392' },
                { id: '1393', name: '1393' },
                { id: '1394', name: '1394' },
                { id: '1395', name: '1395' },
                { id: '1396', name: '1396' },
                { id: '1397', name: '1397' },
                { id: '1398', name: '1398' },
                { id: '1399', name: '1399' },
            ]} />
        </SimpleForm>
    </Create>
);

export const TamrinsEdit = (props) => (
    <Edit title="Product edit" {...props}>
        <SimpleForm>
            <TextInput source="name" label="name" />
            <LongTextInput source="title" label="title" />
            <LongTextInput source="description" label="description" />
        </SimpleForm>
    </Edit>
);

export const TamrinsShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="information">
                <TextField source="id" label="Id" />
                <Thumbnail source="thumbnail" label="thumbnail" />
                <TextField source="summary.title" label="title" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

const TamrinsPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const TamrinsList = props => (
    
    <List {...props} pagination={<TamrinsPagination />}>
        <Datagrid rowClick="show">
            <TextField source="name" label="Name" />
            <TextField source="title" label="Title" />
            <TextField source="description" label="Description" />
            <TextField source="year" label="year" />
            <BooleanField source="riazi" label="riazi" />
            <BooleanField source="tajrobi" label="tajrobi" />
            <TextField source="jalaaliFullUserFriendlyCreatedDate" label="date" />
        </Datagrid>
    </List>
);