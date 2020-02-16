import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Image, TextInput, StyleSheet, Linking } from 'react-native';
import { Root, Container, Button, Icon, Text , Item, Input , ListItem, Picker, CheckBox, Body, Toast } from 'native-base';
import AjaxProvider from '../ggn_AjaxProvider';
import translate from '../i18n/ggn_translate';
import ggn_lang from '../i18n/ggn_lang';
class register extends Component {
	constructor(props) {	
		super(props);
	}
	state = {
		firstName: "",
		lastName: "",
		mobile: "",
		password: "",
		email: "",
		grade: "10",
	}
	handleUsername = (text) => {
		this.setState({ mobile: text })
	} 
	prcessRegister = () => {
		if(this.state.mobile != null){
			Actions.registerStepTwo({ mobile: this.state.mobile });
		}
	}
	prcessLogin = () => {
		Actions.login();
	}
	render() {
		return (
			<Root>
				<Container style={[styles.container]}>
				 	<Image  style={[styles.login_logo]} source = {require('../images/logo.jpg')} />
					<Item style={{ marginBottom: '10%', marginTop: '10%' }}>
						<TextInput style={[styles.input]} keyboardType={'numeric'} placeholder="شماره همراه" onChangeText = {this.handleUsername} />
					</Item>
					<View style={{ flexDirection:'row', flexWrap:'wrap' , alignContent : 'center', marginTop: 20, marginBottom: 20 }}>
						<Text onPress={ () => Linking.openURL("https://fizik.app/#/terms-conditions") } style={{fontFamily: "IRANSans"}}>
							مطالعه قوانین برنامه
						</Text>
					</View>
					<View style={{marginTop:10}}>
						<Button style={{width: '100%', paddingTop:0 , borderRadius: 7 , marginLeft: 7 }} >
							<Text style={[styles.btnlogin]} onPress={ this.prcessRegister } >
								دریافت کد
							</Text>
						</Button>
					</View>
					<View style={{flexDirection: 'row', flexWrap: 'wrap' , alignContent: 'center', marginTop: 20}}>
						<Text style={[styles.text]} onPress={ this.prcessLogin }>
							قبلا ثبت نام کردی؟ از این قسمت وارد شو
						</Text>
					</View>
				</Container>
			</Root>
		)
	}
}
export default register
const styles = StyleSheet.create({
	login_logo: {
		width: '70%',
		resizeMode: 'contain',
		height:150
	},
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingRight:20,
		paddingLeft:20
	},
	input: {
		fontFamily: "IRANSans",
		fontSize: 15,
		textAlign: 'right',
		height:50,
		width:'100%',
	},
	text: {
		fontFamily: "IRANSans",
		fontSize: 15,
		textAlign: 'center',
		alignContent: 'center'
	},
	btnlogin:{
		fontFamily: "IRANSans",
		fontSize:20,
		padding:0,
		width:"100%",
		textAlign:"center"
	},
	CheckBox_text:{
		fontFamily: "IRANSans",
		paddingLeft:20,
	}
})