import React from 'react';
import { List,NumberInput, Create, Edit, SimpleForm, 
        DisabledInput, TextInput, DateInput, LongTextInput, Datagrid, 
        TextField, ShowButton, EditButton, TabbedShowLayout, Show, Tab, required,
        minLength,
        maxLength,
        minValue,
        maxValue,
        number,
        regex,
        email,
        choices } from 'react-admin';
import { Pagination } from 'react-admin';
import UploadComponent from './UploadComponent';

const validateShoppingPlanType = [required(), minLength(5), maxLength(30)];
const validateShoppingPlanDuration = [required(), minValue(1)];
const validateShoppingPlanFirstPrice = [required(), minValue(1)];
const validateShoppingPlanSecondPrice = [required(), minValue(1)];

export const ShoppingplansCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="type" label="type" validate={validateShoppingPlanType} />
            <NumberInput source="duration" label="duration" validate={validateShoppingPlanDuration} />
            <NumberInput source="firstPrise" label="first Prise" validate={validateShoppingPlanFirstPrice} />
            <NumberInput source="secondPrise" label="second Prise" validate={validateShoppingPlanSecondPrice} />
            <UploadComponent 
                type="thumbnail"
                model="shoppingplans"
                />
        </SimpleForm>
    </Create>
);

export const ShoppingplansEdit = (props) => (
    <Edit title="Shoppingplans edit" {...props}>
        <SimpleForm>
            <TextInput source="type" label="type" />
            <NumberInput source="duration" label="duration" />
            <NumberInput source="firstPrise" label="first prise" />
            <NumberInput source="secondPrise" label="second prise" />
        </SimpleForm>
    </Edit>
);

export const ShoppingplansShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>

            <Tab label="information">
                <TextField source="id" label="Id" />
                <TextField source="type" label="type" />
                <TextField source="firstPrise" label="first prise" />
                <TextField source="secondPrise" label="second prise" />
                <TextField source="duration" label="duration" />
            </Tab>

        </TabbedShowLayout>
    </Show>
);

const ShoppingplanPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const ShoppingplansList = props => (
    <React.Fragment>
        <List {...props} pagination={<ShoppingplanPagination />}>
            <Datagrid>
                <TextField source="type" label="type" />
                <TextField source="firstPrise" label="first prise" />
                <TextField source="secondPrise" label="second prise" />
                <TextField source="duration" label="duration" />
                <TextField source="jalaaliFullUserFriendlyUpdatedDate" label="update date" />
                <EditButton />
            </Datagrid>
        </List>
        
    </React.Fragment>
);