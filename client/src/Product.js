import React from 'react';
import MainHeader from "./MainHeader";
import Typography from '@material-ui/core/Typography';
import { Player } from 'video-react';
import "../node_modules/video-react/dist/video-react.css"; // import css
import ProductUserInteraction from "./ProductUserInteraction";
import QuizComponent from './QuizComponent';
import Grid from '@material-ui/core/Grid';
import MainFooter from "./MainFooter";
import Paper from '@material-ui/core/Paper';

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            summary:{},
            productsquestions: [],
            productscomments: [],
            tags: [],
            id: '',
            thumbnail: '',
            productId: props.productid
        }
    };

    componentDidMount(){
        fetch(`http://localhost:1337/products/${this.state.productId}`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(product => {
                this.setState({
                    summary: JSON.parse(JSON.stringify(product.summary)),
                    productsquestions: JSON.parse(JSON.stringify(product.productsquestions)),
                    productscomments: JSON.parse(JSON.stringify(product.productscomments)),
                    tags: JSON.parse(JSON.stringify(product.tags)),
                    thumbnail: product.thumbnail,
                    id: product.id
                });
            });
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                        
                    <Grid item xs={12}>
                        <MainHeader />
                    </Grid>
                    
                    <Grid item xs={6}>
                        <Paper>
                            <Player
                            
                                playsInline
                                poster={this.state.thumbnail}
                                src={this.state.summary.videoAddress}
                                />
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={4}>
                        <Paper>
                            <QuizComponent />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <Typography 
                                variant="h6" 
                                gutterBottom
                                style={{ fontFamily: 'IranSans_Light' }}
                                >
                            {this.state.summary.title}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <Typography 
                                variant="h6"
                                gutterBottom
                                style={{ fontFamily: 'IranSans_Light' }}
                                >
                                {this.state.summary.jalaaliUserFriendlyCreatedDate}
                            </Typography>
                        </Paper>
                    </Grid>
                    
                    <Grid container>
                    
                    <Grid item xs={4}>
                        <Typography 
                            variant="span" 
                            gutterBottom
                            style={{ fontFamily: 'IranSans_Light' }}
                            >
                            {this.state.summary.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ProductUserInteraction />
                    </Grid>
                    </Grid>
                    
                    <MainFooter />
                </Grid>
            </div>

        );
    }
}
export default Product;