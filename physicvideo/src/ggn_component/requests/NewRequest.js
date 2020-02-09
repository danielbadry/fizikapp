import React, { Component } from 'react';
import GgnMain from '../main';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Item, Input, Text, Textarea, Button, Card, CardItem } from 'native-base';
import dataProvider from '../../ggn_dataProvider';
import { RNChipView } from 'react-native-chip-view';
class NewRequest extends Component {
	state = {
		title:'',
		description:'',
		errMessage:null,
		show_filter:'true',
		tags:null,
		selected_tags:[],
	}
	async componentDidMount() {
		this.getData();
	}
	getData = async () => {		
		await new Promise((resolve, reject) => {
			dataProvider('GET','/tags')
			.then((response) => {
				var tags_atFirst = response;
				for (var i = 0; i < tags_atFirst.length; i++) {
					tags_atFirst[i]['select'] = false;
				}
				this.setState({tags: tags_atFirst})
				resolve(response);
			})
			.catch(reject);
		})
	}
	select_tags = (tag) =>{
		var checked_chips = this.state.tags;
		console.log(tag);
		console.log(checked_chips);
		if(checked_chips !== []){
			for (var i = 0; i < checked_chips.length; i++) {
				if(checked_chips[i].id == tag){
					if(checked_chips[i]['select'] == false){
						checked_chips[i]['select'] = true;
					}
					else{
						checked_chips[i]['select'] = false;	
					}
				}
			}
			console.log(checked_chips);
			this.setState({tags: checked_chips});	
		}
	}
	btnSend = () => {
		if(this.state.title != '' && this.state.description != '' && this.state.tags != null){
			var checked_chips = this.state.tags;
			var selected_tags = [];
			for (var i = 0; i < checked_chips.length; i++) {
				if(checked_chips[i]['select'] == true){
					selected_tags.push(checked_chips[i]);
				}
			}
			new Promise((resolve, reject) => {
				dataProvider('POST','/requests?',{title:this.state.title, message:this.state.description, tags:JSON.stringify(selected_tags)}
				)
				.then((response) => {
					this.setState({requests: response},function(){Actions.replace('Request')});
					resolve(response);
				})
				.catch(reject);
			});
		}
		else{
			this.setState({errMessage:'لطفا اطلاعات را صحیح وارد کنید'})
		}
	}		
	render_tags = () => {
		var chips;
		if(this.state.show_filter == 'true'){
			if(this.state.tags !== null && this.state.tags.length > 0){
				chips = <Card style={{borderWidth: 0}}>
							<CardItem cardBody style={{borderWidth: 0}}>
								{this.state.tags.map(
									(item,index)=>
										<RNChipView
											key = {'chips_'+item.id}
											title={item.name}
											avatar={false}
											selectable={item.select}
											onPress={() => this.select_tags(item.id)}
										/>
								)}
							</CardItem>
						</Card>; 
				return chips;
			}
		}
	}
	handleTitle = (text) => {
		this.setState({ title: text })
	}
	handleDescription = (text) => {
		this.setState({ description: text })
	}
	handleError = () => {
		var html;
		if(this.state.errMessage != null){	
			html = <Text style={[styles.err]}>{this.state.errMessage}</Text>;
			setTimeout( this.clearMessage, 10000);
		}
		return html;
	}
	clearMessage = () => {
		this.setState({errMessage:null})
	}
	render() {
		return (
			<GgnMain title="درخواست" back={true}>
				{this.handleError()}
				<View style={{wdith:'100%',height:15}}></View>
				<Item style={{marginBottom: '4%',}}>
					<Input style={[styles.input]} placeholder="درخواست" onChangeText = {this.handleTitle}/>
				</Item>
				<Item style={{marginBottom: '4%',}}>
					<Input 
						style={[styles.input]} 
						placeholder="توضیحات" 
						onChangeText = {this.handleDescription}
						multiline={true}
                		numberOfLines={5}
						/>
				</Item>
				<Text style={[styles.input]}> انتخاب فیلتر</Text>
				{this.render_tags()}
				<View style={{width:'100%', height:30}}></View>
				<View style={{marginTop:10}}>
					<Button style={{paddingTop:0 , borderRadius: 7 , marginLeft: 7 }}  onPress={this.processLogin}>
						<Text style={[styles.btnlogin]} onPress={this.btnSend}>
							ارسال
						</Text>
					</Button>
				</View>
			</GgnMain>
		);
	}
}
export default NewRequest;
const styles = StyleSheet.create({
	input: {
		fontFamily: "IRANSans",
		fontSize: 15,
		textAlign: 'right'
	},
	fix_font:{
		justifyContent: 'center',
		fontFamily: "IRANSans",
	},
	btnlogin:{
		fontFamily: "IRANSans",
		fontSize:20,
		padding:0,
		width:"100%",
		textAlign:"center"
	},
	btnfilter:{
		fontFamily: "IRANSans",
		fontSize:15,
		padding:0,
		width:"100%",
		textAlign:"right",
	},
	err:{
		justifyContent: 'center',
		fontFamily: "IRANSans",
		backgroundColor:'red',
		padding: 10,
		borderRadius:3,
		color:'#fff',
	}
});