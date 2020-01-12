import React from 'react';
import Button from '@material-ui/core/Button';

class PurchasefromMobile extends React.Component {
    constructor(props) {
        super(props);
        console.info('props e : PurchasefromMobile', this.props);
    }
    render() {
        return (
            <div>
                <div
                    style={{
                        fontFamily:'IranSans',
                    }}
                    >خرید از طریق اف پوینت</div>
                <div style={{
                        fontFamily:'IranSans',
                    }}>میزان اف پوینت شما 3 است</div>
                <div style={{
                        fontFamily:'IranSans',
                    }}>قیمت این طرح 25 اف پوینت است</div>
                <Button 
                    // href='#/contact-us'
                    variant="contained"
                    color="secondary"
                    style={{
                        border: 0,
                        fontFamily:'IranSans',
                        borderRadius: 3,
                        color: 'white',
                        height: 48,
                        width:250,
                        padding: '0 30px',
                    }}
                >
                    خرید طرح
                </Button>
                <hr />
                <div style={{
                        fontFamily:'IranSans',
                    }}>مبلغ خرید 2500 تومان</div>
                <div style={{
                        fontFamily:'IranSans',
                    }}>نام طرح عیدانه است</div>
                <Button 
                    // href='#/contact-us'
                    variant="contained"
                    color="secondary"
                    style={{
                        border: 0,
                        fontFamily:'IranSans',
                        borderRadius: 3,
                        color: 'white',
                        height: 48,
                        width:250,
                        padding: '0 30px',
                    }}
                >
                    رفتن به درگاه بانک
                </Button>
            </div>
        );
    }
}

export default PurchasefromMobile;