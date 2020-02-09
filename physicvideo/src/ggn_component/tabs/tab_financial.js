import React, { Component } from 'react';
import { Text , View, List, ListItem, Body, Button, Icon, Right, Left } from 'native-base';
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';

class tab3 extends Component {
	render() {
		return (
			<List>
			<Text style={[styles.header_text]}> بخش مالی </Text>
				<ListItem thumbnail>
					<Left>
						<Text></Text>
						<Text note>1398/6/10</Text>
					</Left>
					<Body>
						<Text style={[styles.fix_font]}>بسته نقره ای</Text>
						<Text note style={[styles.fix_font]}>22500 تومان</Text>
					</Body>
				</ListItem>
				<ListItem avatar>
					<Left>
						<Text></Text>
						<Text note>1398/2/30</Text>
					</Left>
					<Body>
						<Text style={[styles.fix_font]}>بسته طلایی</Text>
						<Text note style={[styles.fix_font]}>35000 تومان</Text>
					</Body>
				</ListItem>
				<ListItem avatar>
					<Left>
						<Text></Text>
						<Text note>1398/5/28</Text>
					</Left>
					<Body>
						<Text style={[styles.fix_font]}>بسته برنزی</Text>
						<Text note style={[styles.fix_font]}>15000 تومان</Text>
					</Body>
				</ListItem>
				<ListItem avatar>
					<Left>
						<Text></Text>
						<Text note>1398/6/10</Text>
					</Left>
					<Body>
						<Text style={[styles.fix_font]}>بسته نقره ای</Text>
						<Text note style={[styles.fix_font]}>22500 تومان</Text>
					</Body>
				</ListItem>
				<ListItem avatar>
					<Left>
						<Text></Text>
						<Text note>1398/2/30</Text>
					</Left>
					<Body>
						<Text style={[styles.fix_font]}>بسته طلایی</Text>
						<Text note style={[styles.fix_font]}>35000 تومان</Text>
					</Body>
				</ListItem>
				<ListItem avatar>
					<Left>
						<Text></Text>
						<Text note>1398/5/28</Text>
					</Left>
					<Body>
						<Text style={[styles.fix_font]}>بسته برنزی</Text>
						<Text note style={[styles.fix_font]}>15000 تومان</Text>
					</Body>
				</ListItem>
				<ListItem avatar>
					<Left>
						<Text></Text>
						<Text note>1398/6/10</Text>
					</Left>
					<Body>
						<Text style={[styles.fix_font]}>بسته نقره ای</Text>
						<Text note style={[styles.fix_font]}>22500 تومان</Text>
					</Body>
				</ListItem>
			</List>
		);
	}
}
export default tab3
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