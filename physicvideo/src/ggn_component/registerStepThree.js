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
		mobile: this.props.mobile,
		password: "",
		email: "",
		grade: "10",
	}
	onGradeChange(value) {
		this.setState({ grade: value })
	}
	handleFname = (text) => {
		this.setState({ firstName: text })
	}
	handleLname = (text) => {
		this.setState({ lastName: text })
	}
	handleGrade = (text) => {
		this.setState({ grade: text })
	}
	handleEmail = (text) => {
		this.setState({ email: text })
	}
	handlePassword = (text) => {
		this.setState({ password: text })
	} 
	prcessRegister = () => {
		if (this.state.firstName !== '' && this.state.lastName !== '' && this.state.email !== '' && this.state.mobile !== '' && this.state.password !== ''){
			const register = AjaxProvider('POST', '/users/', this.state, true, 'JSON' ).then(function(value){
				if(value.status.auth === false){
					value.status.errorMessage.forEach(function(entry) {
						Toast.show({
							text: translate(ggn_lang.auth.error_register,entry.errorMessage),
							position: "top",
							type: "danger"
						})
					});
				}
				else if (value.status.auth === true){
					Toast.show({
						text: translate(ggn_lang.auth.success_register),
						position: "top",
						type: "success"
					})
				}
			});
		}
		else {
			Toast.show({
				text: translate(ggn_lang.auth.error_register,"input fields"),
				position: "top",
				type: "danger"
			})
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
					<Item style={{marginBottom: '4%',}}>
						<TextInput style={[styles.input]} placeholder="نام" onChangeText = {this.handleFname} />
					</Item>
					<Item style={{marginBottom: '4%',}}>
						<TextInput style={[styles.input]} placeholder="نام خانوادگی" onChangeText = {this.handleLname} />
					</Item>
					<Item picker style={{marginBottom: '4%',}}>
						<Picker
							mode="dropdown"
							iosIcon={ <Icon name="arrow-down" /> }
							style={{ width: undefined ,fontFamily: "IRANSans"}}
							placeholder="پایه"
							placeholderStyle={{ color: "#bfc6ea" }}
							placeholderIconColor="#007aff"
							selectedValue={this.state.grade}
							onValueChange={this.onGradeChange.bind(this)}
						>
							<Picker.Item label="پایه ده ام" value="10" />
							<Picker.Item label="پایه یازده ام" value="11" />
							<Picker.Item label="پایه دوازده ام" value="12" />
						</Picker>
					</Item>
					<Item style={{marginBottom: '4%',}}>
						<TextInput style={[styles.input]} placeholder="آدرس پست الکترونیکی" onChangeText = {this.handleEmail} />
					</Item>
					<Item style={{marginBottom: '4%',}}>
						<TextInput style={[styles.input]} placeholder="رمز عبور" secureTextEntry={true} onChangeText = {this.handlePassword} />
					</Item>
					<View style={{ flexDirection:'row', flexWrap:'wrap' , alignContent : 'center', marginTop: 20, marginBottom: 20 }}>
						<Text onPress={ () => Linking.openURL("https://fizik.app/#/terms-conditions") } style={{fontFamily: "IRANSans"}}>
							مطالعه قوانین برنامه
						</Text>
					</View>
					<View style={{marginTop:10}}>
						<Button style={{paddingTop:0 , borderRadius: 7 , marginLeft: 7 }} >
							<Text style={[styles.btnlogin]} onPress={ this.prcessRegister } >
								ثبت نام
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