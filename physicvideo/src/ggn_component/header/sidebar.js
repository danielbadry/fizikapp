import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Image , TextInput, StyleSheet , TouchableNativeFeedback } from 'react-native';
import { Container, Content, Body, ListItem, List, Right, Left, Button, Text, Thumbnail, Icon } from 'native-base';
import Data_Provider from '../../ggn_dataProvider';
import ggn_config from '../../ggn_config.js';
import Storage from '../../Storage';
class sidebar extends Component {
	state = {
		thumbnail: "",
		name: ""
	};
	setStateAsync(state) {
		return new Promise((resolve) => {
		  this.setState(state, resolve)
		});
	}
	async componentDidMount(props,state){
		const thumbnail = await Storage.getItem("thumbnail");
		const name = await Storage.getItem("name");
		if(thumbnail.slice(1, -1) !== ""){
			await this.setStateAsync({thumbnail: thumbnail.slice(1, -1)});
			//console.log(thumbnail.slice(1, -1));
		}
		if(name.slice(1, -1) !== ""){
			await this.setStateAsync({name: name.slice(1, -1)});
		}
	}
	ExitFunction(){
		Storage.removeItem("token");
		Actions.login();
	}
	render() {
		console.log(this.state.name);
		var user_image = "";
		console.log(this.state.thumbnail);
		if(this.state.thumbnail === ""){
			user_image = <Thumbnail source={require('../../images/Thumbnail.png')}/>;
		}else{
			user_image = <Thumbnail source={{ uri: this.state.thumbnail }}/>;
		}
		return (
			<Container style={[styles.container]}>
				<Content>
					<TouchableNativeFeedback onPress={() => Actions.Profile()}>
						<View style={{flexDirection:'row', flexWrap:'wrap' , alignSelf: 'flex-end'}}>
							<Text style={{fontFamily: "IRANSans" , fontSize:20 , paddingTop:10 , paddingRight: 20 }}>
								{this.state.name}
							</Text>
							{user_image}
						</View>
					</TouchableNativeFeedback>
					<List>
						<TouchableNativeFeedback onPress={() => { Actions.Home(); this.props.MainClass.openDrawer(); }}>
							<ListItem>
								<Left></Left>
								<Text style={[styles.sidebar_list_item]}>صفحه اصلی آموزش</Text>
								<Icon name="home" style={{marginLeft:5}} />
							</ListItem>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={() => { Actions.Beyond(); this.props.MainClass.openDrawer(); }}>
							<ListItem >
								<Left></Left>
								<Text style={[styles.sidebar_list_item]}>فراتر از کتاب</Text>
								<Icon name="film" style={{marginLeft:5}} />
							</ListItem>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={() => { Actions.definitions(); this.props.MainClass.openDrawer(); }}>
							<ListItem >
								<Left></Left>
								<Text style={[styles.sidebar_list_item]}>تعریفی ها</Text>
								<Icon name="filing" style={{marginLeft:5}} />
							</ListItem>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={() => { Actions.Request(); this.props.MainClass.openDrawer(); }}>
							<ListItem >
								<Left></Left>
								<Text style={[styles.sidebar_list_item]}>درخواست ها</Text>
								<Icon name="paper" style={{marginLeft:5}} />
							</ListItem>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={() => { Actions.exercises(); this.props.MainClass.openDrawer(); }}>
							<ListItem>
								<Left></Left>
								<Text style={[styles.sidebar_list_item]}>حل تست و تمرین</Text>
								<Icon name="book" style={{marginLeft:5}} />
							</ListItem>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={() => { Actions.Challenge(); this.props.MainClass.openDrawer(); }}>
							<ListItem >
								<Left></Left>
								<Text style={[styles.sidebar_list_item]}>چالش های علمی</Text>
								<Icon name="film" style={{marginLeft:5}} />
							</ListItem>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={() => { Actions.Finance(); this.props.MainClass.openDrawer(); }}>
							<ListItem>
								<Left></Left>
								<Text style={[styles.sidebar_list_item]}>خرید اشتراک</Text>
								<Icon name="basket" style={{marginLeft:5}} />
							</ListItem>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={() => { Actions.Aboutus(); this.props.MainClass.openDrawer(); }}>
							<ListItem>
								<Left>{ /*<Icon name="arrow-back"/>*/ }</Left>
								<Text style={[styles.sidebar_list_item]}>هدف ما</Text>
								<Icon name="people" style={{marginLeft:5}} />
							</ListItem>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={() => { this.ExitFunction(); this.props.MainClass.openDrawer(); }}>
							<ListItem>
								<Left></Left>
								<Text style={[styles.sidebar_list_item]}>خروج</Text>
								<Icon name="exit" style={{marginLeft:5}} />
							</ListItem>
						</TouchableNativeFeedback>
					</List>
				</Content>
			</Container>
		)
	}
}
export default sidebar
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		paddingRight:20,
		paddingLeft:20,
		paddingTop:20,
		fontFamily: "IRANSans",
	},
	sidebar_list_item:{
		fontFamily: "IRANSans",
		marginBottom:2,
	}
})