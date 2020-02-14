import React, { Component } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Text , View, List, ListItem, Body, Button, Icon, Right, Left } from 'native-base';
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
			dataProvider('GET','/sciencechallenge/showmysciencechallenge')
			.then((response) => {
				this.setState({data: response})
				resolve(response);
			})
			.catch(reject);
		});
	};
	btnAction(){
		alert('ویدیو کلیک شد');
	}
	render() {
		if(this.state.data!==null && this.state.data.length > 0 ){
			return (			
				<List>
					<Text style={[styles.header_text]}> چالش های علمی من </Text>
					{ this.state.data.map(
						(item,index)=>
						<ListItem key={item.data.summary.id} avatar>
							<Left onPress={Actions.singleChallenge({ id: item.data.summary.id })}>
								<Text note>{item.data.summary.jalaaliCreatedDate}</Text>
							</Left>
							<Body onPress={Actions.singleChallenge({ id: item.data.summary.id })}>
								<Text style={[styles.fix_font]}>{item.data.summary.title}</Text>
								<Text note style={[styles.fix_font]}>{item.data.summary.name}</Text>
							</Body>
							<Right onPress={Actions.singleChallenge({ id: item.data.summary.id })}>
								{
									(item.data.summary.thumbnail === "")?<Thumbnail source={require('../../images/Thumbnail.png')}/>
									:<Thumbnail source={{ uri: item.data.summary.thumbnail }}/>
									
								}
							</Right>
						</ListItem>
					)}
				</List>
			);
		}else{
			return (
				<List>
					<Text style={[styles.header_text]}> چالش های علمی من </Text>
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