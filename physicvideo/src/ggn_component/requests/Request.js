import React, { Component } from 'react';
import GgnMain from '../main.js';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, ScrollView, TouchableNativeFeedback } from 'react-native';
import { Container, Content, List, ListItem, Card, CardItem, View, Fab, Left, Right, Body, Text, Button, Icon, Thumbnail } from 'native-base';
import dataProvider from '../../ggn_dataProvider';
import { RNChipView } from 'react-native-chip-view';
class Request extends Component {
	state = {
		show_filter:'true',
		tags:null,
		selected_tags:[],
		requests:null,
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
		});
		await new Promise((resolve, reject) => {
			dataProvider('GET','/requests',{tags:this.state.selected_tags})
			.then((response) => {
				this.setState({requests: response});
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
				dataProvider('GET','/requests?tags='+JSON.stringify(selected_tags) )
				.then((response) => {
					this.setState({requests: response});
					resolve(response);
				})
				.catch(reject);
			});	
		}
	}
	render_tags () {
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
		console.log( this.state.requests);
		if(this.state.requests !== null && this.state.requests.length > 0){
			return (
				<GgnMain title="درخواست ها" fabs={<Button style={[styles.button_add]} onPress={ () => { Actions.NewRequest() } }><Icon style={{color:"#fff"}} name="add" /></Button>} back={true}>
					{this.render_tags()}
					<List>
						{ this.state.requests.map(
							(item,index)=>
								<ListItem avatar key={"request"+item.id}>
									<Left>
										<Button onPress={() => Actions.SingleRequest({ id: item.id })} transparent>
											<Text>مشاهده</Text>
										</Button>
									</Left>
									<Body>
										<Text note>{item.jalaaliCreatedDate}</Text>
									</Body>
									<Right>
										<Text style={[styles.fix_font]}>{item.title}</Text>
									</Right>
								</ListItem>
							)}
					</List>
				</GgnMain>
			);
		}
		else{
			return(
				<GgnMain title="درخواست ها" fabs={<Button style={[styles.button_add]} onPress={ () => { Actions.NewRequest() } }><Icon style={{color:"#fff"}} name="add" /></Button>} back={true}>
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
export default Request;
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