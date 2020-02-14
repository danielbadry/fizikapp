import React from 'react';
import RelatedProducts from "./RelatedProducts";
import Typography from '@material-ui/core/Typography';
import {
	Player,
	ControlBar,
	ReplayControl,
	ForwardControl,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton,
	VolumeMenuButton
  } from 'video-react';
import ContentUserInteraction from "../comments/ContentUserInteraction";
import QuizComponent from '../QuizComponent';
import Grid from '@material-ui/core/Grid';
import ArticlesToolBox from "../ArticlesToolBox";
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import NavigationIcon from '@material-ui/icons/Navigation';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { createMuiTheme } from '@material-ui/core/styles';
import css from "./video-react.css"

//import MainHeader from "./MainHeader";
class SingleProduct extends React.Component {
	constructor(props, context){
		
		super(props, context);
		this.state = {
			summary: {},
			token: null,
			cats:[],
			tags: [],
			id: '',
			targetCatId:null,
			targetCatName:null,
			isRender : false,
			thumbnail: '',
			userCanSeeQuiz: true,
			videoInfoBoxDisplayType: 'flex',
			videoPlayerDisplayType: 'none',
			productId: props.productid,
			userInteractionConfig : [
				{
					type:'qa',
					label:'پرسش و پاسخ',
					model:'products'
				},
				{
					type:'comment',
					label:'نظرات',
					model:'products'
				}
			],
			reportDialog : false,
			reportValue : null
		}

	};

	catchMeHere = () => {
		this.fetchProduct();
	}

