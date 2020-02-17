import React from 'react';
import StickyFooter from "../header/footer/StickyFooter";
import Grid from '@material-ui/core/Grid'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme } from '@material-ui/core/styles';


//import Tree2 from "./Tree2";
class Category extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			categories : [],
			innerCategories:[],
			products:[],
			isRender: false,
			cats:[],
			baseCatId : null,
			baseCatName : null,
			expanded : '0'
		}
	}

	componentDidMount() {
		console.info('inje propeshe:', this.props);
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
				return ({
					categories: result.data,
					baseCatId: result.data[0].id,
					baseCatName: result.data[0].name,
				});
			}, () => {
				this.setState({isRender: true}, () => {
					console.info('base cat id : ', this.state.baseCatId);
				})
			});

			fetch(process.env.REACT_APP_API_URL+`categories/allcategories?rowId=${this.state.baseCatId}&model=products`, {
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
					console.info('catss:', result);
					this.setState((state, props) => {
						return ({
							cats: result.data.data,
							// baseCatId: result[0].id,
							// baseCatName: result[0].name,
						});
					}, () => {
						this.setState({isRender: true})
					});
				});
		});

		
	}

	getContent = (rowId) => {
		fetch(process.env.REACT_APP_API_URL+`categories/allcategories?rowId=${rowId}&model=products`, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'authorization': `Bearer ${token}`,
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
			// body: JSON.stringify(data), // body data type must match "Content-Type" header
			})
			.then(response => response.json())
			.then(result => {
				console.info('catss:', result);
				this.setState((state, props) => {
					return ({
						cats: result.data.data,
						baseCatId: result.data.baseCat.id,
						baseCatName: result.data.baseCat.name
					});
				}, () => {
					this.setState({isRender: true})
				});
			});
	}

	getMenu = ( parentID ) => {
		let finalStr;
		let data = this.state.cats;
		return data.filter(function(node){ return ( node.parentId === parentID ) ; }).map((node)=>{
			var exists = data.some(function(childNode){  return childNode.parentId === node.id; });
			var subMenu = (exists) ? '<ul>'+ this.getMenu(node.id).join('') + '</ul>' : "";
			if(node.url){
				finalStr = `<li><a href=#/${node.url}><img src=${node.thumbnail} style='width:40px' />` + node.name + `</a>` +  subMenu + `</li>` ;
			} else {
				finalStr = '<li>'+node.name +  subMenu + '</li>' ;
			}
			return finalStr;
		});
	}
	
	Subjects (initLevel) {
		console.info('intLevel:', this.state.finalBaseCatId);
		var endMenu = this.getMenu(initLevel);
		let someHtml = '<ul>'+endMenu.join('')+ '</ul>';
		return(
			<div style={{
				direction:'rtl'
				}} className="Container" dangerouslySetInnerHTML={{__html: someHtml}}>
			</div>
		)
	}

	handleChange = (panel, item) => (event, newExpanded) => {
		console.info('panelll:', item);
		
		if (panel == this.state.expanded) {
			this.setState({expanded:null});
		} else
			this.setState({expanded:panel});

		// get this category content
		let token = window.localStorage.getItem('token');
		fetch(process.env.REACT_APP_API_URL+`categories/allcategories?rowId=${item.id}&model=products`, {
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
				console.info('catss:', result);
				this.setState((state, props) => {
					return ({
						cats: result.data.data,
						baseCatId: item.id,
						baseCatName: item.name,
					});
				}, () => {
					this.setState({isRender: true})
				});
			});
	};

	render() {
		const theme = createMuiTheme();
		const classes = {
			categories_main:{
				direction:"rtl",
				padding:theme.spacing(2),
				fontFamily:'IranSans'
			},
			categories_ul:{
				display: "block",
				width: "100%",
				padding: "0px"
			},
			categories_li:{
				listStyle: "none",
				borderBottom: "1px solid #ccc",
				width: "100%",
				display: "block",
				paddingBottom: "7px",
				paddingTop: "7px",
			}
		}
		return(
			<React.Fragment>
				<Grid container justify="center" spacing={1}>
					<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
						<Paper
						style={classes.categories_main}
						>
							{this.state.baseCatName}
							{this.Subjects(this.state.baseCatId)}
						</Paper>
					</Grid>
					<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
						<Paper style={{direction:"rtl"}}>
							{/* <Tree2 categoryid={this.props.match.params.categoryid} /> */}
							<div>
								{this.state.categories.map(
									(item, index) => 
									<ExpansionPanel 
										key={index} 
										expanded={this.state.expanded == index} 
										onChange={this.handleChange(index, item)}
									>
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
											<ul style={classes.categories_ul}>
											{item.allSubCategories.map(
												(i, ind) =>
												<li
													style={classes.categories_li}
													key={ind}
													// onClick={()=>this.getContent(i.id)}
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
				</Grid>
			</React.Fragment>
		)
	}
}
export default Category;