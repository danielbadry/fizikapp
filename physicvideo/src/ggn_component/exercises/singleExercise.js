import React, { Component } from 'react';
import GgnMain from '../main';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Dimensions, View, ScrollView, TouchableNativeFeedback, TextInput, Image } from 'react-native';
import { Text, Item, Card, CardItem, Body, Left,Right, Icon, Thumbnail, Button, Tabs, Tab, TabHeading, Spinner, Textarea } from 'native-base';
import VideoPlayer from 'react-native-video';
import dataProvider from '../../ggn_dataProvider';
const screenWidth = Math.round(Dimensions.get('window').width)-26;
class singleExercise extends Component {
	constructor(props) {
		super(props);
		this.player_single = React.createRef();
		this.played_until = 0;
	}
	state = {
		data:null,
		video_id:null,
		comments:{ 0: null },
		comment_parrent: "",
		comment_send: "",
		qas:{ 0: null },
		start_of:0,
		like:0,
		disLikes:0,
		comment_count:0
	}
	async componentDidMount () {
		this.getData(this.props.id);
	}
	componentWillUnmount(){
		if(this.played_until > 0){
			console.log(this.played_until);
			dataProvider('POST', '/watchedvideos/setuserwatchstatus', { model: "products", modelّd: this.state.video_id, startTime: this.played_until });
		}
	}
	getData = async (get_video_id) => {
		await new Promise((resolve, reject) => {
			dataProvider('GET','/exercises/'+get_video_id)
			.then((response) => {
				/*console.log(response);
				console.log(get_video_id);*/
				this.setState({data: response , video_id: get_video_id})
				resolve(response);
			})
			.catch(reject);
			dataProvider('GET','/likedislikeview',{ model: "products" , modelid: get_video_id })
			.then((response) => {
				this.setState({ 
					like: response.likes.count ,
					disLikes: response.disLikes.count 
				})
				resolve(response);
			})
			.catch(reject);
			dataProvider('GET','/userinteractions',{ model: "products" , modelid: get_video_id })
			.then((response) => {
				var new_comment = [];
				var new_qa 		= [];
				for (var i = 0; i < response.length; i++) {
					var j = 0;
					if (response[i].parentId == "" || response[i].parentId == 0) {
						j = 0;
					}
					else {
						j = response[i].parentId;
					}
					if(response[i].type == "qa"){
						if (!new_qa[j]) {
							new_qa[j] = [];
						}
						new_qa[j].push(response[i]);
					}else{
						if (!new_comment[j]) {
							new_comment[j] = [];
						}
						new_comment[j].push(response[i]);
					}
				}
				//console.log(new_comment);
				this.setState({ 
					comments: new_comment,
					qas: new_qa,
				})
				resolve(response);
			})
			.catch(reject);
		});
	}
	set_time_video = (data) =>{
		if(data.currentTime > 0){
			this.played_until = data.currentTime;
		}
	}
	/**************************************************************/
	/**************************************************************/
	/*********************** comment handel ***********************/
	/**************************************************************/
	/**************************************************************/
	comment_reply = (reply_id)=> {
		this.setState({ 
			comment_parrent: reply_id,
		})
		this.comments_textarea.focus();
	}
	handleComment = (text) => {
		this.setState({ comment_send: text , comment_parrent: "" })
	} 
	send_comment = async () =>{
		var get_video_id = this.props.id;
		var parrent = this.state.comment_parrent;
		var message = this.state.comment_send;
		await new Promise((resolve, reject) => {
			dataProvider('POST','/userinteractions',{ 
				model:"products", 
				modelId:get_video_id, 
				parentId:parrent, 
				message:message,
				type: "comment"
			})
			.then((response) => {
				this.getData(this.props.id);
				this.setState({ comment_send: "" })
			})
			.catch(reject);
			console.log(message);
		})
	}
	comments_render = (comment = 0) =>{
		if(this.state.comments[comment] !== undefined && this.state.comments[comment] !== null ){
			var html = this.state.comments[comment].map(
				(item,index)=>
				<Card key={"qa_"+item.id} style={{width:"100%"}}>
					<CardItem style={{ paddingBottom: 0}}>
						<Body style={{flexDirection: 'row-reverse' }}>
							<Text note style={[styles.fix_font2],{flexDirection:'row', marginRight:0}}>{item.userInfo.firstName}</Text>
							<TouchableNativeFeedback style={{flexDirection:'row'},{fontSize:13}} onPress={()=>this.comment_reply(item.id)}><Text note style={[styles.fix_font2]}>پاسخ</Text></TouchableNativeFeedback>
						</Body>
					</CardItem>
					<CardItem style={{paddingTop:3}}>
						<Body style={{ alignItems: 'flex-end'}}>
							<Text style={[styles.fix_font2]}>{item.message}</Text>
							{ this.comments_render(item.id) }
						</Body>
					</CardItem>
				</Card>
			)
			return html;
		}
	}
	/**************************************************************/
	/**************************************************************/
	/*********************** qa handel ****************************/
	/*********** ***************************************************/
	/**************************************************************/
	qa_reply = (reply_id)=> {
		this.setState({ 
			qa_parrent: reply_id,
		})
		this.comments_textarea.focus();
	}
	handleqa = (text) => {
		this.setState({ qa_send: text , qa_parrent: "" })
	} 
	send_qa = async () =>{
		var get_video_id = this.props.id;
		var parrent = this.state.qa_parrent;
		var message = this.state.qa_send;
		await new Promise((resolve, reject) => {
			dataProvider('POST','/userinteractions',{ 
				model:"products", 
				modelId:get_video_id, 
				parentId:parrent, 
				message:message,
				type: "qa"
			})
			.then((response) => {
				this.getData(this.props.id);
				this.setState({ qa_send: "" })
			})
			.catch(reject);
			console.log(message);
		})
	}
	qas_render = (qa = 0) =>{
		if(this.state.qas[qa] !== undefined && this.state.qas[qa] !== null ){
			var html = this.state.qas[qa].map(
				(item,index)=>
				<Card key={"qa_"+item.id} style={{width:"100%"}}>
					<CardItem style={{ paddingBottom: 0}}>
						<Body style={{flexDirection: 'row-reverse' }}>
							<Text note style={[styles.fix_font2],{flexDirection:'row', marginRight:0}}>{item.userInfo.firstName}</Text>
							<TouchableNativeFeedback style={{flexDirection:'row'},{fontSize:13}} onPress={()=>this.comment_reply(item.id)}><Text note style={[styles.fix_font2]}>پاسخ</Text></TouchableNativeFeedback>
						</Body>
					</CardItem>
					<CardItem style={{paddingTop:3}}>
						<Body style={{ alignItems: 'flex-end'}}>
							<Text style={[styles.fix_font2]}>{item.message}</Text>
							{ this.comments_render(item.id) }
						</Body>
					</CardItem>
				</Card>
			)
			return html;
		}
	}
	render() {
		console.log(this.player_single);
		if(this.state.data){
			var thumbnail_video = require('../../images/video.jpg');
			if(this.state.data.summary.thumbnail !== ""){
				thumbnail_video = { uri: this.state.data.summary.thumbnail }
			}
			var url_video = "";
			if(this.state.data.summary.videoAddress !== ""){
				url_video = { uri: this.state.data.summary.videoAddress }
			}
			start_time_video = 0;
			if(this.state.data.summary.startTime !== undefined){
				start_time_video = parseInt(this.state.data.summary.startTime , 10);
			}
			var show_video = <Image source={thumbnail_video} style={styles.backgroundVideo}/>
			var show_azmon = <View></View>
			if( this.state.data.summary.userCanSeeVideo == true ){
				console.log(this.state.data.summary.userCanSeeVideo);
				console.log(start_time_video);
				console.log(this.state.data.summary);
				if(start_time_video > 0){
					show_video = <VideoPlayer
								ref={this.player_single}
								source={url_video}
								style={styles.backgroundVideo}
								currentPosition={start_time_video}
								onProgress={this.set_time_video}
								controls={true}
								resizeMode={'contain'}
								rate={ 1 }
								paused={false}
								repeat={false}
								/>;
				}
				else{
					show_video = <VideoPlayer
								ref={this.player_single}
								source={url_video}
								style={styles.backgroundVideo}
								onProgress={this.set_time_video}
								controls={true}
								resizeMode={'contain'}
								rate={ 1 }
								paused={false}
								repeat={false}
								/>;	
				}
				show_azmon = <View padder>
						<View style={{marginTop:10, marginBottom:10}}>
						<Button style={{ paddingTop: 0, borderRadius: 7, marginLeft: 7 }} onPress={() => Actions.replace('Azmon', { id:this.state.data.summary.id }) }>
								<Text style={[styles.btnlogin]} >آزمون</Text>
							</Button>
						</View>
					</View>;
			}
			var item = this.state.data
			return (
				<GgnMain title={this.state.data.summary.name} back={true}>
					<Card>
						<CardItem>
							<View style={{width: "100%"}}>
								<Text>{this.state.data.summary.name}</Text>
							</View>
						</CardItem>
						<CardItem cardBody>
							{ show_video }
						</CardItem>
						<CardItem>
							<Right>
								<Button transparent>
									<Text style={[styles.fix_font2],{fontSize:18}} >{this.state.like} لایک</Text>
									<Icon active name="thumbs-up" />
								</Button>
							</Right>
							<Right>
								<Button transparent>
									<Text style={[styles.fix_font2],{fontSize:18}}>{this.state.comment_count} نظر</Text>
									<Icon active name="chatbubbles" />
								</Button>
							</Right>
						</CardItem>
					</Card>
					<Text style={[styles.fix_font2]}>
						{this.state.data.summary.description}
					</Text>
					<Tabs initialPage={1}>
						<Tab ref="comment_0" heading="سوالات">
							<View padder>
								<Item style={{marginBottom: '4%',textAlign: 'right',}}>
									<TextInput value={this.state.qa_send} multiline={true} style={[styles.input]} placeholder="نظر خود را یادداشت کنید"  ref={(input) => { this.qa_textarea = input; }} onChangeText = {this.handleqa}/>
								</Item>
								<View style={{marginTop:10, marginBottom:10}}>
									<Button style={{paddingTop:0 , borderRadius: 7 , marginLeft: 7 }}  onPress={ () =>this.send_qa() }>
										<Text style={[styles.btnlogin]} >ارسال نظر</Text>
									</Button>
								</View>
							</View>
							{this.qas_render()}							
						</Tab>
						<Tab heading="نظرات">
							<View padder>
								<Item style={{marginBottom: '4%',textAlign: 'right',}}>
									<TextInput value={this.state.comment_send} multiline={true} style={[styles.input]} placeholder="نظر خود را یادداشت کنید"  ref={(input) => { this.comments_textarea = input; }} onChangeText = {this.handleComment}/>
								</Item>
								<View style={{marginTop:10, marginBottom:10}}>
									<Button style={{paddingTop:0 , borderRadius: 7 , marginLeft: 7 }}  onPress={ () =>this.send_comment() }>
										<Text style={[styles.btnlogin]} >ارسال نظر</Text>
									</Button>
								</View>
							</View>
							{this.comments_render()}
						</Tab>
					</Tabs>
				</GgnMain>
			);
		}
		else{
			return(
				<GgnMain title="" back={true}>
					<View style={{marginTop: "30%",}}>
						<Spinner color='blue' style={{display: "flex" ,AlignItems: "center"}} />
					</View>
				</GgnMain>
			);
		}
	}
}
export default singleExercise;
const styles = StyleSheet.create({
	fix_font:{
		textAlign: 'center' ,
		justifyContent: 'center',
		fontFamily: "IRANSans",
		fontSize: 15,
	},
	sidebar_list_item:{
		fontFamily: "IRANSans",
		marginBottom:2,
	},
	single_image: {
		flexDirection:'row',
		flexWrap:'wrap',
		alignContent: 'center'
	},
	button_add:{ 
		backgroundColor: '#28B498', 
		position:'absolute', 
		bottom:30, 
		marginLeft:30, 
		fontSize: 15,
		borderRadius:300
	},
	btnlogin:{
		fontFamily: "IRANSans",
		fontSize:15,
		padding:0,
		width:"100%",
		textAlign: 'center',
	},
	backgroundVideo:{
		width: screenWidth,
		height:screenWidth,
	},
	fix_font2:{
		textAlign: 'right' ,
		fontFamily: "IRANSans",
		fontSize: 15,
	},
	input: {
		fontFamily: "IRANSans",
		fontSize: 15,
		width:"100%"
	},
});