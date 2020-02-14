import React, { Component } from 'react';
import GgnMain from '../main.js';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, ScrollView, TouchableNativeFeedback } from 'react-native';
import { Container, Content, List, ListItem, View, Thumbnail, Fab, Left, Right, Body, Text, Button, Icon } from 'native-base';
import dataProvider from '../../ggn_dataProvider';
class Beyond extends Component {
	// constructor(props) {
	// 	super(props)
	// }
	state = {
		beyonds:null,
	}
	async componentDidMount() {
		this.getData();
	}
	getData = async () => {		
		await new Promise((resolve, reject) => {
			dataProvider('GET','/beyondthebooks')
			.then((response) => {
				console.log(response);
				this.setState({beyonds: response});
				resolve(response);
			})
			.catch(reject);
		});
	};
	render() {
		if(this.state.beyonds!==null && this.state.beyonds.length > 0){
			return (
				<GgnMain title="فراتر از کتاب" back={true}>
					<List>
						{ this.state.beyonds.map(
							(item,index)=>
								<ListItem thumbnail key={'beyond-'+item.data.summary.id} onPress={() => Actions.singlebeyond({id: item.id})}>
									<Left>
										<Button transparent>
											<Text onPress={() => Actions.singlebeyond({id: item.data.summary.id})}>مشاهده</Text>
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
			return(
				<GgnMain title="فراتر از کتاب" back={true}>
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
export default Beyond;
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