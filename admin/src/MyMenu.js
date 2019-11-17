import React from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources, Responsive } from 'react-admin';
import { withRouter } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import CatButton from './CatButton';
import DashboardIcon from '@material-ui/icons/Dashboard';

const MyMenu = ({ resources, onMenuClick, logout, criticismsBadgeCount, requestsBadgeCount, policeBadgeCount }) => (
    <div>
        <CatButton />
        {/* {resources.map(resource => (
            <MenuItemLink
                key={resource.name}
                to={`/${resource.name}`}
                primaryText={resource.options && resource.options.label || resource.name}
                leftIcon={React.createElement(resource.icon)}
                onClick={onMenuClick}
            />
        ))} */}

        <MenuItemLink key='dahsboard' to="/" primaryText="Dashboard" onClick={onMenuClick}  leftIcon={React.createElement(DashboardIcon)}/>  
        <MenuItemLink key={resources[0].name} to="/products" primaryText={resources[0].options && resources[0].options.label || resources[0].name} onClick={onMenuClick} leftIcon={React.createElement(resources[0].icon)} />
        <MenuItemLink key={resources[1].name} to="/beyondthebook" primaryText={resources[1].options && resources[1].options.label || resources[1].name} onClick={onMenuClick} leftIcon={React.createElement(resources[1].icon)} />
        <MenuItemLink key={resources[2].name} to="/users" primaryText={resources[2].options && resources[2].options.label || resources[2].name} onClick={onMenuClick} leftIcon={React.createElement(resources[2].icon)} />
        <MenuItemLink key={resources[3].name} to="/categories" primaryText={resources[3].options && resources[3].options.label || resources[3].name} onClick={onMenuClick} leftIcon={React.createElement(resources[3].icon)} />
        <MenuItemLink key={resources[4].name} to="/subjects" primaryText={resources[4].options && resources[4].options.label || resources[4].name} onClick={onMenuClick} leftIcon={React.createElement(resources[4].icon)} />
        <MenuItemLink key={resources[5].name} to="/exercises" primaryText={resources[5].options && resources[5].options.label || resources[5].name} onClick={onMenuClick} leftIcon={React.createElement(resources[5].icon)} />
        <MenuItemLink key={resources[6].name} to="/definitions" primaryText={resources[6].options && resources[6].options.label || resources[6].name} onClick={onMenuClick} leftIcon={React.createElement(resources[6].icon)} />
        <MenuItemLink key={resources[7].name} to="/sciencechallenge" primaryText={resources[7].options && resources[7].options.label || resources[7].name} onClick={onMenuClick} leftIcon={React.createElement(resources[7].icon)} />
        <MenuItemLink key={resources[8].name} to="/tags" primaryText={resources[8].options && resources[8].options.label || resources[8].name} onClick={onMenuClick} leftIcon={React.createElement(resources[8].icon)} />
        <MenuItemLink key={resources[9].name} to="/shops" primaryText={resources[9].options && resources[9].options.label || resources[9].name} onClick={onMenuClick} leftIcon={React.createElement(resources[9].icon)} />
        <MenuItemLink key={resources[10].name} to="/criticisms" primaryText={<Badge badgeContent={criticismsBadgeCount} color="primary"> {resources[10].options && resources[10].options.label || resources[10].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[10].icon)} />
        <MenuItemLink key={resources[11].name} to="/shoppingplans" primaryText={resources[11].options && resources[11].options.label || resources[11].name} onClick={onMenuClick} leftIcon={React.createElement(resources[11].icon)} />
        <MenuItemLink key={resources[12].name} to="/police" primaryText={<Badge badgeContent={policeBadgeCount} color="primary">{resources[12].options && resources[12].options.label || resources[12].name}</Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[12].icon)} />
        <MenuItemLink key={resources[13].name} to="/requests" primaryText={<Badge badgeContent={requestsBadgeCount} color="primary"> {resources[13].options && resources[13].options.label || resources[13].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[13].icon)} />
        
        <Responsive
            small={logout}
            medium={null} // Pass null to render nothing on larger devices
        />
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state),
    criticismsBadgeCount: state.catReducer.criticismsBadgeCount,
    policeBadgeCount: state.catReducer.policeBadgeCount,
    requestsBadgeCount: state.catReducer.requestsBadgeCount
});

export default withRouter(connect(mapStateToProps)(MyMenu));