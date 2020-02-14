import React, { Component } from 'react';
import GgnMain from '../main.js';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Text , View, List, ListItem, Body, Button, Thumbnail, Icon, Right, Left } from 'native-base';
class Video extends Component {
	btnAction(){
		Actions.singleVideo();	
	}
	render() {
		return (
			<GgnMain title="ویدیو ها" back={true}>
				<List>
					<ListItem thumbnail onPress={this.btnAction}>
						<Left onPress={this.btnAction}>
							<Button onPress={this.btnAction} transparent>
								<Text onPress={this.btnAction}>مشاهده</Text>
							</Button>
						</Left>
						<Body onPress={this.btnAction}>
							<Text style={[styles.fix_font]} onPress={this.btnAction}>فیزیک</Text>
							<Text note numberOfLines={1} style={[styles.fix_font]} onPress={this.btnAction}>فصل پنج ام آیینه ها</Text>
						</Body>
						<Right onPress={this.btnAction}>
							<Thumbnail onPress={this.btnAction} square source={require('../../images/video.jpg')} />
						</Right>
					</ListItem>
					<ListItem thumbnail onPress={this.btnAction}>
						<Left onPress={this.btnAction}>
							<Button onPress={this.btnAction} transparent>
								<Text onPress={this.btnAction}>مشاهده</Text>
							</Button>
						</Left>
						<Body onPress={this.btnAction}>
							<Text style={[styles.fix_font]} onPress={this.btnAction}>فیزیک</Text>
							<Text note numberOfLines={1} style={[styles.fix_font]} onPress={this.btnAction}>فصل پنج ام آیینه ها</Text>
						</Body>
						<Right onPress={this.btnAction}>
							<Thumbnail onPress={this.btnAction} square source={require('../../images/video.jpg')} />
						</Right>
					</ListItem>
					<ListItem thumbnail onPress={this.btnAction}>
						<Left onPress={this.btnAction}>
							<Button onPress={this.btnAction} transparent>
								<Text onPress={this.btnAction}>مشاهده</Text>
							</Button>
						</Left>
						<Body onPress={this.btnAction}>
							<Text style={[styles.fix_font]} onPress={this.btnAction}>فیزیک</Text>
							<Text note numberOfLines={1} style={[styles.fix_font]} onPress={this.btnAction}>فصل پنج ام آیینه ها</Text>
						</Body>
						<Right onPress={this.btnAction}>
							<Thumbnail onPress={this.btnAction} square source={require('../../images/video.jpg')} />
						</Right>
					</ListItem>
					<ListItem thumbnail onPress={this.btnAction}>
						<Left onPress={this.btnAction}>
							<Button onPress={this.btnAction} transparent>
								<Text onPress={this.btnAction}>مشاهده</Text>
							</Button>
						</Left>
						<Body onPress={this.btnAction}>
							<Text style={[styles.fix_font]} onPress={this.btnAction}>فیزیک</Text>
							<Text note numberOfLines={1} style={[styles.fix_font]} onPress={this.btnAction}>فصل پنج ام آیینه ها</Text>
						</Body>
						<Right onPress={this.btnAction}>
							<Thumbnail onPress={this.btnAction} square source={require('../../images/video.jpg')} />
						</Right>
					</ListItem>
					<ListItem thumbnail onPress={this.btnAction}>
						<Left onPress={this.btnAction}>
							<Button onPress={this.btnAction} transparent>
								<Text onPress={this.btnAction}>مشاهده</Text>
							</Button>
						</Left>
						<Body onPress={this.btnAction}>
							<Text style={[styles.fix_font]} onPress={this.btnAction}>فیزیک</Text>
							<Text note numberOfLines={1} style={[styles.fix_font]} onPress={this.btnAction}>فصل پنج ام آیینه ها</Text>
						</Body>
						<Right onPress={this.btnAction}>
							<Thumbnail onPress={this.btnAction} square source={require('../../images/video.jpg')} />
						</Right>
					</ListItem>
					<ListItem thumbnail onPress={this.btnAction}>
						<Left onPress={this.btnAction}>
							<Button onPress={this.btnAction} transparent>
								<Text onPress={this.btnAction}>مشاهده</Text>
							</Button>
						</Left>
						<Body onPress={this.btnAction}>
							<Text style={[styles.fix_font]} onPress={this.btnAction}>فیزیک</Text>
							<Text note numberOfLines={1} style={[styles.fix_font]} onPress={this.btnAction}>فصل پنج ام آیینه ها</Text>
						</Body>
						<Right onPress={this.btnAction}>
							<Thumbnail onPress={this.btnAction} square source={require('../../images/video.jpg')} />
						</Right>
					</ListItem>
					<ListItem thumbnail onPress={this.btnAction}>
						<Left onPress={this.btnAction}>
							<Button onPress={this.btnAction} transparent>
								<Text onPress={this.btnAction}>مشاهده</Text>
							</Button>
						</Left>
						<Body onPress={this.btnAction}>
							<Text style={[styles.fix_font]} onPress={this.btnAction}>فیزیک</Text>
							<Text note numberOfLines={1} style={[styles.fix_font]} onPress={this.btnAction}>فصل پنج ام آیینه ها</Text>
						</Body>
						<Right onPress={this.btnAction}>
							<Thumbnail onPress={this.btnAction} square source={require('../../images/video.jpg')} />
						</Right>
					</ListItem>
					<ListItem thumbnail onPress={this.btnAction}>
						<Left onPress={this.btnAction}>
							<Button onPress={this.btnAction} transparent>
								<Text onPress={this.btnAction}>مشاهده</Text>
							</Button>
						</Left>
						<Body onPress={this.btnAction}>
							<Text style={[styles.fix_font]} onPress={this.btnAction}>فیزیک</Text>
							<Text note numberOfLines={1} style={[styles.fix_font]} onPress={this.btnAction}>فصل پنج ام آیینه ها</Text>
						</Body>
						<Right onPress={this.btnAction}>
							<Thumbnail onPress={this.btnAction} square source={require('../../images/video.jpg')} />
						</Right>
					</ListItem>
					<ListItem thumbnail onPress={this.btnAction}>
						<Left onPress={this.btnAction}>
							<Button onPress={this.btnAction} transparent>
								<Text onPress={this.btnAction}>مشاهده</Text>
							</Button>
						</Left>
						<Body onPress={this.btnAction}>
							<Text style={[styles.fix_font]} onPress={this.btnAction}>فیزیک</Text>
							<Text note numberOfLines={1} style={[styles.fix_font]} onPress={this.btnAction}>فصل پنج ام آیینه ها</Text>
						</Body>
						<Right onPress={this.btnAction}>
							<Thumbnail onPress={this.btnAction} square source={require('../../images/video.jpg')} />
						</Right>
					</ListItem>
				</List>
			</GgnMain>
		);
	}
}
export default Video
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