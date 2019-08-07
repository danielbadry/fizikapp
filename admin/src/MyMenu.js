import React from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources, Responsive } from 'react-admin';
import { withRouter } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';

let i = (ri) => {
    return React.createElement(ri);
} 
const MyMenu = ({ resources, onMenuClick, logout }) => (
    <div>
        {/* {resources.map(resource => (
            <MenuItemLink
                key={resource.name}
                to={`/${resource.name}`}
                primaryText={resource.options && resource.options.label || resource.name}
                leftIcon={React.createElement(resource.icon)}
                onClick={onMenuClick}
            />
        ))} */}

        <MenuItemLink key='dahsboard' to="/" primaryText="dashboard" onClick={onMenuClick}  />
        <MenuItemLink key={resources[0].name} to="/products" primaryText={<Badge badgeContent={4} color="primary"> {resources[0].options && resources[0].options.label || resources[0].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[0].icon)} />
        <MenuItemLink key={resources[1].name} to="/users" primaryText={<Badge badgeContent={4} color="primary"> {resources[1].options && resources[1].options.label || resources[1].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[1].icon)} />
        <MenuItemLink key={resources[2].name} to="/categories" primaryText={<Badge badgeContent={4} color="primary"> {resources[2].options && resources[2].options.label || resources[2].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[2].icon)} />
        <MenuItemLink key={resources[3].name} to="/tags" primaryText={<Badge badgeContent={4} color="primary"> {resources[3].options && resources[3].options.label || resources[3].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[3].icon)} />
        <MenuItemLink key={resources[4].name} to="/shops" primaryText={<Badge badgeContent={4} color="primary"> {resources[4].options && resources[4].options.label || resources[4].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[4].icon)} />
        <MenuItemLink key={resources[5].name} to="/criticisms" primaryText={<Badge badgeContent={4} color="primary"> {resources[5].options && resources[5].options.label || resources[5].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[5].icon)} />
        <MenuItemLink key={resources[6].name} to="/shoppingplans" primaryText={<Badge badgeContent={4} color="primary"> {resources[6].options && resources[6].options.label || resources[6].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[6].icon)} />
        <MenuItemLink key={resources[7].name} to="/police" primaryText={<Badge badgeContent={4} color="primary"> {resources[7].options && resources[7].options.label || resources[7].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[7].icon)} />
        <MenuItemLink key={resources[8].name} to="/requests" primaryText={<Badge badgeContent={4} color="primary"> {resources[8].options && resources[8].options.label || resources[8].name} </Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[8].icon)} />
        

        <Responsive
            small={logout}
            medium={null} // Pass null to render nothing on larger devices
        />
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(MyMenu));