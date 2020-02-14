import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Image , TextInput, StyleSheet, Linking } from 'react-native';
import { Root, Container, Button, Text , Item, Input , ListItem, CheckBox, Body, Toast} from 'native-base';
import AjaxProvider from '../ggn_AjaxProvider';
import translate from '../i18n/ggn_translate';
import ggn_lang from '../i18n/ggn_lang';
import Storage from '../Storage';
class Login_pas extends Component {
	state = {
		mobile: '',
		password: '',
		token: null,
	}
	handleEmail = (text) => {
		this.setState({ mobile: text })
	}
	handlePassword = (text) => {
		this.setState({ password: text })
	} 
	processLogin = () => {
		if (this.state.password !== '' && this.state.username !== ''){
			const dologin = AjaxProvider('POST', '/users/authenticate', this.state, true, 'JSON').then(function(value){
				console.log(value);
				if(value.auth === true){
					Storage.setItem("token", value.token);
					Storage.setItem("thumbnail", value.userinfo.thumbnail);
					Storage.setItem("name", value.userinfo.firstName+" "+value.userinfo.lastName);
					Storage.getItem("token").then(function(value2) {
						console.log(value2.slice(1, -1));
					});
					Toast.show({
						text: translate(ggn_lang.auth.success_login),
						position: "top",
						type: "success"
					})
					Actions.Home();
				}
				else if(value.auth === false){
					Toast.show({
						text: translate(ggn_lang.auth.error_login,value.errorMessage),
						position: "top",
						type: "danger"
					})
				}
			});
		}
		else{
			Toast.show({
				text: "لطفا مشخصات خود را وارد کنید.",
				position: "top",
				type: "danger"
			})
		}
	}
	prcessRegister = () => {
		Actions.register();
	}
	render() {
		return (
			<Root>
				<Container style={[styles.container]}>
				 	<Image  style={[styles.login_logo]} source = {require('../images/logo.jpg')} />
					<Item style={{marginBottom: '4%',}}>
						<TextInput style={[styles.input]} keyboardType={'numeric'} placeholder="شماره تلفن" onChangeText = {this.handleEmail} />
					</Item>
					<Item style={{marginBottom: '4%',}}>
						<TextInput style={[styles.input]} placeholder="کلمه عبور" secureTextEntry={true} onChangeText = {this.handlePassword}/>
					</Item>
					<View style={{marginTop:10}}>
						<Button style={{paddingTop:0 , borderRadius: 7 , marginLeft: 7 }}  onPress={this.processLogin}>
							<Text style={[styles.btnlogin]} >
								ورود
							</Text>
						</Button>
					</View>
					<View style={{flexDirection:'row', flexWrap:'wrap' , alignContent: 'center', marginTop:20}}>
						<Text style={[styles.text]} onPress={ this.prcessRegister }>
							ثبت نام نکردید؟ از این قسمت ثبت نام کنید
						</Text>
					</View>
				</Container>
			</Root>
		)
	}
}
export default Login_pas
const styles = StyleSheet.create({
	login_logo: {
		width: '70%',
		resizeMode: 'contain',
		height:200
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
		alignContent: 'center',
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