import React from 'react';
import { List, Datagrid, TextField, BooleanField } from 'react-admin';
import Thumbnail from './ThumbnailImage';
import Divider from '@material-ui/core/Divider';
import CriticismsReponseBox from './CriticismsReponseBox'

const CriticismsPanel = ({ id, record, resource }) => (
    <React.Fragment>
        {record.message}
        <Divider />
        {record.response}
        <Divider />
        {!record.response ? <CriticismsReponseBox record={record} /> : <div>respond before</div>}
    </React.Fragment>
);

export const CriticismsList = props => (
    <List {...props}>
        <Datagrid expand={<CriticismsPanel />}>
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="userName" />
            <TextField source="name" />
            <TextField source="message" />
            <BooleanField source="isResponsed" label="isResponsed" />
            <TextField source="response" />
            <TextField source="jalaaliCreatedDate" />
            <TextField source="jalaaliUserFriendlyCreatedDate" />
        </Datagrid>
    </List>
);