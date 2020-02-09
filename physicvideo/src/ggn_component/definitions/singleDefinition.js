import React, { Component } from 'react';
import GgnMain from '../main';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, ScrollView, Image, TextInput, TouchableNativeFeedback } from 'react-native';
import { Container, Item, Content, List, ListItem, View, Card, CardItem, Left, Right, Body, Tabs, Tab, Text, Button, Icon, Spinner } from 'native-base';
import dataProvider from '../../ggn_dataProvider'; 
class singleDefinition extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		data:null,
		definition_id:null,
		comments:{ 0: null },
		comment_parrent: "",
		comment_send: "",
		qas:{ 0: null },
	}
	async componentDidMount () {
		this.getData(this.props.id);
	}
	getData = async (get_definition_id) => {
		await new Promise((resolve, reject) => {
			dataProvider('GET','/definitions/'+get_definition_id)
			.then((response) => {
				console.log(response);
				this.setState({data: response , definition_id: get_definition_id})
				resolve(response);
			})
			.catch(reject);
			dataProvider('GET','/userinteractions',{ model: "definitions" , modelid: get_definition_id })
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
				this.setState({ 
					comments: new_comment,
					qas: new_qa,
				})
				resolve(response);
			})
			.catch(reject);
		});
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
				model:"definitions", 
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
	/**************************************************************/
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
				model:"definitions", 
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
			console.log(this.state.data);
			return (
				<GgnMain title="تعریف یک" back={true}>
					<Text style={[styles.fix_font],{fontSize: 24}}> 
						{this.state.data.summary.name}
					</Text>
					<View style={[styles.single_image]}>
						{
							(this.state.data.summary.thumbnail !== "")?<Image style={{ flex:1, height: 100, width: 100, resizeMode: 'contain' }} source = {{ uri:this.state.data.summary.thumbnail }} />
							:<View></View>
						}
					</View>
					<Text style={[styles.fix_font]}>
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
export default singleDefinition;
const styles = StyleSheet.create({
	fix_font:{
		textAlign: 'right' ,
		fontFamily: "IRANSans",
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
		fontSize: 20,
		borderRadius:300
	},
	fix_font2:{
		fontFamily: "IRANSans",
	},
	btnlogin:{
		fontFamily: "IRANSans",
		fontSize:20,
		padding:0,
		width:"100%",
		textAlign:"center"
	},
	input: {
		fontFamily: "IRANSans",
		fontSize: 15,
		width:"100%"
	},
});