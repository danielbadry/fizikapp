import React from 'react';
import MainHeader from "./MainHeader";
import Typography from '@material-ui/core/Typography';
import { Player } from 'video-react';
import "../node_modules/video-react/dist/video-react.css"; // import css
import ProductUserInteraction from "./ProductUserInteraction";
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';

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
            isQuizDialogOpen: false
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
    
    handleClose = () => {
        this.setState({isQuizDialogOpen : false});
    }
    
    handleOpen = () => {
        this.setState((state, props) => {
            return {isQuizDialogOpen: true};
        });
    }

    render() {
        return (
            <React.Fragment>
                <Dialog 
                    onClose={this.handleClose} 
                    aria-labelledby="simple-dialog-title" 
                    open={this.isQuizDialogOpen}
                    >
                    <DialogTitle 
                        id="simple-dialog-title"
                        >Set backup account
                    </DialogTitle>
                    <List>
                        
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={'hello'} />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="add account" />
                        </ListItem>

                    </List>
                </Dialog>

                <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    />
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.handleOpen.bind(this)}
                    >
                    start quiz
                </Button>
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