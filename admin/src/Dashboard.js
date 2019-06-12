import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ProductAnalytics from './ProductAnalytics';
import SalesChart from './SalesChart';
import SignUpChart from './SignUpChart';

export default () => (
    <React.Fragment>
        
        <Card>
            <CardHeader title="Product Analytics" />
            <CardContent>
                <ProductAnalytics />
            </CardContent>
        </Card>

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
        
    </React.Fragment>
);