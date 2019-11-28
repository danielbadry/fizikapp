import React from 'react';
import StickyFooter from "./StickyFooter";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Tree2 from "./Tree2";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Category extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            innerCategories:[],
            products:[],
            isRender: false,
            cats:[]
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`categories?rowId=${this.props.match.params.categoryid}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(result => {
            this.setState((state, props) => {
                return ({categories: result.Categories});
            }, () => {
                console.info('categories:', this.state.categories)
                this.setState({isRender: true})
            });
        });

        fetch(process.env.REACT_APP_API_URL+`categories/allcategories`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(result => {
                this.setState((state, props) => {
                    return ({cats: result});
                }, () => {
                    console.info('categories:', this.state.categories)
                    this.setState({isRender: true})
                });
            });
    }
    
    // showSubCategoryContent = (id) => {
    //     console.info('id:', id);
    //     let token = localStorage.getItem('token');
    //     fetch(process.env.REACT_APP_API_URL+`categories?rowId=${id}`, {
    //         method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //         mode: 'cors', // no-cors, cors, *same-origin
    //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: 'same-origin', // include, *same-origin, omit
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `Bearer ${token}`,
    //         },
    //         redirect: 'follow', // manual, *follow, error
    //         referrer: 'no-referrer', // no-referrer, *client
    //         // body: JSON.stringify(data), // body data type must match "Content-Type" header
    //     })
    //     .then(response => response.json())
    //     .then(result => {
    //         this.setState((state, props) => {
    //             console.info('content:', result);
    //             return ({
    //                 products:result.Products,
    //                 innerCategories:result.Categories
    //             });
    //         });
    //     });
    // }

    getMenu = ( parentID ) => {
        let data = this.state.cats;
        console.info('inje', data);
        return data.filter(function(node){ return ( node.parentId === parentID ) ; }).map((node)=>{
            var exists = data.some(function(childNode){  return childNode.parentId === node.id; });
            var subMenu = (exists) ? '<ul>'+ this.getMenu(node.id).join('') + '</ul>' : "";
            return '<li>'+node.name +  subMenu + '</li>' ;
        });
    }
    
    Subjects (props) {
        var initLevel = 0;
        var endMenu = this.getMenu("0");
        let someHtml = '<ul>'+endMenu.join('')+ '</ul>';
        return(
            <div style={{
                direction:'rtl'
                }} className="Container" dangerouslySetInnerHTML={{__html: someHtml}}>
            </div>
        )
    }

    render() {
        return(
            <React.Fragment>
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Paper>
                            {/* <Tree2 categoryid={this.props.match.params.categoryid} /> */}
                            <div>
                                {this.state.categories.map(
                                    (item, index) => 
                                    <ExpansionPanel key={index}>
                                        <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography
                                            style={{
                                            fontFamily:'IranSans',
                                            fontSize:'14px'
                                            }}
                                            >{item.name}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <ul>
                                            {item.allSubCategories.map(
                                                (i, ind) =>
                                                <li
                                                    key={ind}
                                                    // onClick={()=>this.showSubCategoryContent(i.id)}
                                                    >
                                                    <Typography
                                                    component="div"
                                                    style={{
                                                        fontFamily:'IranSans',
                                                        fontSize:'14px',
                                                    }}
                                                    >
                                                    {i.name}
                                                    </Typography>
                                                </li>
                                            )}
                                            </ul>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )}

                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Paper
                            style={{
                                fontFamily:'IranSans'
                            }}
                            >
                            {
                                (this.state.isRender) ? 
                                    this.Subjects()
                                        : null
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
export default Category;