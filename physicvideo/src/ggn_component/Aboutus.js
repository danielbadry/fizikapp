import React, { Component } from 'react';
import GgnMain from './main';
import { Actions } from 'react-native-router-flux';
import { StyleSheet , Image, View } from 'react-native';
import { Text, Spinner } from 'native-base';
import dataProvider from '../ggn_dataProvider';
class Aboutus extends Component {
	state = {
		data:null,
	}
	async componentDidMount() {
		this.getData();
	}
	getData = async () => {		
		await new Promise((resolve, reject) => {
			dataProvider('GET','/users/aboutuscontent')
			.then((response) => {
				console.log(response);
				this.setState({data: response});
				resolve(response);
			})
			.catch(reject);
		});
	};
	render() {
		if(this.state.data !== null){
			return (
				<GgnMain title="درباره ما" back={true}>
					{
						(this.state.data.logo === "")?<Image source = {require('../images/logo.jpg')} style={{height: 200, width: null, flex: 1 , resizeMode: 'contain'}}/>
						:<Image source = {{ uri: this.state.data.logo }} style={{height: 200, width: null, flex: 1 , resizeMode: 'contain'}}/>
					}
					<Text style={[styles.fix_font]}>
						{this.state.data.text}
					</Text>
					{
						(this.state.data.img === "")?<Image source = {require('../images/logo.jpg')} style={{height: 200, width: null, flex: 1 , resizeMode: 'contain'}}/>
						:<Image source = {{ uri: this.state.data.img }} style={{width: "100%", resizeMode: 'contain' }}/>
					}
				</GgnMain>
			);
		}
		else{
			return(
				<GgnMain title="" back={true}>
					<View style={{marginTop: "30%",}}>
						<Spinner color='blue' style={{display: "flex" ,AlignItems: "center"}} />
					</View>
				</GgnMain>
			);
		}
	}
}
export default Aboutus;
const styles = StyleSheet.create({
	fix_font:{
		justifyContent: 'center',
		fontFamily: "IRANSans",
		marginBottom: 0
	}
});