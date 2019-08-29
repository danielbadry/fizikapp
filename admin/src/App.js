import React from 'react';
import catReducer from './reducer';
import { Admin, Resource } from 'react-admin';
import { ProductsList, ProductCreate, ProductEdit, ProductShow } from './products';
import { ExercisesList, ExercisesCreate, ExercisesEdit, ExercisesShow } from './Exercises';
import { UsersList, UserCreate, UserCreatee, userShow } from './users';
import { ShopsList, shopShow } from './shops';
import { TagsList, TagCreate, TagEdit } from './tags';
import { CriticismsList } from './criticisms';
import { ShoppingplansList, ShoppingplansCreate, ShoppingplansEdit, ShoppingplansShow } from './shoppingplans';
import { RequestList, RequestShow } from './Requests';
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
import MyLayout from './MyLayout';

am4core.useTheme(am4themes_animated);
const App = () => (
    <Admin 
        customReducers={{ catReducer }} 
        dashboard={Dashboard} 
        dataProvider={dataProvider('http://localhost:1337')} 
        authProvider={authProvider}
        appLayout={MyLayout}
        >
        <Resource name="Products" create={ProductCreate} list={ProductsList} icon={VideoCallIcon} show={ProductShow} />
        <Resource name="Users" list={UsersList} icon={UserIcon} create={UserCreate} show={userShow} />
        <Resource name="Categories" list={CategoriesList} icon={CategoryIcon} />
        <Resource name="Exercises" list={ExercisesList} create={ExercisesCreate} show={ExercisesShow} edit={ExercisesEdit} icon={CategoryIcon} />
        <Resource name="Tags" create={TagCreate} edit={TagEdit} list={TagsList} icon={VideoLbabelIcon} />
        <Resource name="Shops" list={ShopsList} icon={ShoppingIcon} show={shopShow} />
        <Resource name="Criticisms" list={CriticismsList} icon={CommentIcon} />
        <Resource name="Shoppingplans" icon={InsertInvitationIcon} list={ShoppingplansList} show={ShoppingplansShow} create={ShoppingplansCreate} edit={ShoppingplansEdit} />
        <Resource name="Police" icon={NotificationsPaused} list={PoliceList} />
        <Resource name="Requests" icon={VpnKey} list={RequestList} show={RequestShow} />
    </Admin>  
);

export default App;