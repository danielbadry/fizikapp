import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import GgnMain from './main';
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Text, Thumbnail, Container, Content, Header, Tab, Tabs, ScrollableTab, TabHeading, Icon } from 'native-base';
import Storage from '../Storage';
import Tab_messageBox from './tabs/tab_messageBox';
import Tab_favorites from './tabs/tab_favorites';
import Tab_financial from './tabs/tab_financial';
import Tab_general from './tabs/tab_general';
import Tab_myRequests from './tabs/tab_myRequests';
import Tab_challenges from './tabs/tab_challenges';
class profile extends Component {
	state = {
		thumbnail: "",
		name: ""
	}
	async componentDidMount () {
		var thumbnail = await Storage.getItem("thumbnail");
		if(typeof(this.props.akbar) === "string"){
			thumbnail = this.props.akbar;
			this.setState({thumbnail: thumbnail});
		}
		else{
			if(thumbnail.slice(1, -1) !== ""){
				this.setState({thumbnail: thumbnail.slice(1, -1)});
			}		
		}
		const name = await Storage.getItem("name");
		// if(thumbnail.slice(1, -1) !== ""){
		// 	this.setState({thumbnail: thumbnail.slice(1, -1)});
		// }
		if(name.slice(1, -1) !== ""){
			this.setState({name: name.slice(1, -1)});
		}
	}
	changedData = (name) => {
		console.log(name);
		this.setState({name: name});
	}
	render() {
		var user_image = "";
		console.log(this.state);
		if(this.state.thumbnail === ""){
			user_image= <TouchableNativeFeedback onPress={() => Actions.upload()}>
							<Thumbnail large source={require('../images/Thumbnail.png')} onPress={()=>Actions.upload()}/>
						</TouchableNativeFeedback>;
		}else{
			user_image= <TouchableNativeFeedback onPress={() => Actions.upload()}>
							<Thumbnail large source={{ uri: this.state.thumbnail }} onPress={()=>Actions.upload()}/>
						</TouchableNativeFeedback>;				
		}
		return (
			<GgnMain title="پروفایل" back={true}>
				<Content padder>
					<View style={{flexDirection:'row', flexWrap:'wrap' , alignSelf: 'flex-end'}}>
						<Text style={{fontFamily: "IRANSans" , fontSize:20 , paddingTop:10 , paddingRight: 20 }}>{this.state.name}</Text>
						{user_image}
					</View>
				</Content>
				<Tabs tabBarUnderlineStyle={{backgroundColor:"#28B498"}} initialPage={4}>
					<Tab heading={ <TabHeading style={{backgroundColor:"#fff"}} ><Icon style={{color:"#000"}} name="cloudy" /></TabHeading>}>
						<Tab_challenges />
					</Tab>
					<Tab heading={ <TabHeading style={{backgroundColor:"#fff"}} ><Icon style={{color:"#000"}} name="information-circle" /></TabHeading>}>
						<Tab_myRequests />
					</Tab>
					<Tab heading={ <TabHeading style={{backgroundColor:"#fff", borderWidth: 0}} ><Icon style={{color:"#000"}} name="chatbubbles" /></TabHeading>}>
						<Tab_messageBox />
					</Tab>
					<Tab heading={ <TabHeading style={{backgroundColor:"#fff"}} ><Icon style={{color:"#000"}} name="videocam" /></TabHeading>}>
						<Tab_favorites />
					</Tab>
					<Tab heading={ <TabHeading style={{backgroundColor:"#fff"}} ><Icon style={{color:"#000"}} name="contact" /></TabHeading>}>
						<Tab_general onchangedata={this.changedData}/>
					</Tab>
				</Tabs>
			</GgnMain>
		);
	}
}
export default profile
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