import React, { Fragment } from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ChipField, FileField ,FileInput,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField,ArrayField,SingleFieldList, SelectInput, ShowButton, EditButton, DeleteButton,
        DateInput ,ReferenceInput ,required,
        minLength,
        maxLength,
        minValue,
        maxValue,
        number,
        regex,
        email,
        choices} from 'react-admin';
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
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
import { change } from 'redux-form';
import ContentUserInteraction from "./ContentUserInteraction";
import MyEditor  from './TextEditor';
import Tiny  from './Tiny';
import Typography from '@material-ui/core/Typography';

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
        res = [{'id':'1','name':'a'}];
    })
    .catch((e) => {
        // showNotification('Error: comment not approved', 'warning')
    });
    return res;
}

const validateProductName = [required(), minLength(3), maxLength(30)];
const validateProductTitle = [required(), minLength(5), maxLength(100)];
const validateProductDuration = [required(), minLength(1), maxLength(2000), minValue(1)];
const validateProductCreation = (values) => {
    const errors = {};
    if (!values.thumbnail){
        errors.thumbnail = 'The thmbnail is required';
    }
    console.info(errors);
    return errors
};

export const ProductCreate = (props) => (
    <Create {...props} >
        
        <SimpleForm redirect="list" submitOnEnter={true}>
            
            <TextInput source="name" label="name" validate={validateProductName} />
            <LongTextInput source="title" label="title" validate={validateProductTitle} />
            <Tiny />
            {/* <MyEditor label="description" /> */}
            {/* <LongTextInput source="description" label="description" validate={validateProductDescription} /> */}
            <BooleanInput label="is medal" source="isMedal" />
            {/* <TagComponent 
                source="tags" 
                label="select tags (optional)"
                /> */}
            
            <Book 
                {...props}
                />
                
            <UploadComponent 
                type="thumbnail"
                model="products"
                />

            <TextInput source="duration" label="duration in seconds" type="number" validate={validateProductDuration} />

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
            <TextInput 
                source="data.summary.name" 
                label="name" 
                />
             <TextInput 
                source="data.summary.title" 
                label="title" 
                />
            <Tiny 
                />
            <BooleanInput 
                label="is medal" 
                source="data.summary.isMedal" 
                /> 
            {/* <TagComponent 
                default="data.summary.tags"
                label="select tags (optional)"
                /> */}
            <Book 
                {...props}
                />

            <UploadComponent 
                type="thumbnail"
                model="products"
                default="data.summary.thumbnail"
            />

            <TextInput 
                source="data.summary.duration" 
                label="duration in seconds" 
                type="number" 
                validate={validateProductDuration} 
                /> 
            
            <UploadComponent 
                type="file"
                model="products"
                // default="data.summary.thumbnail"
                />
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
        type:'comment',
        label:'پرسش و پاسخ',
        model:'products'
    },
]

export const ProductShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>

            <Tab label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    // fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                اطلاعات
            </Typography>}>
                <TextField source="data.id" label="Id" />
                <Thumbnail source="data.thumbnail" label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                تصویر
            </Typography>} />
                <TextField 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                source="data.summary.title" 
                label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" 
                variant="subtitle1">
                عنوان
            </Typography>} />
                <TextField 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                    source="data.summary.name" 
                    label={<Typography 
                        style={{ 
                            fontFamily: 'IranSans' ,
                            fontSize: '13px',
                            color: 'black',
                            direction: 'rtl'
                        }}
                        color="inherit" variant="subtitle1">
                        نام
                    </Typography>}
                    />
                {/* <VideoPlayerField /> */}
                <TextField source="data.summary.description" label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                توضیحات
            </Typography>} />
                <ArrayField source="data.summary.tagsArray" label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                برچسب ها
            </Typography>}>
                    <SingleFieldList>
                        <ChipField 
                            source="name" 
                            style={{ 
                                fontFamily: 'Far_Kamran' ,
                                fontSize: '13px',
                                color: 'black',
                                direction: 'rtl'
                            }}
                            />
                    </SingleFieldList>
                </ArrayField>
            </Tab>

            <Tab label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                پرسش پاسخ
            </Typography>} path="qa">
                <ContentUserInteraction 
                    config={qaConfig}
                    modelid={props.id}
                    />
            </Tab>

            <Tab label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                گزارشات
            </Typography>} path="report" >
                <ProductReports />
            </Tab>

            <Tab label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                کامنت
            </Typography>} path="comments">
            <ContentUserInteraction 
                    config={cmConfig}
                    modelid={props.id}
                    />
            </Tab>

            <Tab label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                کوییز
            </Typography>} path="quiz">
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
            <Thumbnail source="thumbnail" label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                تصویر
            </Typography>} />
            <TextField 
                source="data.summary.name" 
                label={<Typography 
                    style={{ 
                        fontFamily: 'IranSans' ,
                        fontSize: '13px',
                        color: 'black',
                        direction: 'rtl'
                    }}
                    color="inherit" variant="subtitle1">
                    نام
                </Typography>}
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                />
            <ArrayField 
                source="data.summary.tagsArray" 
                label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                برچسب
            </Typography>}>
                <SingleFieldList>
                    <ChipField 
                        source="name" 
                        style={{ 
                            fontFamily: 'Far_Kamran' ,
                            fontSize: '13px',
                            color: 'black',
                            direction: 'rtl'
                        }}
                        />
                </SingleFieldList>
            </ArrayField>
            <BooleanField source="data.summary.isMedal" label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                مدالیون
            </Typography>} />
            <BooleanField source="data.summary.hasQuiz" label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                کوییز
            </Typography>} />
            <TextField 
                source="data.summary.jalaaliFullUserFriendlyCreatedDate" 
                label={<Typography 
                    style={{ 
                        fontFamily: 'IranSans' ,
                        fontSize: '13px',
                        color: 'black',
                        direction: 'rtl'
                    }}
                    color="inherit" variant="subtitle1">
                    تاریخ ایجاد
                </Typography>} 
                style={{ 
                    fontFamily: 'Far_Kamran',
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black'
                }}
                />
            <EditButton label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                ویرایش
            </Typography>}/>
            <DeleteButton label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                حذف
            </Typography>}/>
        </Datagrid>
    </List>
);