	switchBetweenVideo = () => {
		this.setState(function(state, props) {
			return {
				videoInfoBoxDisplayType: 'none',
				videoPlayerDisplayType: 'block',
			};
		  });
		this.player.play();
		let modelId = this.props.match.path.split('/')[2];
		console.info('injast:', this.props);
		console.info('arr:', modelId);
		let data = {
			type : 'view',
			model : 'products',
			modelId : modelId
		}

		fetch(process.env.REACT_APP_API_URL+`likedislikeview`, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				'authorization': `Bearer ${this.state.token}`,
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(data), // body data type must match "Content-Type" header
			})
			.then(response => response.json())
			.then(result => {
				// this.fetchData(this.state.token);
			});
	}
	
	openReportDialog = () => {
		this.setState(function(state, props) {
			return {
				reportDialog: true,
			};
		});
	}
	
	handleClose = () => {
		this.setState(function(state, props) {
			return {
				reportDialog: false,
			};
		});
	}
	
	reportUse = (event) => {
		// console.info('event:', event);
		// this.setState(function(state, props) {
		//	 return {
		//		 reportValue: event.target.value,
		//	 };
		// });
	}
	
	addToFavorites = () => {
		console.info(this.props);
		const token = localStorage.getItem('token');
		let data = {
			id : this.props.match.path.split('/')[2],
			model: 'products'
		}
		fetch(process.env.REACT_APP_API_URL+`favorites`, {
			method: 'POST', 
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'authorization': `Bearer ${token}`,
			},
			redirect: 'follow',
			referrer: 'no-referrer',
			body: JSON.stringify(data),
			})
			.then(response => response.json())
			.then(result => {
				
			});
	}

	fetchProduct = (token) => {
		fetch(process.env.REACT_APP_API_URL+`products/${this.props.match.path.split('/')[2]}`, {
			method: 'GET', 
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'authorization': `Bearer ${token}`,
			},
			redirect: 'follow',
			referrer: 'no-referrer',
			})
			.then(response => response.json())
			.then(product => {
				this.setState(function(state, props) {
					return {
						summary: JSON.parse(JSON.stringify(product.data.summary)),
						tags: JSON.parse(JSON.stringify(product.data.tags)),
						thumbnail: product.data.thumbnail,
						id: product.data.id,
						isRender: true
					};
				  }, () => {
					this.setState(function(state, props) {
						return {
							isRender: true
						}});
					this.player.subscribeToStateChange(this.handleStateChange.bind(this));
				  });
			});
	}

	componentWillUnmount() {
		const { player } = this.player.getState();
		const token = localStorage.getItem('token');
		let data = {
			modelId: this.props.match.path.split('/')[2],
			startTime: player.currentTime,
			model:'products'
		}
		fetch(process.env.REACT_APP_API_URL+`watchedvideos/setuserwatchstatus`, {
			method: 'POST', 
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'authorization': `Bearer ${token}`,
			},
			redirect: 'follow',
			referrer: 'no-referrer',
			body: JSON.stringify(data),
			})
			.then(response => response.json())
			.then(result => {
				
			});
	}

	handleStateChange(state, prevState) {
		// copy player state to this component's state
		this.setState({
		  player: state,
		  currentTime: state.currentTime
		});
		window.localStorage.setItem('model', 'products');
		window.localStorage.setItem('modelId', this.props.match.path.split('/')[2]);
		window.localStorage.setItem('currentTime', this.state.currentTime);
	  }

	componentDidMount(){
		// fetch(process.env.REACT_APP_API_URL+`categories/findparentdirectoryid?rowId=${this.props.match.path.split('/')[2]}&model=products`, {
		//	 method: 'GET', // *GET, POST, PUT, DELETE, etc.
		//	 mode: 'cors', // no-cors, cors, *same-origin
		//	 cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		//	 credentials: 'same-origin', // include, *same-origin, omit
		//	 headers: {
		//		 'Content-Type': 'application/json',
		//		 // 'authorization': `Bearer ${token}`,
		//	 },
		//	 redirect: 'follow', // manual, *follow, error
		//	 referrer: 'no-referrer', // no-referrer, *client
		//	 // body: JSON.stringify(data), // body data type must match "Content-Type" header
		//	 })
		//	 .then(response => response.json())
		//	 .then(result => {
		//		 console.info('resd:', result);
		//		 var category = result.data[0].p;
		//		 fetch(process.env.REACT_APP_API_URL+`categories/allcategories?rowId=${result.data[0].p.id}&model=products`, {
		//			 method: 'GET', // *GET, POST, PUT, DELETE, etc.
		//			 mode: 'cors', // no-cors, cors, *same-origin
		//			 cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		//			 credentials: 'same-origin', // include, *same-origin, omit
		//			 headers: {
		//				 'Content-Type': 'application/json',
		//				 // 'authorization': `Bearer ${token}`,
		//			 },
		//			 redirect: 'follow', // manual, *follow, error
		//			 referrer: 'no-referrer', // no-referrer, *client
		//			 // body: JSON.stringify(data), // body data type must match "Content-Type" header
		//			 })
		//			 .then(response => response.json())
		//			 .then(result => {
		//				 this.setState((state, props) => {
		//					 return ({
		//						 cats: result,
		//						 targetCatId: category.id,
		//						 targetCatName: category.name,
		//					 });
		//				 }, () => {
		//					 this.setState({isRender: true})
		//				 });
		//			 });
		//	 });

		console.info('pri:', this.props);
		const token = localStorage.getItem('token');
		this.setState(function(state, props) {
			return {
				token: token
			}});
		this.fetchProduct(token);  
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.summary.id != this.props.match.path.split('/')[2]) {
			const token = localStorage.getItem('token');
			this.fetchProduct(token);
		}
		// window.scroll(0,0);
	}
	getMenu = ( parentID ) => {
		let finalStr;
		let data = this.state.cats;
		return data.filter(function(node){ return ( node.parentId === parentID ) ; }).map((node)=>{
			var exists = data.some(function(childNode){  return childNode.parentId === node.id; });
			var subMenu = (exists) ? '<ul>'+ this.getMenu(node.id).join('') + '</ul>' : "";
			if(node.url){
				finalStr = `<li><a href=#/${node.url}><img src=${node.thumbnail} style='width:40px' />` + node.name + `</a>` +  subMenu + `</li>` ;
			} else 
			{
				finalStr = '<li>'+node.name +  subMenu + '</li>' ;
			}
			return finalStr;
		});
	}
	
	Subjects (initLevel) {
		var endMenu = this.getMenu(initLevel);
		let someHtml = '<ul>'+endMenu.join('')+ '</ul>';
		return(
			<div style={{
				direction:'rtl'
				}} className="Container" dangerouslySetInnerHTML={{__html: someHtml}}>
			</div>
		)
	}

	render() {
		const theme = createMuiTheme();
		const classes = {
			dir_rt:{
				direction:"rtl",
				fontFamily: 'IranSans'
			},
			div_main:{
				direction:"rtl",
				fontFamily:'IranSans',
				padding:theme.spacing(1),
			},
			button_margin:{
				margin: theme.spacing(1),
				fontFamily: 'IranSans'
			},
			video_now_alowd_to_show:{
				position:"absolute",
				top:"0",
				right:"0",
				background:"rgba(0,0,0,0.8)",
				width:"100%",
				height: "100%",
				zIndex:100,
				padding: theme.spacing(2),
				color:"#fff",
				direction:"rtl",
				fontSize: "17px"
			},

		}
		var source_video = "https://bayanbox.ir/view/9031796384992142247/reg1.gif";
		if(this.state.summary.userCanSeeVideo == true){
			source_video = this.state.summary.videoAddress;
		}
		return (
			<Grid container spacing={0} style={classes.dir_rt}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Grid container spacing={2} justify="center" >
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
							<Grid container spacing={0}>
								<Grid item xs={12} sm={12} md={8} lg={8} xl={8} style={{position:"relative"}}>
									{(this.state.isRender) ?
										<Player
											ref={player => {
												this.player = player;
											  }}
											fluid = {false}
											width={900}
											poster={this.state.summary.thumbnail}
											startTime = {this.state.summary.startTime}
											style={{
												maxWidth:"100%"
											}}
											>
											{
												(this.state.summary.userCanSeeVideo == false) ?
												<div style={classes.video_now_alowd_to_show}>
													<RemoveCircleOutlineIcon style={{fontSize:"110px", marginLeft: "20px",float:"right"}}/>
													<br/>
													شما مجاز به مشاهده این ویدئو نمیباشید لطفا 
													<Button
														href="#signup"
														variant="contained"
														color="primary"
														style={classes.button_margin}
														>
														ثبت نام کنید
													</Button>
													یا
													<Button
													variant="contained"
													color="primary"
													href="#signin"
													style={classes.button_margin}
													>
													وارد شوید
													</Button>
													<br/>
													<br/>
													در صورتی که ثبت نام کرده و وارد شده اید اشتراک شما مورد تایید نمیباشد.
													<Button
													variant="contained"
													color="primary"
													href="#signin"
													style={classes.button_margin}
													>
													اشتراک بخرید
													</Button>
												</div>
												: null
											}
											<source src={source_video} />
											<ControlBar>
												<ReplayControl seconds={10} order={1.1} />
												<ForwardControl seconds={10} order={1.2} />
												<CurrentTimeDisplay order={4.1} />
												<TimeDivider order={4.2} />
												<PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
												<VolumeMenuButton />
											</ControlBar>
										</Player>
										: 
										null
									} 
								</Grid>
								<Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={classes.div_main}>
									{this.state.summary.name}
									<br/>
									{/*
										مناسب برای مقطع دوازدهم

										-----------------------

										کارگردان ایمان ارقامی

										-----------------------

										مدت زمان یک ساعت و چند دقیقه

										-----------------------

										زیر نویس دارد
									*/}
									موضوع: {this.state.summary.title}
								</Grid>
							</Grid>
						</Grid>
						
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={classes.div_main}>
							
							{(this.state.token && this.state.summary.userCanSeeVideo) ? 
								<Fab aria-label="like" style={classes.button_margin}
									onClick={this.switchBetweenVideo}
									title="نمایش فیلم"
									>
									<PlayCircleFilledIcon />
								</Fab> :
								null
							}
							{(this.state.token && this.state.summary.userCanSeeVideo) ? 
								<React.Fragment>
									<Button
									variant="contained"
									color="primary"
									size="small"
									className={classes.button}
									startIcon={<BookmarkIcon />}
									style={classes.button_margin}
									onClick={this.addToFavorites}
									>
									افزودن به علاقه مندی ها
									</Button>
									
									<Fab 
										aria-label="like" 
										style={classes.button_margin}
										onClick={this.openReportDialog}
										title="گزارش خرابی"
										>
										<ReportProblemIcon />
									</Fab>
									<Dialog
										open={this.state.reportDialog}
										onClose={this.handleClose}
										aria-labelledby="alert-dialog-title"
										aria-describedby="alert-dialog-description"
										style={{
											direction: 'rtl'
										}}
									>
										<DialogTitle id="alert-dialog-title">
										<Typography
											style = {{
												fontFamily: 'IranSans_Light',
												// fontWeight: 'bold',
											}}
											>
											این ویدیو چه مشکلی دارد :
										</Typography>
										</DialogTitle>
										<DialogContent>
										<DialogContentText id="alert-dialog-description">
										<FormControl 
											component="fieldset" 
											// className={classes.formControl}
											>
											{/* <FormLabel component="legend">Gender</FormLabel> */}
											<RadioGroup 
												aria-label="gender" 
												name="gender1" 
												value={this.state.reportValue} 
												onChange={(event) => this.reportUse(event)}
												>
											<FormControlLabel 
												value="r1" 
												control={<Radio />} 
												label={<Typography
													style = {{
														fontFamily: 'IranSans_Light',
														fontSize: '14px',
														color: 'black'
													}}
													>
													ویدیو خراب است
												</Typography>} 
												/>
											<FormControlLabel 
												value="r2" 
												control={<Radio />} 
												label={<Typography
													style = {{
														fontFamily: 'IranSans_Light',
														fontSize: '14px',
														color: 'black'
													}}
													>
													کیفیت بسیار پایینی دارد
												</Typography>} 
												/>
											<FormControlLabel 
												value="r3" 
												control={<Radio />} 
												label={<Typography
													style = {{
														fontFamily: 'IranSans_Light',
														fontSize: '14px',
														color: 'black'
													}}
													>
													سایر
												</Typography>}
												/>
											</RadioGroup>
										</FormControl>
										</DialogContentText>
										</DialogContent>
										<DialogActions>
										<Button 
											onClick={this.handleClose} 
											color="primary"
											style = {{
												fontFamily: 'IranSans_Light',
												// fontWeight: 'bold',
											}}
											>
											لغو
										</Button>
										<Button 
											onClick={this.handleClose} 
											color="primary" 
											autoFocus
											style = {{
												fontFamily: 'IranSans_Light',
												// fontWeight: 'bold',
											}}
											>
											ارسال
										</Button>
										</DialogActions>
									</Dialog>
								</React.Fragment>
								:
								null
							}
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<QuizComponent
						endFunc={this.catchMeHere}
						model='products'
						modelid={this.props.match.path.split('/')[2]}
					/>
					<ArticlesToolBox
						model='products'
						modelid={this.props}
						token={this.state.token}
					/>
				</Grid>

				<Grid container spacing={1} justify="center">
					<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
						<Paper>
							<div>{this.state.targetCatName}</div>
							{
							(this.state.isRender) ? 
								this.Subjects(this.state.targetCatId)
									: null
							}
						</Paper>
					</Grid>
				   
				<Grid item xs={7}>
					<Paper
						style = {{
							fontFamily: 'IranSans_Light',
							direction: 'rtl',
							textAlign: 'justify',
							padding: '3%',
							// margin: '1%'
						}}
						>
						<Typography
							style = {{
								fontFamily: 'IranSans_Light',
								fontWeight: 'bold',
								
							}}
							>
							عنوان :
						</Typography>
						<Typography 
							variant="span" 
							gutterBottom
							style={{ 
								fontFamily: 'IranSans_Light',
								fontSize: '14px',
								lineHeight: '1.8rem'
							}}
							>
							
						</Typography>
						<hr />
						<Typography
							style = {{
								fontFamily: 'IranSans_Light',
								fontWeight: 'bold',
								
							}}
							>
							توضیحات :
						</Typography>
						<Typography 
							variant="span" 
							gutterBottom
							style={{ 
								fontFamily: 'IranSans_Light',
								fontSize: '14px',
								lineHeight: '1.8rem'
							}}
							>
							<div dangerouslySetInnerHTML={{__html: this.state.summary.description}} />
						</Typography>
					</Paper>
				</Grid>
				
				<Grid item xs={12}>
				<ContentUserInteraction
					config={this.state.userInteractionConfig}
					modelid={this.props.match.path.split('/')[2]}
					/>
				</Grid>
				</Grid>
			</Grid>
		);
	}
}
export default SingleProduct;