import React from 'react';
import StickyFooter from "./StickyFooter";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class Products extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            category : []
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL+`categories/`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'authorization': `Bearer ${token}`,
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(category => {
                // console.info('category:', category);
                this.setState(function(state, props) {
                    return {
                        category: category
                        }
                  }, () => {
                    
                  });
            });
    }

    render() {
        return(
            <React.Fragment>
                {this.state.category.map(
                    (item, index) => 
                        <Paper
                            key={index}
                            style={{
                                direction: 'rtl',
                                fontFamily:'IranSans'
                            }}
                            >
            
                            <Grid container spacing={0}>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography 
                                        style={{
                                            fontFamily:'IranSans'
                                        }}
                                        >
                                        {item.name}
                                    </Typography>
                                </Grid>

                                {item.allSubCategories.map(
                                    (category, cIndex) => 
                                        <Grid key={cIndex} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            <Link 
                                                                color="inherit"
                                                                style={{
                                                                    fontFamily: 'IranSans_Ultralight',
                                                                    fontSize: '13px',
                                                                    margin:'0',
                                                                    lineHeight:'2'
                                                                }}
                                                                component={RouterLink} 
                                                                to={`/category/xxx`}>
                                                                   {category.name}
                                                            </Link>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            {category.description}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                                    <img 
                                                        style={{
                                                            width:'50px'
                                                        }}
                                                        src={category.thumbnail} 
                                                        />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                )}

                                {item.Products.map(
                                    (product, pIndex) => 
                                        <Grid key={pIndex} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            <Link 
                                                                color="inherit"
                                                                style={{
                                                                    fontFamily: 'IranSans_Ultralight',
                                                                    fontSize: '13px',
                                                                    margin:'0',
                                                                    lineHeight:'2'
                                                                }}
                                                                component={RouterLink} 
                                                                to={`/product/${product.id}`}>
                                                                   {product.name}
                                                            </Link>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            {product.description}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                                    <img 
                                                        style={{
                                                            width:'50px'
                                                        }}
                                                        src={product.thumbnail} 
                                                        />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                )}
                                
                                
                            </Grid>
            
                        </Paper>
                )}
            
            </React.Fragment>
        )
    }
}
export default Products;