import React from 'react';
import { List, Datagrid, TextField, BooleanField } from 'react-admin';
import Thumbnail from './ThumbnailImage';
import Divider from '@material-ui/core/Divider';
import CriticismsReponseBox from './CriticismsReponseBox'
import { Pagination } from 'react-admin';

const CriticismsPanel = ({ id, record, resource }) => (
    <React.Fragment>
        {record.message}
        <Divider />
        {record.response}
        <Divider />
        {!record.response ? <CriticismsReponseBox record={record} /> : <div>respond before</div>}
    </React.Fragment>
);
const CriticismPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const CriticismsList = props => (
    <List {...props} pagination={<CriticismPagination />}>
        <Datagrid expand={<CriticismsPanel />}>
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField source="userName" label="userame" />
            <TextField source="name" label="name" />
            <TextField source="title" label="title" />
            <BooleanField source="isResponsed" label="isResponsed" />
            <TextField source="jalaaliCreatedDate" label="jalaali Created Date" />
            <TextField source="jalaaliUserFriendlyCreatedDate" label="User Friendly Date" />
        </Datagrid>
    </List>
);