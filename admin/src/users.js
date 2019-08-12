import React , { Fragment } from 'react';
import {    List, Datagrid, Create, SimpleForm, TextInput,
            ImageInput, ImageField, BooleanField, SelectInput, Show, TabbedShowLayout,
            Tab, TextField, NumberInput, Filter
        } from 'react-admin';

import UserManageTab from './UserManageTab';
import UserFinancialTab from './UserFinancialTab';
import UserActivityGrid from './UserActivityTab';
import AlignItemsList from './UserActivityTab2';
import Thumbnail from './ThumbnailImage';
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
import { change } from 'redux-form'
import {GetProvincesFor, GetCitiesFor, countries} from './GetCitiesFor';
import { Pagination } from 'react-admin';

export const userShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            
            <Tab label="information">
                <TextField source="id" label="Id" />
                <TextField source="jalaaliFullUserFriendlyCreatedDate" label="register date" />
                <TextField source="email" />
                <TextField source="phone" />
                <TextField source="mobile" />
                <BooleanField source="suspend" />
                <TextField source="gender" />
                <TextField source="grade" />
                <TextField source="address" />
            </Tab>
            
            <Tab label="activities" path="activities">
                <AlignItemsList />
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
        <SimpleForm >
            <TextInput source="firstName" label="first name" />
            <TextInput source="lastName" label="last name" />
            <TextInput source="email" label="email" />
            <TextInput source="userName" label="username" />
            <TextInput source="mobile" label="mobile" />
            <TextInput source="phone" label="phone" />
            <NumberInput source="fCoin" label="default f-coin" />
            <SelectInput source="gender" choices={[
                { id: 'male', name: 'male' },
                { id: 'female', name: 'female' },
                { id: 'others', name: 'others' },
            ]} />
            
            <SelectInput source="grade" choices={[
                { id: '10', name: 'دهم' },
                { id: '11', name: 'یازدهم' },
                { id: '12', name: 'دوازدهم' },
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

const UserPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

const PostFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <TextInput label="firstName" source="firstName" />
    </Filter>
);

export const UsersList = props => (

    <List {...props} pagination={<UserPagination />} filters={<PostFilter />}>
        <Datagrid rowClick="show">
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="userName" label="username" />
            <TextField source="fullName" label="full name" />
            <TextField source="jalaaliRegisterDate" label="last login" />
            <TextField source="totalPurchase" label="total purchase" />
            <TextField source="fCoin" label="f coin" />
            <TextField source="numberOfInvitation" label="invitations" />
            <TextField source="subType" label="sub type" />
        </Datagrid>
        
    </List>
        
);