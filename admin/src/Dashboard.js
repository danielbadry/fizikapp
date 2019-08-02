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
            <CardHeader title="User Signup Location Sensitive" />
            <CardContent>
                <UserSignupSensitiveLocation name="CodeSandbox" />
            </CardContent>
        </Card>

        {/* <Card> */}
            {/* <CardHeader title="Product Analytics" />
            <CardContent> */}
                <EnhancedTable />
            {/* </CardContent> */}
        {/* </Card> */}

        <Card>
            <CardHeader title="Sales Chart" />
            <CardContent>
                <SalesChart />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader title="Sign up Chart" />
            <CardContent>
                <SignUpChart />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader title="Online Users Chart" />
            <CardContent>
                <OnlineUsersChart />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader title="shopping sensitive location" />
            <CardContent>
                <ShoppingSensitiveLocation />
            </CardContent>
        </Card>

    </React.Fragment>
);