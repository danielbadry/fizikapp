import React from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ChipField, FileField ,FileInput,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField,ArrayField,SingleFieldList, SelectInput, ShowButton, EditButton, DeleteButton, DateInput ,ReferenceInput, required,
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
import SubjectComponent from './SubjectComponent';
import QuizManager from './QuizManager';
import InsertSubject from './InsertSubject';
import ProductReports from './ProductReports';
import Mycheckbox from './MyNewField2';
import Thumbnail from './ThumbnailImage';
import ProductsQuestions from './ProductsQuestions';
import ProductsComments from './ProductsComments';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { RadioButtonGroupInput } from 'react-admin';
import UploadComponent from './UploadComponent';
import ContentUserInteraction from "./ContentUserInteraction";
import MyEditor  from './TextEditor';
import Tiny  from './Tiny';
const validateExercisesName = [required(), minLength(1), maxLength(50)];
const validateExercisesTitle = [required(), minLength(1), maxLength(100)];
const validateExercisesField = [required()];
const validateExercisesReference = [required()];
const validateExercisesYear = [required()];

export const ExercisesCreate = (props) => (
    <Create {...props} >
        <SimpleForm redirect="list" submitOnEnter={true}>
            <TextInput 
                source="name" 
                label="name" 
                validate={validateExercisesName} 
                />
            <LongTextInput 
                source="title" 
                label="title" 
                validate={validateExercisesTitle} 
                />
            {/* <MyEditor label="description" /> */}
            <Tiny />
            {/* <LongTextInput source="description" label="description" /> */}
            <InsertSubject />
            <RadioButtonGroupInput 
                validate={validateExercisesField}
                source="field"
                choices={[
                    { id: 'riazi', name: 'riazi' },
                    { id: 'tajrobi', name: 'tajrobi' }
                ]} />
            
            <RadioButtonGroupInput 
                validate={validateExercisesReference}
                source="reference" choices={[
                { id: 'in', name: 'in' },
                { id: 'out', name: 'out' }
            ]} />

            <SelectInput 
                validate={validateExercisesYear}
                source="year" 
                choices={[
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

            <UploadComponent 
                type="thumbnail"
                model="exercises"
                />
            <UploadComponent 
                type="file"
                model="exercises"
                />

        </SimpleForm>
    </Create>
);

export const ExercisesEdit = (props) => (
    <Edit title="Product edit" {...props}>
        <SimpleForm>
            <TextInput 
                source="data.summary.name" 
                label="name" 
                />
            <LongTextInput 
                source="data.summary.title" 
                label="title" 
                />
            <Tiny />
            <InsertSubject />
            <RadioButtonGroupInput 
                validate={validateExercisesField}
                source="data.summary.field"
                choices={[
                    { id: 'riazi', name: 'riazi' },
                    { id: 'tajrobi', name: 'tajrobi' }
                ]} />
            
            <RadioButtonGroupInput 
                validate={validateExercisesReference}
                source="data.summary.reference" 
                choices={[
                    { id: 'in', name: 'in' },
                    { id: 'out', name: 'out' }
                ]} 
            />

            <SelectInput 
                validate={validateExercisesYear}
                source="data.summary.year" 
                choices={[
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

            <UploadComponent 
                type="thumbnail"
                model="exercises"
                />
            <UploadComponent 
                type="file"
                model="exercises"
                />
            {/* <LongTextInput source="description" label="description" /> */}
        </SimpleForm>
    </Edit>
);

const qaConfig = [
    {
        type:'qa',
        label:'پرسش و پاسخ',
        model:'exercises'
    },
]

const cmConfig = [
    {
        type:'qa',
        label:'پرسش و پاسخ',
        model:'exercises'
    },
]

export const ExercisesShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            
            <Tab label="information">
                <TextField source="id" label="Id" />
                <Thumbnail source="thumbnail" label="thumbnail" />
                <TextField source="summary.title" label="title" />
            </Tab>

            <Tab label="qa" path="qa">
                <ContentUserInteraction 
                    config={qaConfig}
                    modelid={props.id}
                    />
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

const ExercisesPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const ExercisesList = props => (
    
    <List {...props} pagination={<ExercisesPagination />}>
        <Datagrid rowClick="show">
            <Thumbnail 
                source="data.thumbnail" 
                label="thumbnail" 
                />
            
            <TextField 
                source="data.summary.title" 
                label="Title" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            
            <TextField 
                source="data.summary.year" 
                label="year" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            <BooleanField 
                source="data.summary.isRiazi" 
                label="riazi" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            <BooleanField 
                source="data.summary.isTajrobi" 
                label="tajrobi" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            <TextField 
                source="data.summary.jalaaliFullUserFriendlyCreatedDate" 
                label="date" 
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