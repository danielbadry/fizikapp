import React, { Component } from 'react';
import GgnMain from '../main';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Dimensions, View, TouchableNativeFeedback, TextInput, ScrollView, Image } from 'react-native';
import { Text, Item, Card, CardItem, Body, Left,Right, Icon, Thumbnail, Button, Tabs, Tab, TabHeading, Spinner, Textarea } from 'native-base';
import dataProvider from '../../ggn_dataProvider';
const screenWidth = Math.round(Dimensions.get('window').width)-26;
class singleRequest extends Component {
	state = {
		data: null,
		comments:{ 0: null },
		comment_parrent: "",
		comment_send: "",
		qas:{ 0: null },
		comment_count:0
	}
	async componentDidMount(){
		this.getData(this.props.id);
	}
	getData = async (request_id) => {
		await new Promise((resolve, reject) => {
			dataProvider('GET','/requests/'+request_id)
			.then((response) => {
				this.setState({data: response})
				resolve(response)
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
		})
	}
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
		if(this.state.data){
			var item = this.state.data;
			console.log(item);
			return (
				<GgnMain title='درخواست' back={true}>
					<Text style={[styles.fix_font2]}> 
						{item.title}
					</Text>
					<Text style={[styles.fix_font2]}> 
						{item.message}
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
			return (
				<GgnMain title="درخواست" back={true}>
					<View style={{marginTop: "30%",}}>
						<Spinner color='blue' style={{display: "flex" ,AlignItems: "center"}} />
					</View>
				</GgnMain>
			);
		}
	}
}
export default singleRequest;
const styles = StyleSheet.create({
	fix_font2:{
		textAlign: 'right' ,
		fontFamily: "IRANSans",
		fontSize: 15,
	},
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
		fontFamily: "IRANSans",
	},
	input: {
		fontFamily: "IRANSans",
		fontSize: 15,
		width:"100%"
	},
});