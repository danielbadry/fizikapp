import React, { Component } from 'react';
import GgnMain from '../main.js';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Image, ScrollView, TouchableNativeFeedback } from 'react-native';
import { Container, Content, List, Card, CardItem, ListItem, Thumbnail, View, Fab, Left, Right, Body, Text, Button, Icon } from 'native-base';
import dataProvider from '../../ggn_dataProvider';
import { RNChipView } from 'react-native-chip-view'
class Challenge extends Component {
	state = {
		tags:null,
		show_filter: 'true',
		selected_tags:[],
		challenges:null,
	}
	async componentDidMount() {
		this.getData();
	}
	getData = async () => {		
		await new Promise((resolve, reject) => {
			dataProvider('GET','/tags')
			.then((response) => {
				this.setState({tags: response})
				resolve(response);
			})
			.catch(reject);
		});
		await new Promise((resolve, reject) => {
			dataProvider('GET','/sciencechallenge?tag=[]')
			.then((response) => {
				console.log(response);
				this.setState({challenges: response});
				resolve(response);
			})
			.catch(reject);
		});
	}
	select_tags(tag){
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
			var selected_tags = [];
			for (var i = 0; i < checked_chips.length; i++) {
				if(checked_chips[i]['select'] == true){
					selected_tags.push(checked_chips[i]);
				}
			}
			new Promise((resolve, reject) => {
				dataProvider('GET','/sciencechallenge?tags='+JSON.stringify(selected_tags) )
				.then((response) => {
					this.setState({challenges: response});
					resolve(response);
				})
				.catch(reject);
			});	
		}
	}
	render_tags (){
		var chips;
		if(this.state.show_filter == 'true'){
			if(this.state.tags !== null && this.state.tags.length > 0){
				chips = <Card style={{borderWidth: 0}}>
							<CardItem cardBody style={{borderWidth: 0}}>
								<ScrollView	horizontal={true} style={{borderWidth: 0}}>
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
								</ScrollView>
							</CardItem>
						</Card>; 
				return chips;
			}
		}
	}
	show_filter = () => {
		if(this.state.show_filter == 'false'){
			this.setState({
				show_filter:'true'
			})
		}
		else if(this.state.show_filter == 'true'){
			this.setState({
				show_filter:'false'
			})	
		}
	}
	render() {
		console.log(this.state.challenges);
		if(this.state.challenges!==null && this.state.challenges.length > 0){
			console.log(this.state.challenges);
			return (
				<GgnMain title="چالش های علمی" back={true}>
					{this.render_tags()}
					<List>
						{ this.state.challenges.map(
							(item,index)=>
								<ListItem key={item.data.summary.id} thumbnail>
									<Left>
										<Button onPress={() => Actions.singleChallenge({id: item.data.summary.id})} transparent>
											<Text>مشاهده</Text>
										</Button>
									</Left>
									<Body>
										<Text style={[styles.fix_font]}>{item.data.summary.name}</Text>
										<Text note numberOfLines={1} style={[styles.fix_font]}>{item.data.summary.title}</Text>
									</Body>
									<Right>
										{
											(item.data.summary.thumbnail === "")?<Thumbnail source={require('../../images/Thumbnail.png')}/>
											:<Thumbnail source={{ uri: item.data.summary.thumbnail }}/>
											
										}
									</Right>
								</ListItem>
						)}
					</List>
				</GgnMain>
			);
		}
		else{
			return(
				<GgnMain title="" back={true}>
					<Left>
					</Left>
					<Body>
						<Text style={[styles.fix_font]}>موردی یافت نشد</Text>
					</Body>
				</GgnMain>
			);
		}
	}
}
export default Challenge;
const styles = StyleSheet.create({
	fix_font:{
		textAlign: 'right' ,
		fontFamily: "IRANSans",
	},
	sidebar_list_item:{
		fontFamily: "IRANSans",
		marginBottom:2,
	},
	button_add:{ 
		backgroundColor: '#28B498', 
		position:'absolute', 
		bottom:30, 
		marginLeft:30, 
		fontSize: 20,
		borderRadius:300
	},
	btnfilter:{
		fontFamily: "IRANSans",
		fontSize:15,
		padding:0,
		width:"100%",
		textAlign:"right",
	},
});