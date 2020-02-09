import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import GgnMain from './main';
import { Image, View, StyleSheet , TouchableNativeFeedback, Linking } from 'react-native';
import Swiper from 'react-native-web-swiper';
import { Container, Header, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import dataProvider from '../ggn_dataProvider';
class finance extends Component {
	state = {
		data:null
	}
	async componentDidMount () {
		this.getData();
	}
	getData = async () => {
		await new Promise((resolve, reject) => {
			dataProvider('GET','/shoppingplans')
			.then((response) => {
				this.setState({data: response})
				resolve(response);
			})
			.catch(reject);
		});
	};
	render() {
		if(this.state.data!==null && this.state.data.length > 0 ){
			return(
				<GgnMain title="طرح های خرید" back={true}>
					<View style={{flexDirection:'row', flexWrap:'wrap' , alignContent : 'center'}}>
						{ this.state.data.map(
							(item,index)=>
								<TouchableNativeFeedback onPress={() => Linking.openURL(item.purchaseLink)}>
									<View style={[styles.slideContainer,styles.slide1]}>
										{
											(item.thumbnail === "https://fizik.app/api/files/shoppingplansImage/")?<Image source={require('../images/finDefault.png')} style={[styles.topScreen_image]}/>
											:<Image source={{ uri: item.thumbnail }} style={[styles.topScreen_image]}/>
										}
										<Text>{item.type}</Text>
										<Text>قیمت {item.firstPrise}</Text>
										<Text>قیمت با تخفیف {item.secondPrise}</Text>
									</View>
								</TouchableNativeFeedback>
						)}
					</View>
				</GgnMain>
			);
		}
		else{
			return (
				<GgnMain title="طرح های خرید">
					<View>
						<Text>موردی یافت نشد</Text>
					</View>
				</GgnMain>
			);
		}
	}
}
export default finance
const styles = StyleSheet.create({
	slideContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	slide1: {
		backgroundColor: 'rgba(255,255,255,1)',
		width:"50%"
	},
	topScreen_image: {
		width: '80%',
		resizeMode: 'contain',
	},
})
