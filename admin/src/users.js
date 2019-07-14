import React , { Fragment } from 'react';
import {    List, Datagrid, Create, SimpleForm, TextInput,
            ImageInput, ImageField, SelectInput, Show, TabbedShowLayout,
            Tab, TextField, AutocompleteInput, NumberInput
        } from 'react-admin';

import UserManageTab from './UserManageTab';
import UserFinancialTab from './UserFinancialTab';
import UserActivityGrid from './UserActivityTab';
import Thumbnail from './ThumbnailImage';
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
import { change } from 'redux-form'
import {GetProvincesFor, GetCitiesFor, countries} from './GetCitiesFor';
export const userShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            
            <Tab label="information">
                <TextField label="Id" source="id" />
                <TextField source="city" />
                <TextField source="email" />
                <TextField source="phoneNumber" />
                <TextField source="gender" />
                <TextField source="grade" />
            </Tab>
            
            <Tab label="activities" path="activities">
                <UserActivityGrid />
            </Tab>
            
            <Tab label="financial" path="financial">
                <UserFinancialTab />
            </Tab>

            <Tab label="manage" path="manage">
                <UserManageTab />
            </Tab>
            
        </TabbedShowLayout>
    </Show>
); 

export const UserCreatee = (props) => (
    <Create {...props}>
        <SimpleForm>
            <FormDataConsumer>
                {({ formData, dispatch, ...rest }) => (
                    <Fragment>
                        <SelectInput
                            source="country"
                            label="country"
                            choices={countries}
                            onChange={value => dispatch(
                                change(REDUX_FORM_NAME, 'province', null)
                            )}
                             {...rest}
                        />
                        <SelectInput
                            source="province"
                            label="province"
                            choices={GetProvincesFor(formData.country)}
                            onChange={value => dispatch(
                                change(REDUX_FORM_NAME, 'city', null)
                            )}
                            {...rest}

                        />
                        <SelectInput
                            source="city"
                            label="city"
                            choices={GetCitiesFor(formData.province)}
                            {...rest}

                        />
                    </Fragment>
                )}
            </FormDataConsumer>
        </SimpleForm>
    </Create>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="first_name" label="first name" />
            <TextInput source="last_name" label="last name" />
            <TextInput source="email" label="email" />
            <TextInput source="username" label="user" />
            <NumberInput source="fcoin" label="default f-coin" />
            <SelectInput source="gender" choices={[
                { id: '0', name: 'male' },
                { id: '1', name: 'female' },
                { id: '2', name: 'others' },
            ]} />
            
            <SelectInput source="grade" choices={[
                { id: '0', name: 'دهم' },
                { id: '1', name: 'یازدهم' },
                { id: '2', name: 'دوازدهم' },
            ]} />
            <FormDataConsumer>
                {({ formData, dispatch, ...rest }) => (
                    <Fragment>
                        <SelectInput
                            source="country"
                            label="country"
                            choices={countries}
                            onChange={value => dispatch(
                                change(REDUX_FORM_NAME, 'province', null)
                            )}
                             {...rest}
                        />
                        <SelectInput
                            source="province"
                            label="province"
                            choices={GetProvincesFor(formData.country)}
                            onChange={value => dispatch(
                                change(REDUX_FORM_NAME, 'city', null)
                            )}
                            {...rest}

                        />
                        <SelectInput
                            source="city"
                            label="city"
                            choices={GetCitiesFor(formData.province)}
                            {...rest}

                        />
                    </Fragment>
                )}
            </FormDataConsumer>
            <ImageInput source="thumbnail" label="Related pictures" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            
        </SimpleForm>
    </Create>
);

export const UsersList = props => (

    <List {...props}>
        
        <Datagrid rowClick="show">
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="userName" label="user id" />
            <TextField source="fullName" label="full name" />
            <TextField source="jalaaliRegisterDate" label="last login" />
            <TextField source="totalPurchase" label="total purchase" />
            <TextField source="fCoin" label="f coin" />
            <TextField source="createdAt" label="register date" />
            <TextField source="numberOfInvitation" label="invitations" />
            <TextField source="subType" label="sub type" />
        </Datagrid>
        
    </List>
        
);