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
            <CardHeader title="Sales Chart and Signup Chart" />
            <CardContent>
                <SalesChart />
                <SignUpChart />
            </CardContent>
        </Card>
        
        {/* <Card>
            <CardHeader title="Sign up Chart" />
            <CardContent>
                <SignUpChart />
            </CardContent>
        </Card> */}
        <br />
        <Card>
            <CardHeader title="Online Users Chart" />
            <CardContent>
                <OnlineUsersChart />
                <div style={{
                        display:"inline-block", 
                        backgroundColor: '#f50057', 
                        position: 'absolute',
                        top: '71%',
                        left: '58%',
                        borderRadius: '41px',
                        width: '169px',
                        paddingLeft: '62px',
                        color: 'ghostwhite'
                    }}>
                    <h2>1,259,302</h2>
                </div>
            </CardContent>
        </Card>
        <br />
        <Card>
            <CardHeader title="shopping sensitive location" />
            <CardContent>
                <ShoppingSensitiveLocation />
            </CardContent>
        </Card>

    </React.Fragment>
);