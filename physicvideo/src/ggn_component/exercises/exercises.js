import React, { Component } from 'react';
import GgnMain from '../main.js';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Content, Header, Picker, Form, List, ListItem, View, Left, Right, Body, Text, Button, Thumbnail, Icon } from 'native-base';
import dataProvider from '../../ggn_dataProvider';
class Exercises extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		show_filter: 'false',
		location_selected: null,
		exercisesData: null,
		fromYear_selected: null,
		toYear_selected: null,
		field_selected: null,
	}
	async componentDidMount(){
		this.getData();
	}
	getData = async () => {
		var parameters = {};
		if(this.state.fromYear_selected !== null){
			if(this.state.fromYear_selected !== "null"){
				parameters['fromYear'] = this.state.fromYear_selected;
			}
			else{
				this.state.fromYear_selected = null;	
			}
		}
		if(this.state.toYear_selected !== null){
			if(this.state.toYear_selected !== "null"){
				parameters['toYear'] = this.state.toYear_selected;
			}
			else{
				this.state.toYear_selected = null;
			}
		}
		if(this.state.field_selected !== null){
			if(this.state.field_selected !== "null"){
				parameters['field'] = this.state.field_selected;
			}
			else{
				this.state.field_selected = null;
			}
		}
		if(this.state.location_selected !== null){
			if(this.state.location_selected !== "null"){
				parameters['reference'] = this.state.location_selected;
			}
			else{
				this.state.location_selected = null;
			}
		}
		console.log(parameters);
		await new Promise((resolve, reject) => {
			dataProvider('GET','/exercises',parameters)
			.then((response) => {
				console.log(response);
				this.setState({exercisesData: response})
				resolve(response)
			})
			.catch(reject);
		})
	}
	onValueChange_fromYear = (value: string) => {
		this.state.fromYear_selected = value;
		this.getData();
	}
	onValueChange_toYear = (value: string) => {
		this.state.toYear_selected = value;
		this.getData();
	}
	onValueChange_location = (value: string) => {
		this.state.location_selected = value;
		this.getData();
	}
	onValueChange_field = (value: string) => {
		this.state.field_selected = value;
		this.getData();
	}
	filter_fromYear = () => {
		var html;
		if(this.state.show_filter == 'true'){
			var html = <Form>
						<Picker
							note
							mode="dropdown"
							style={{ width: 200 }}
							selectedValue={this.state.fromYear_selected}
							onValueChange={this.onValueChange_fromYear.bind(this)}
						>
							<Picker.Item label="از سال"  value="null" />
							<Picker.Item label="1380" value="1380" />
							<Picker.Item label="1381" value="1381" />
							<Picker.Item label="1382" value="1382" />
							<Picker.Item label="1383" value="1383" />
							<Picker.Item label="1384" value="1384" />
							<Picker.Item label="1385" value="1385" />
							<Picker.Item label="1386" value="1386" />
							<Picker.Item label="1387" value="1387" />
							<Picker.Item label="1388" value="1388" />
							<Picker.Item label="1389" value="1389" />
							<Picker.Item label="1390" value="1390" />
							<Picker.Item label="1391" value="1391" />
							<Picker.Item label="1392" value="1392" />
							<Picker.Item label="1393" value="1393" />
							<Picker.Item label="1394" value="1394" />
							<Picker.Item label="1395" value="1395" />
							<Picker.Item label="1396" value="1396" />
							<Picker.Item label="1397" value="1397" />
							<Picker.Item label="1398" value="1398" />
							<Picker.Item label="1399" value="1399" />
							<Picker.Item label="1400" value="1400" />
						</Picker>
					</Form>
		}
		return html;
	}
	filter_toYear = () => {
		var html;
		if(this.state.show_filter == 'true'){
			var html = <Form>
						<Picker
							note
							mode="dropdown"
							style={{ width: 200 }}
							selectedValue={this.state.toYear_selected}
							onValueChange={this.onValueChange_toYear.bind(this)}
						>
							<Picker.Item label="تا سال"  value="null" />
							<Picker.Item label="1380" value="1380" />
							<Picker.Item label="1381" value="1381" />
							<Picker.Item label="1382" value="1382" />
							<Picker.Item label="1383" value="1383" />
							<Picker.Item label="1384" value="1384" />
							<Picker.Item label="1385" value="1385" />
							<Picker.Item label="1386" value="1386" />
							<Picker.Item label="1387" value="1387" />
							<Picker.Item label="1388" value="1388" />
							<Picker.Item label="1389" value="1389" />
							<Picker.Item label="1390" value="1390" />
							<Picker.Item label="1391" value="1391" />
							<Picker.Item label="1392" value="1392" />
							<Picker.Item label="1393" value="1393" />
							<Picker.Item label="1394" value="1394" />
							<Picker.Item label="1395" value="1395" />
							<Picker.Item label="1396" value="1396" />
							<Picker.Item label="1397" value="1397" />
							<Picker.Item label="1398" value="1398" />
							<Picker.Item label="1399" value="1399" />
							<Picker.Item label="1400" value="1400" />
						</Picker>
					</Form>
		}
		return html;
	}
	filter_location = () => {
		if(this.state.show_filter == 'true'){
			var html = <Form>
						<Picker
							note
							mode="dropdown"
							style={{ width: 200 }}
							selectedValue={this.state.location_selected}
							onValueChange={this.onValueChange_location.bind(this)}
						>
							<Picker.Item label="منبع" value="null" />
							<Picker.Item label="داخلی" value="in" />
							<Picker.Item label="خارجی" value="out" />
						</Picker>
					</Form>
		}
		return html;
	}
	filter_field = () => {
		var html;
		if(this.state.show_filter == 'true'){
			var html = <Form>
							<Picker
								note
								mode="dropdown"
								style={{ width: 200 }}
								selectedValue={this.state.field_selected}
								onValueChange={this.onValueChange_field.bind(this)}
							>
								<Picker.Item label="رشته" value="null" />
								<Picker.Item label="ریاضی" value="riazi" />
								<Picker.Item label="تجربی" value="tajrobi" />
							</Picker>
						</Form>
		}
		return html;
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
		if(this.state.exercisesData !== null && this.state.exercisesData.length > 0){
			console.log(this.state.exercisesData);
			return (
				<GgnMain title="حل تست و تمرین" back={true}>
					<List>
					<Button transparent style={{paddingTop:0 , borderRadius: 7 , marginLeft: 7}} onPress={this.show_filter}>
						<Text style={[styles.btnfilter]} >
							<Icon style={{color:"#060"}} name="information-circle"/>
							مشاهده فیلتر
						</Text>
					</Button>
					{ this.filter_fromYear() }
					{ this.filter_toYear() }
					{ this.filter_location() }
					{ this.filter_field() }
					{ this.state.exercisesData.map(
						(item,index)=>
							<ListItem key={item.data.summary.id}>
								<Left>
									<Button onPress={() => Actions.singleExercise({ id: item.data.summary.id })} transparent>
										<Text>مشاهده</Text>
									</Button>
								</Left>
								<Body>
									<Text style={[styles.fix_font]}>{item.data.summary.title}</Text>
									<Text note numberOfLines={1} style={[styles.fix_font]}>{item.data.summary.name}</Text>
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
			return (
				<GgnMain title="" back={true}>
					<List>
						<ListItem>
							<Left>
							</Left>
							<Body>
								<Text style={[styles.fix_font]}>موردی یافت نشد</Text>
							</Body>
						</ListItem>
					</List>
				</GgnMain>
			);
		}
	}
}
export default Exercises;
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
	input: {
		fontFamily: "IRANSans",
		fontSize: 18,
		textAlign: 'right'
	},
	btnfilter:{
		fontFamily: "IRANSans",
		fontSize:15,
		padding:0,
		width:"100%",
		textAlign:"right",
	},
});