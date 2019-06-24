import React from 'react';
import catReducer from './reducer';
import { Admin, Resource } from 'react-admin';
import { ProductsList, ProductCreate, ProductEdit, ProductShow } from './products';
import { UsersList, UserCreate, userShow } from './users';
import { ShopsList, shopShow } from './shops';
import { TagsList, TagCreate, TagEdit } from './tags';
import { CriticismsList } from './criticisms';
import { ShoppingplansList, ShoppingplansCreate, ShoppingplansEdit } from './shoppingplans';
import { RequestList, RequestShow } from './RequestList';
import { PoliceList } from './police';
import Dashboard from './Dashboard';
import dataProvider from './dataProvider';
import NotificationsPaused from '@material-ui/icons/NotificationsPaused';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import UserIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/CreateNewFolder';
import VideoLbabelIcon from '@material-ui/icons/VideoLabel';
import ShoppingIcon from '@material-ui/icons/AddShoppingCart';
import CommentIcon from '@material-ui/icons/Comment';
import VpnKey from '@material-ui/icons/VpnKey';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import authProvider from './authProvider';
import { CategoriesList } from './categories';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
const App = () => (
    <Admin customReducers={{ catReducer }} dashboard={Dashboard} dataProvider={dataProvider('http://localhost:1337')} authProvider={authProvider}>
        <Resource name="products" create={ProductCreate} list={ProductsList} icon={VideoCallIcon} edit={ProductEdit} show={ProductShow} />
        <Resource name="users" list={UsersList} icon={UserIcon} create={UserCreate} show={userShow} />
        <Resource name="categories" list={CategoriesList} icon={CategoryIcon} />
        <Resource name="tags" create={TagCreate} edit={TagEdit} list={TagsList} icon={VideoLbabelIcon} />
        <Resource name="shops" list={ShopsList} icon={ShoppingIcon} show={shopShow} />
        <Resource name="criticisms" list={CriticismsList} icon={CommentIcon} />
        <Resource name="shoppingplans" icon={InsertInvitationIcon} list={ShoppingplansList} create={ShoppingplansCreate} edit={ShoppingplansEdit} />
        <Resource name="police" icon={NotificationsPaused} list={PoliceList} />
        <Resource name="requests" icon={VpnKey} list={RequestList} show={RequestShow} />
    </Admin>  
);

export default App;