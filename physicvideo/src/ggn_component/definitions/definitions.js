import React, { Component } from 'react';
import GgnMain from '../main.js';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Content, List, ListItem, View, Left, Right, Body, Text, Button, Icon } from 'native-base';
import dataProvider from '../../ggn_dataProvider';
class Definitions extends Component {
	state = {
		definitionsData: null,
	}
	async componentDidMount(){
		this.getData();
	}
	getData = async () => {
		await new Promise((resolve, reject) => {
			dataProvider('GET','/definitions')
			.then((response) => {
				this.setState({definitionsData: response})
				resolve(response)
			})
			.catch(reject);
		})
	};
	render() {
		if(this.state.definitionsData !== null && this.state.definitionsData.length > 0){
			console.log(this.state.definitionsData);
			return (
				<GgnMain title="تعریفی ها" back={true}>
					<List>
						{ this.state.definitionsData.map(
							(item,index)=>
								<ListItem key={item.data.summary.id}>
									<Left>
										<Button onPress={() => Actions.singleDefinition({ id: item.data.summary.id }) } transparent>
											<Text onPress={() => Actions.singleDefinition({ id: item.data.summary.id }) }>مشاهده</Text>
										</Button>
									</Left>
									<Body>
										<Text onPress={() => Actions.singleDefinition({ id: item.data.summary.id }) } style={[styles.fix_font]}>{item.data.summary.title}</Text>
										<Text note numberOfLines={1} style={[styles.fix_font]}>{item.data.summary.name}</Text>
									</Body>
								</ListItem>
						)}
					</List>
				</GgnMain>
			);
		}
		else{
			return (
				<GgnMain title="تعریفی ها" back={true}>
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
export default Definitions;
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
	}
});