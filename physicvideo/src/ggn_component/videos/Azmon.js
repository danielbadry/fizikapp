import React from 'react';
import { StyleSheet, Text, View, Image , TouchableNativeFeedback , AsyncStorage, Picker} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CheckBox , ListItem, List , Right, Left, Body, Spinner, Icon } from 'native-base';
import Swiper from 'react-native-web-swiper';
import dataProvider from '../../ggn_dataProvider';
export default class Azmon extends React.Component {
	constructor(props) {
		super(props);
		this.answer = {};
	}
	state = {
		video_id:null,
		Attended:{ isAttended:null },
		questions:{},
		answer:{}
	}
	async componentDidMount () {
		this.getData(this.props.id);
	}
	getData = async (get_video_id) => {
		await new Promise((resolve, reject) => {
			dataProvider('GET','/quizes/getuserquizresponse',{ model: "products" ,  modelId: get_video_id })
			.then((response) => {
				this.setState({Attended: response , video_id: get_video_id},this.default_answer)
				resolve(response);
			})
			.catch(reject);
			dataProvider('GET','/quizes',{ model: "products" ,  modelId: get_video_id })
			.then((response) => {
				this.setState({questions: response},this.default_answer);
			})
			.catch(reject);
		});

	}
	default_answer = () => {
		if(this.state.Attended.isAttended === true){
			var q = this.state.Attended.userQuizResponse;
			for (var i = 0; i < q.length; i++) {
				if(this.answer[q[i].quizId] == undefined){
					this.answer[q[i].quizId] = {};
				}
				this.answer[q[i].quizId][q[i].responseId] = true;
			}
			this.setState({
				answer:this.answer
			})
		}
		else if(this.state.Attended.isAttended === false || this.state.Attended.isAttended === null){
			if(this.state.questions.length > 0){
				var q = this.state.questions;
				for (var i = 0; i < q.length; i++) {
					var o = q[i].options;
					console.log(o);
					for (var j = 0; j < o.length; j++) {
						console.log(this.answer);
						console.log(o[j]);
						if(this.answer[q[i].id] == undefined){
							this.answer[q[i].id] = {};
						}
						this.answer[q[i].id][o[j].id] = false;
					}
				}
				this.setState({answer:this.answer});
			}
		}
	}
	user_checked = (q , o) => {
		if(this.state.Attended.isAttended === false){
			var qa = this.state.questions;
			for (var i = 0; i < qa.length; i++) {
				var op = qa[i].options;
				if(q === qa[i].id){
					for (var j = 0; j < op.length; j++) {
						this.answer[qa[i].id][op[j].id] = false;
					}
				}
			}
			this.answer[q][o] = true;
			this.setState({answer:this.answer});
		}
	}
	render_html = () => {
		if(this.state.questions.length > 0 && Object.keys(this.state.answer).length > 0){
			var questions_show = this.state.questions;
			var html = questions_show.map(
				(item,index)=>
					<View style={[styles.slideContainer]} key={'question_'+item.id} style={{marginTop:40,marginBottom:20}}>
						<View>
							<Text style={[styles.title]}> { item.question } </Text>
						</View>
						<View>
							<Text style = {[styles.title]}>
								پاسخ :
							</Text>
								{ item.options.map(
									(get_option,get_option_index)=>
										<ListItem key={'option_'+get_option.id}>
											<Left onPress={() => this.user_checked(item.id,get_option.id)}>
												{
													(this.state.answer[item.id][get_option.id] === true)?<CheckBox checked={true} onPress={() => this.user_checked(item.id, get_option.id)} />
													:<CheckBox checked={false} onPress={() => this.user_checked(item.id,get_option.id)} />
												}
											</Left>
											<Body onPress={() => this.user_checked(item.id,get_option.id)}>
												<Text style={[styles.colorfix]}> { get_option.title } </Text>											
											</Body>
											<Right onPress={() => this.user_checked(item.id,get_option.id)}>
												{
													(this.state.Attended.isAttended === true && get_option.isAnswer === true)?<Icon style={{color:"#0F0"}} name="checkmark" />
													:<View></View>
												}
											</Right>
										</ListItem>
								)}
						</View>
					</View>
			);
			return html;
		}
	}
	renderResult = () => {
		var html = <View></View>;
		if(this.state.Attended.isAttended === true){
			var true_ans = 0;
			var qa = this.state.questions;
			var total_qa = qa.length;
			for (var i = 0; i < qa.length; i++) {
				var op = qa[i].options;
				for (var j = 0; j < op.length; j++) {
					if (op[j].isAnswer === true && this.answer[qa[i].id][op[j].id] === true) {
						true_ans++;
					}
				}
			}
			var result = (true_ans / total_qa) * 100;
			html = <Text style={[styles.title]}>امتیاز شما : %{result}</Text>;
			return html;
		}
		else if (this.state.Attended.isAttended === false){
			html = <TouchableNativeFeedback onPress={this.checkResult} style={{marginTop:90}}>
					<Text style={[styles.btnlogin]} >
						نتیجه آزمون
					</Text>
				</TouchableNativeFeedback>
			return html;
		}
	}
	checkResult = async () => {
		var send_array = [];
		if(Object.keys(this.answer).length > 0){
			for (let [key, value] of Object.entries(this.answer)) {			
				for (let [key_op, value_op] of Object.entries(value)) {
					if(value_op === true){
						send_array.push({
							'quizId': key,
							'responseId': key_op,	
						})				
					}
				}
			}
		}
		send_array = JSON.stringify(send_array);
		await new Promise((resolve, reject) => {
			dataProvider('UPLOAD','/quizesanswer',{answers: send_array})
			.then((response) => {
				this.getData(this.props.id);
				resolve(response);
			})
			.catch(reject);
		});
	}
	render() {
		console.log(this.state.Attended);
		console.log(this.state.answer);
		if(this.state.questions.length > 0 && Object.keys(this.state.answer).length > 0){
			var questions_show = this.state.questions;
			return (
				<View style={styles.container}>
					<Image source = {require('../../images/blackbord.jpg')}  style={{position:"absolute" , width:'100%' , height:'100%' }} />
					{this.render_html()}
					{this.renderResult()}
					<TouchableNativeFeedback onPress={ Actions.replace('singleVideo', {id: this.state.video_id}) } style={{marginTop:90}}>
						<Text style={[styles.btnlogin]} >
							بازگشت
						</Text>
					</TouchableNativeFeedback>
				</View>
			);
		}
		else{
			return (
				<View style={styles.container}>
					<Image source = {require('../../images/blackbord.jpg')}  style={{position:"absolute" , width:'100%' , height:'100%' }} />
					<Spinner color='blue' style={{display: "flex" ,AlignItems: "center", marginTop:40}} />
				</View>
			)
		}
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		fontFamily: "IRANSans",
	},
	slideContainer: {
		padding:10,
	},
	colorfix:{
		color:"#fff",
		fontFamily: "IRANSans",
	},
	title: {
		fontFamily: "IRANSans",
		fontWeight: 'bold',
		fontSize: 22,
		textAlign: "center",
		color:'#fff',
	},
	description: {
		fontFamily: "IRANSans",
		fontSize: 20,
		textAlign: "center",
		color:'#fff'
	},
	btnlogin:{
		fontFamily: "IRANSans", 
		fontWeight:'bold',
		fontSize: 20 , 
		color:'#fff' ,
		textAlign:'center',
		elevation: 4,
		backgroundColor: '#2196F3',
		borderRadius: 7,
		marginTop:20,
		padding:5
	},
});