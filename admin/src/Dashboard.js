import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import EnhancedTable from './ProductAnalytics';
import SalesChart from './SalesChart';
import SignUpChart from './SignUpChart';
import OnlineUsersChart from './OnlineUsersChart';
import UserSignupSensitiveLocation from './userSignupSensitiveLocation';
import ShoppingSensitiveLocation from './shoppingSensitiveLocation';

export default () => (
    <React.Fragment>
        
        <Card>
            <CardHeader title="Shopping and User Signup Location Sensitive" />
            <CardContent>
                <ShoppingSensitiveLocation />
                <UserSignupSensitiveLocation name="CodeSandbox" />
            </CardContent>
        </Card>
            <EnhancedTable />
        <Card>
            <CardHeader title="Sales Chart and Signup Chart" />
            <CardContent>
                <SalesChart />
                <SignUpChart />
            </CardContent>
        </Card>
        <br />
        <Card>
            <CardHeader title="Online Users Chart" />
            <CardContent>
                <OnlineUsersChart />
                <div style={{
                        display:"inline-block", 
                        backgroundColor: '#f50057', 
                        position: 'absolute',
                        top: '90%',
                        left: '65%',
                        borderRadius: '41px',
                        width: '169px',
                        paddingLeft: '62px',
                        color: 'ghostwhite'
                    }}>
                    <h2>1,259,302</h2>
                </div>
            </CardContent>
        </Card>
        
    </React.Fragment>
);