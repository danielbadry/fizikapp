import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, List, Item, Input, ListItem, Left, Body, Thumbnail, Text, Button} from 'native-base';
import dataProvider from '../../ggn_dataProvider';
import Storage from '../../Storage';
class tab4 extends Component {	
	state = {
		Fname: '', Lname: '', Email: '', Mobile: '', data:null
	}
	async componentDidMount () {
		this.getData();

	}
	getData = async () => {
		await new Promise((resolve, reject) => {
			dataProvider('GET','/users/userinfo')
			.then((response) => {
				this.setState({data: response, Fname: response.firstName, Lname: response.lastName, Email: response.email, Mobile: response.mobile})
				resolve(response);
			})
			.catch(reject);
		});
	}
	handleFname = (text) => {
		this.setState({ Fname: text })
		console.log(text);
	}
	handleLname = (text) => {
		this.setState({ Lname: text })
	}
	handleEmail = (text) => {
		this.setState({ Email: text })
	}
	handleMobile = (text) => {
		this.setState({ Mobile: text })
	}
	prcessRegister = async () => {
		console.log(this.state);
		await new Promise((resolve, reject) => {
			dataProvider('PUT','/users/updateuserinfo',{
					firstName:this.state.Fname,
					lastName:this.state.Lname,
					email:this.state.Email,
					mobile:this.state.Mobile
				},
			)
			.then((response) => {
				Storage.setItem("name", response.firstName+" "+response.lastName);
				this.set_onChangeData(response.firstName+" "+response.lastName);
			})
			.catch(reject);
			console.log(message);
		})
	}
	set_onChangeData = (name) => {
		console.log(name);
		this.props.onchangedata(name);
	}
	render() {
		if(this.state.data){
			return (
				<View>
					<Text style={[styles.header_text]}> عمومی </Text>
					<Item style={{marginBottom: '4%',}}>
						<Input style={[styles.input]} placeholder="نام" onChangeText={this.handleFname} value={this.state.Fname} />
					</Item>
					<Item style={{marginBottom: '4%',}}>
						<Input style={[styles.input]} placeholder="نام خانوادگی" onChangeText={this.handleLname} value={this.state.Lname} />
					</Item>
					<Item style={{marginBottom: '4%',}}>
						<Input style={[styles.input]} placeholder="آدرس پست الکترونیکی" onChangeText={this.handleEmail} value={this.state.Email} />
					</Item>
					<Item style={{marginBottom: '4%',}}>
						<Input style={[styles.input]} placeholder="شماره همراه" onChangeText={this.handleMobile} value={this.state.Mobile} />
					</Item>
					<View style={{marginTop:10}}>
						<Button style={{paddingTop:0 , borderRadius: 7 , marginLeft: 7 }} >
							<Text style={[styles.btnlogin]} onPress={ this.prcessRegister } >
								ویرایش
							</Text>
						</Button>
					</View>
				</View>
			);
		}
		else{
			return ( 
				<View></View>
			)
		}
	}
}
export default tab4
const styles = StyleSheet.create({
	fix_font:{
		textAlign: 'right',
		fontFamily: "IRANSans",
	},
	sidebar_list_item:{
		fontFamily: "IRANSans",
		marginBottom:2,
	},	
	btnlogin:{
		fontFamily: "IRANSans",
		fontSize:20,
		padding:0,
		width:"100%",
		textAlign: 'center',
	},
	input: {
		fontFamily: "IRANSans",
		fontSize: 18,
		textAlign: 'right'
	},
	header_text: {
		fontFamily: "IRANSans",
		fontSize: 25,
		textAlign: "center",
		marginTop: 25,
		marginBottom: 10,
	},
});