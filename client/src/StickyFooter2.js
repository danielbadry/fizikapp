import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

class StickyFooter2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            definitions: [],
            products: []
        }
    }

    render() {
        return(
            <Grid container
                style={{
                    backgroundColor:'#262626',
                    paddingRight:'10px'
                }}
                >

                <Grid item xs={12}>
                    <Grid container justify="center" spacing={0}>
                    
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}
                            style={{
                                direction:'rtl'
                            }}
                            >
                            <dl>
                            <dt
                                    style={{
                                        fontFamily: 'IranSans',
                                        fontSize: '14px',
                                        color:'#e67e22',
                                        borderBottom:'solid 1px #333333',
                                        paddingBottom: '9px',
                                        marginBottom: '13px',
                                        width:'80%'
                                    }}>ارتباط با ما</dt>
                                <dd>سلام</dd>
                                <dd>سلام</dd>
                                <dd>سلام</dd>
                                <dd>سلام</dd>
                                <dd>سلام</dd>
                            </dl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}
                            style={{
                                direction:'rtl'
                            }}
                            >
                            <dl>
                                <dt
                                    style={{
                                        fontFamily: 'IranSans',
                                        fontSize: '14px',
                                        color:'#e67e22',
                                        borderBottom:'solid 1px #333333',
                                        paddingBottom: '9px',
                                        marginBottom: '13px',
                                        width:'80%'
                                    }}
                                    >آخرین تمرین ها</dt>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                                <dd
                                    key={value}
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    >تمرین شماره {value}</dd>
                                ))}
                            </dl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}
                            style={{
                                direction:'rtl'
                            }}
                            >
                            <dl>
                                <dt
                                    style={{
                                        fontFamily: 'IranSans',
                                        fontSize: '14px',
                                        color:'#e67e22',
                                        borderBottom:'solid 1px #333333',
                                        paddingBottom: '9px',
                                        marginBottom: '13px',
                                        width:'80%'
                                    }}
                                    >آخرین ویدیو ها</dt>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                                <dd
                                    key={value}
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2',
                                        width:'80%'
                                    }}
                                    >ویدیو شماره {value}</dd>
                                ))}
                            </dl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}
                            style={{
                                direction:'rtl'
                            }}
                            >
                            <dl>
                                <dt
                                    style={{
                                        fontFamily: 'IranSans',
                                        fontSize: '14px',
                                        color:'#e67e22',
                                        borderBottom:'solid 1px #333333',
                                        paddingBottom: '9px',
                                        marginBottom: '13px',
                                        width:'80%'
                                    }}
                                    >سایت مپ</dt>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                                <dd
                                    key={value}
                                    style={{
                                        color:'white',
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    >تمرین شماره {value}</dd>
                                ))}
                            </dl>
                        </Grid>
                    
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <div
                        style={{
                            textAlign: 'center',
                            height: '40px',
                            fontSize: '13px',
                            fontFamily: 'IranSans',
                            color: 'white'
                        }}
                        >
                        <span>1398</span>
                        <span 
                            style={{
                                color:'red',
                                margin: '0 6px'
                            }}
                        >
                            ❤
                        </span>
                        تهیه شده توسط تیم فیزیک اپ با   
                        
                    </div>
                </Grid>

            </Grid>
        )
        
    }

}
export default StickyFooter2;