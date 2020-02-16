import React, { Component } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Text , View, List, ListItem, Body, Button, Thumbnail, Icon, Right, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';
import dataProvider from '../../ggn_dataProvider';
class tab2 extends Component {
	state = {
		data:null
	}
	async componentDidMount () {
		this.getData();
	}
	getData = async () => {
		await new Promise((resolve, reject) => {
			dataProvider('GET','/favorites')
			.then((response) => {
				this.setState({data: response})
				resolve(response);
			})
			.catch(reject);
		});
	};
	render() {
		if(this.state.data!==null && this.state.data.length > 0 ){
			console.log(this.state.data);
			return (
				<List>
					<Text style={[styles.header_text]}> مورد علاقه ها </Text>
					{ this.state.data.map(
					(item,index)=>
						<ListItem key={item.id} thumbnail>
							<Left>
								<Button onPress={() => Actions.singleVideo({id: item.id})} transparent>
									<Text>مشاهده</Text>
								</Button>
							</Left>
							<Body>
								<Text style={[styles.fix_font]}>{item.name}</Text>
								<Text note numberOfLines={1} style={[styles.fix_font]}>{item.title}</Text>
							</Body>
							<Right>
								{
									(item.thumbnail === "")?<Thumbnail source={require('../../images/Thumbnail.png')}/>
									:<Thumbnail source={{ uri: item.thumbnail }}/>
									
								}
							</Right>
						</ListItem>
					)}
				</List>
			);
		}else{
			return (
				<List>
					<Text style={[styles.header_text]}> مورد علاقه ها </Text>
					<ListItem thumbnail>
						<Left>
						</Left>
						<Body>
							<Text style={[styles.fix_font]}>موردی یافت نشد</Text>
						</Body>
						<Right>
						</Right>
					</ListItem>
				</List>
			)
		}
	}
}
export default tab2
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
	header_text: {
		fontFamily: "IRANSans",
		fontSize: 25,
		textAlign: "center",
		marginTop: 25,
		marginBottom: 10,
	},
});