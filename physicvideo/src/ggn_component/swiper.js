import React from 'react';
import { StyleSheet, Text, View, Image , TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-web-swiper';
import Storage from '../Storage.js';
export default class Screen extends React.Component {
	state = {
		'firstOpen': null
	}
	componentDidMount () {
		Storage.getItem("token").then(function(value2){
			if(value2 !== null){
				Actions.Home();
			}
			else { 
				var firstOpen = Storage.getItem("firstOpen").then(function(value) {
					if(value !== null){
						Actions.login();
					}
				});
			}
		});
	}
	render() {
		const goToLogin = () => {
			Storage.setItem("firstOpen", "true");
			Actions.login();
		}
		return (
			<View style={styles.container}>
				<Swiper from={2} controlsProps = {{dotsTouchable: true, prevPos: 'right', nextPos: 'left', nextTitle: '' ,prevTitle: '' }}>
					<View style={[styles.slideContainer,styles.slide3]}>
						<View style = {[styles.topScreen]}>
							<Image  style={[styles.topScreen_image]} source = {require('../images/404.png')} />
						</View>
						<View style = {[styles.bottomScreen]}>
							<Text style = {[styles.title]}>
								فیزیک ویدئو همیشه در دستان تو 
							</Text>
							<Text style = {[styles.description]}> 
								با فیزیک ویدئو یک معلم رو همیشه همراهت داشته باش
							</Text>
							<TouchableNativeFeedback onPress={goToLogin}>
								<View style = {[styles.bottom_description]}> 
									<Text style={[styles.bottom_description_text]} >
										شروع به کار
									</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
					</View>
					<View style={[styles.slideContainer,styles.slide2]}>
						<View style = {[styles.topScreen]}>
							<Image  style={[styles.topScreen_image]} source = {require('../images/402.png')} />
						</View>
						<View style = {[styles.bottomScreen]}>
							<Text style = {[styles.title]}>
								شیوه های متنوع سنجش
							</Text>
							<Text style = {[styles.description]}> 
								در فیزیک ویدئو میتونی سوالات خودت رو از همه بپرسی و جوابت رو دریافت کنی حالا خودت دیگه میدونی که چی لازم داری.
							</Text>
						</View>
					</View>
					<View style = {[styles.slideContainer,styles.slide1]}>
						<View style = {[styles.topScreen]}>
							<Image  style={[styles.topScreen_image]} source = {require('../images/400.png')} />
						</View>
						<View style = {[styles.bottomScreen]}>
							<Text style = {[styles.title]}>
								سبک جدید آموزش
							</Text>
							<Text style = {[styles.description]}> 
								ما یک سبک جدید آموزشی طراحی کردیم در این مسیر ویدئو های آموزشی فیزیک ویدئو به همراه تمیرن ها آزمون ها همه جا همراهته
							</Text>
						</View>
					</View>
				</Swiper>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		fontFamily: "IRANSans",
	},
	slideContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	slide1: {
		backgroundColor: 'rgba(255,255,255,1)',
	},
	slide2: {
		backgroundColor: 'rgba(255,255,255,1)',
	},
	slide3: {
		backgroundColor: 'rgba(255,255,255,1)',
	},
	title: {
		fontFamily: "IRANSans",
		fontWeight: 'bold',
		fontSize: 22,
		textAlign: "center",
	},
	topScreen: {
		position: 'absolute',
		top:'10%',
		zIndex:1,
		height:'50%',
		overflow:'hidden',
	},
	topScreen_image: {
		height: '100%',
		resizeMode: 'contain',
		marginRight:10,
		marginLeft:10,
	},
	bottomScreen: {
		position: 'absolute',
		bottom:38,
		zIndex:2 ,
		width:'100%',
		height: '25%',
		paddingRight:20,
		paddingLeft:20
	},
	description: {
		fontFamily: "IRANSans",
		fontSize: 20,
		textAlign: "center",
	},
	bottom_description: {
		elevation: 4,
		backgroundColor: '#2196F3',
		borderRadius: 7,
		marginTop:20,
		padding:5
	},
	bottom_description_text:{
		fontFamily: "IRANSans", 
		fontWeight:'bold',
		fontSize: 20 , 
		color:'#fff' ,
		textAlign:'center',
	}
});