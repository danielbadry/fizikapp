import React from 'react';
import {Show, TabbedShowLayout, Tab, NumberField,BooleanField,
    List, ReferenceManyField, Datagrid, TextField, DateField, EditButton } from 'react-admin';
export const shopShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            
            <Tab label="information">
                <TextField label="Id" source="id" />
                <TextField source="title" />
                <TextField source="teaser" />
            </Tab>
            
            <Tab label="records" path="records">
                <ReferenceManyField 
                    reference="shopsdetails" 
                    target="shopId" 
                    filter={{ is_published: true }}
                    addLabel={false}>
                    <Datagrid>
                        <TextField source="shopId" />
                        <TextField source="price" />
                        <TextField source="createdAt" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            
            <Tab label="manage" path="manage">
                <TextField label="Password (if protected post)" source="password" type="password" />
                <DateField label="Publication date" source="published_at" />
                <NumberField source="average_note" />
                <BooleanField label="Allow comments?" source="commentable" defaultValue />
                <TextField label="Nb views" source="views" />
            </Tab>
            
        </TabbedShowLayout>
    </Show>
);

export const ShopsList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="userId" label="user ID" />
            <TextField source="createdAt" label="shop Date" />
            <TextField source="totalPrice" />
            <TextField source="status" />
        </Datagrid>
    </List>
);