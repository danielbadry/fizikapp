import React from 'react';
import { Admin, Resource } from 'react-admin';
import { ProductsList, ProductCreate, ProductEdit } from './products';
import { UsersList } from './users';
import { ShopsList } from './shops';
import { TagsList, TagCreate, TagEdit } from './tags';
import { CategoriesList } from './categories';
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

const App = () => (
    <Admin dashboard={Dashboard} dataProvider={dataProvider('http://localhost:1337')}>
        <Resource name="products" create={ProductCreate} list={ProductsList} icon={VideoCallIcon} edit={ProductEdit} />
        <Resource name="users" list={UsersList} icon={UserIcon} />
        <Resource name="categories" list={CategoriesList} icon={CategoryIcon} />
        <Resource name="tags" create={TagCreate} edit={TagEdit} list={TagsList} icon={VideoLbabelIcon} />
        <Resource name="shops" list={ShopsList} icon={ShoppingIcon} />
        <Resource name="criticisms" list={CriticismsList} icon={CommentIcon} />
        <Resource name="shoppingplans" icon={InsertInvitationIcon} list={ShoppingplansList} create={ShoppingplansCreate} edit={ShoppingplansEdit} />
    </Admin>
);

export default App;