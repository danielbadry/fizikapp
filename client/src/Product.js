import React from 'react';
import MainHeader from "./MainHeader";
import Typography from '@material-ui/core/Typography';
import { Player } from 'video-react';
import "../node_modules/video-react/dist/video-react.css"; // import css
import ProductUserInteraction from "./ProductUserInteraction";

import QuizComponent from './QuizComponent';

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            summary:{},
            productsquestions: [],
            productscomments: [],
            tags: [],
            id: '',
            thumbnail: ''
        }
    };

    componentDidMount(){
        fetch(`http://localhost:1337/products/5d60cdf3072e9b266c306108`, {
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
                console.info('ine:', product);
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
            <React.Fragment>

                <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    />
                <QuizComponent />

                <Typography variant="h3" gutterBottom>
                    {this.state.summary.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {this.state.summary.createdAt}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {this.state.summary.description}
                </Typography>
                
                <ProductUserInteraction />

            </React.Fragment>
        );
    }
}
export default Product;