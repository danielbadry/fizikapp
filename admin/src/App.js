import React from 'react';
import catReducer from './reducer';
import { Admin, Resource } from 'react-admin';
import { ProductsList, ProductCreate, ProductEdit, ProductShow } from './products';
import { UsersList, UserCreate } from './users';
import { ShopsList } from './shops';
import { TagsList, TagCreate, TagEdit } from './tags';
import { CriticismsList } from './criticisms';
import { ShoppingplansList, ShoppingplansCreate, ShoppingplansEdit } from './shoppingplans';
import Dashboard from './Dashboard';
import dataProvider from './dataProvider';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import UserIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/CreateNewFolder';
import VideoLbabelIcon from '@material-ui/icons/VideoLabel';
import ShoppingIcon from '@material-ui/icons/AddShoppingCart';
import CommentIcon from '@material-ui/icons/Comment';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import authProvider from './authProvider';
import { CategoriesList } from './categories';

const App = () => (
    <Admin customReducers={{ catReducer }} dashboard={Dashboard} dataProvider={dataProvider('http://localhost:1337')} authProvider={authProvider}>
        <Resource name="products" create={ProductCreate} list={ProductsList} icon={VideoCallIcon} edit={ProductEdit} show={ProductShow} />
        <Resource name="users" list={UsersList} icon={UserIcon} create={UserCreate} />
        <Resource name="categories" list={CategoriesList} icon={CategoryIcon} />
        <Resource name="tags" create={TagCreate} edit={TagEdit} list={TagsList} icon={VideoLbabelIcon} />
        <Resource name="shops" list={ShopsList} icon={ShoppingIcon} />
        <Resource name="criticisms" list={CriticismsList} icon={CommentIcon} />
        <Resource name="shoppingplans" icon={InsertInvitationIcon} list={ShoppingplansList} create={ShoppingplansCreate} edit={ShoppingplansEdit} />
    </Admin>
    
);

export default App;