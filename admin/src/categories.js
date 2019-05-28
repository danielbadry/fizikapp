import React, {Fragment} from 'react';
import { List, Datagrid, TextField, BulkDeleteButton, Create, SimpleForm, TextInput } from 'react-admin';

import { CardActions, Filter } from 'react-admin';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Home from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';

import CreateNewFolder from './CreateNewFolder';

const PostBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton {...props} />
        <div>Hi</div>
    </Fragment>
);

// const postRowClick = (id, basePath, record) => record.editable ? 'edit' : 'show';
const postRowClick = (id, basePath, record) => {
    console.info('id:', id);
    console.info('basePath:', basePath);
    console.info('record:', record);
};

const PostPanel = ({ id, record, resource }) => (
   <span>hello</span>
);



const PostActions = ({
    bulkActions,
    basePath,
    currentSort,
    displayedFilters,
    exporter,
    filters,
    filterValues,
    onUnselectItems,
    resource,
    selectedIds,
    showFilter,
    total
}) => (
    <CardActions>
        {bulkActions && React.cloneElement(bulkActions, {
            basePath,
            filterValues,
            resource,
            selectedIds,
            onUnselectItems,
        })}
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        })}
        
        <Tooltip title="Up">
            <IconButton color="secondary">
                <ExpandLess />
            </IconButton>
        </Tooltip>
        
        <Tooltip title="Back">
            <IconButton color="secondary">
                <ChevronLeft />
            </IconButton>
        </Tooltip>
        
        <Tooltip title="Home">
            <IconButton color="secondary">
                <Home />
            </IconButton>
        </Tooltip>
        
        <Tooltip title="New">
            <IconButton color="secondary">
                
            </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
            <IconButton color="secondary">
                <DeleteIcon />
            </IconButton>
        </Tooltip>
        <CreateNewFolder />
    </CardActions>
);

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="_id" alwaysOn />
    </Filter>
);

export const CategoriesList = props => (
    <List {...props}
        bulkActionButtons={<PostBulkActionButtons />}
        actions={<PostActions />} 
        filters={<PostFilter />}
        >
        <Datagrid 
            rowClick={postRowClick}
            expand={<PostPanel />}
            >
            <TextField source="_id" />
            <TextField source="name" />
            <TextField source="createdAt" />
            <TextField source="size" />
            <TextField source="fileCount" />
        </Datagrid>
    </List>
);

export const CategoriesCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);