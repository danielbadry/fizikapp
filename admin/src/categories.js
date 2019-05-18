import React, {Fragment} from 'react';
import { List, Datagrid, TextField, BulkDeleteButton, Create, SimpleForm, TextInput } from 'react-admin';

import Button from '@material-ui/core/Button';
import { CardActions, CreateButton, ExportButton, RefreshButton } from 'react-admin';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Home from '@material-ui/icons/Home';
import Refresh from '@material-ui/icons/Refresh';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

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
        }) }
        <CreateButton basePath={basePath} />
        <ExportButton
            disabled={total === 0}
            resource={resource}
            sort={currentSort}
            filter={filterValues}
            exporter={exporter}
        />
        <RefreshButton />
        <Tooltip title="Up">
            <IconButton color="secondary">
                <Badge badgeContent={4} color="primary">
                    <ExpandLess />
                </Badge>
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
        <Tooltip title="New Folder">
            <IconButton color="secondary">
                <CreateNewFolder />
            </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
            <IconButton color="secondary">
            <Badge badgeContent={4} color="primary" >

                <DeleteIcon />
                </Badge>
            </IconButton>
        </Tooltip>
        <Tooltip title="Refresh">
            <IconButton color="secondary">
                <Refresh />
            </IconButton>
        </Tooltip>
    </CardActions>
);

const PostBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton {...props} />
        <div>Hi</div>
    </Fragment>
);

export const CategoriesList = props => (
    <List {...props} bulkActionButtons={<PostBulkActionButtons />} actions={<PostActions />} >
        <Datagrid>
            <TextField source="id" />
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