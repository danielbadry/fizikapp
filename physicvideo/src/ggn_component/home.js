import React, { Component } from 'react';
import GgnMain from './main';
import AjaxProvider from '../ggn_AjaxProvider';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Image, ScrollView, TouchableNativeFeedback } from 'react-native';
import { Text, Card, CardItem, View, Body, Content, Left, Right, Thumbnail, Icon, List, ListItem, Button } from 'native-base';
import dataProvider from '../ggn_dataProvider';
class Home extends Component {
	state = {
		requestsData:null,
		productsData:null,
		recentViewsData:null,
		challengesData:null,
		beyondsData:null,
	}
	async componentDidMount() {
		this.getData();
	}
	getData = async () => {		
		await new Promise((resolve, reject) => {
			dataProvider('GET','/requests?tags=[]')
			.then((response) => {
				console.log(response);
				this.setState({requestsData: response});
				resolve(response);
			})
			.catch(reject);
		});
		await new Promise((resolve, reject) => {
			dataProvider('GET','/products')
			.then((response) => {
				this.setState({productsData: response})
				resolve(response);
			})
			.catch(reject);
		});
		await new Promise( (resolve, reject) => {
			dataProvider('GET','/sciencechallenge?tags=[]')
			.then((response) => {
				console.log(response);
				this.setState({challengesData: response});
				resolve(response);
			})
			.catch(reject);
		});
		await new Promise((resolve, reject) => {
			dataProvider('GET','/beyondthebooks')
			.then((response) => {
				console.log(response);
				this.setState({beyondsData: response});
				resolve(response);
			})
			.catch(reject);
		});
		await new Promise((resolve, reject) => {
			dataProvider('GET','/watchedvideos')
			.then((response) => {
				this.setState({recentViewsData: response})
				resolve(response);
			})
			.catch(reject);
		});
	}
	requests_render() {
		var html;
		if(this.state.requestsData !== null && this.state.requestsData.length > 0){
			console.log(this.state.requestsData);
			html =  <Card>
						<CardItem>
							<View style={{ width: "100%" }}>
								<Text style={{ fontSize: 24 }}>درخواست ها</Text>
							</View>
						</CardItem>
						<CardItem cardBody>
							<ScrollView	horizontal={true}>
								{ this.state.requestsData.map(
									(item,index)=>
										<List key={"requests"+item.id}>
											<TouchableNativeFeedback onPress={() => Actions.SingleRequest({id: item.id})}>
												<ListItem>
													<Body>
														<Text style={[styles.fix_font]}>{item.title}</Text>
														<Text note numberOfLines={1} style={[styles.fix_font]}>{item.name}</Text>
													</Body>
												</ListItem>
											</TouchableNativeFeedback>	
										</List>
								)}
							</ScrollView>
						</CardItem>
					</Card>; 
		}
		return html;
	}
	products_render() {
		var html;
		if(this.state.productsData != null && this.state.productsData.length > 0){
			html =  <Card>
					<CardItem cardHeader>
						<View style={{width: "100%"}}>
							<Text style={{ fontSize: 24 }}>تازه های فیزیک اپ</Text>
						</View>
					</CardItem>
					<CardItem cardBody>
						<ScrollView	horizontal={true}>
							{ this.state.productsData.map(
								(item,index)=>
									<List key={"products"+item.data.summary.id}>
										<TouchableNativeFeedback onPress={() => Actions.singleVideo({id: item.data.summary.id})}>
											<Card>
												<CardItem cardBody>
													{
														(item.data.summary.thumbnail === "")?<Image source={require('../images/Thumbnail.png')} style={{height: 180, width: 180, flex: 1}}/>
														:<Image source={{ uri: item.data.summary.thumbnail }} style={{height: 180, width: 180, flex: 1}}/>
													}
												</CardItem>
												<CardItem>
													<Right>
														<Text style={[styles.fix_font]}>{item.data.summary.name}</Text>
													</Right>
												</CardItem>
											</Card>
										</TouchableNativeFeedback>
									</List>
							)}
						</ScrollView>
					</CardItem>
				</Card>;
		}
		return html;
	}
	recentViews_render() {
		var html;
		if(this.state.recentViewsData != null && this.state.recentViewsData.length > 0){
			html =	<Card>
						<CardItem cardHeader>
							<View style={{width: "100%"}}>
								<Text style={{ fontSize: 24 }}>ادامه ویدئو های قبلی</Text>
							</View>
						</CardItem>
						<CardItem cardBody>
							<ScrollView horizontal={true} >
								{ this.state.productsData.map(
									(item,index)=>
										<List key={"recent"+item.data.summary.id}>
											<TouchableNativeFeedback onPress={() => Actions.singleVideo({id: item.data.summary.id})}>
												<Card>
													<CardItem cardBody>
														{
															(item.data.summary.thumbnail === "")?<Image source={require('../images/Thumbnail.png')} style={{height: 180, width: 180, flex: 1}}/>
															:<Image source={{ uri: item.data.summary.thumbnail }} style={{height: 180, width: 180, flex: 1}}/>
															
														}
													</CardItem>
													<CardItem>
														<Right>
															<Text style={[styles.fix_font]}>{item.data.summary.name}</Text>
														</Right>
													</CardItem>
												</Card>
											</TouchableNativeFeedback>
										</List>
								)}
							</ScrollView>
						</CardItem>
					</Card>;
		}
		return html;
	}
	scienceChallenge_render() {
		var html;
		console.log(this.state.challengesData);
		if(this.state.challengesData != null && this.state.challengesData.length > 0){
			html =	<Card>
						<CardItem cardHeader>
							<View style={{width: "100%"}}>
								<Text style={{ fontSize: 24 }}>چالش های علمی</Text>
							</View>
						</CardItem>
						<CardItem cardBody>
							<ScrollView horizontal={true} >
								{ this.state.challengesData.map(
									(item,index)=>
										<List key={"recent"+item.data.summary.id}>
											<TouchableNativeFeedback onPress={() => Actions.singleChallenge({id: item.data.summary.id})}>
												<Card>
													<CardItem cardBody>
														{
															(item.data.summary.thumbnail === "")?<Image source={require('../images/Thumbnail.png')} style={{height: 180, width: 180, flex: 1}}/>
															:<Image source={{ uri: item.data.summary.thumbnail }} style={{height: 180, width: 180, flex: 1}}/>
															
														}
													</CardItem>
													<CardItem>
														<Right>
															<Text style={[styles.fix_font]}>{item.data.summary.name}</Text>
														</Right>
													</CardItem>
												</Card>
											</TouchableNativeFeedback>
										</List>
								)}
							</ScrollView>
						</CardItem>
					</Card>;
		}
		return html;
	}
	beyondthebook_render() {
		var html;
		console.log(this.state.beyondsData);
		if(this.state.beyondsData != null && this.state.beyondsData.length > 0){
			html =	<Card>
						<CardItem cardHeader>
							<View style={{width: "100%"}}>
								<Text style={{ fontSize: 24 }}>فراتر از کتاب</Text>
							</View>
						</CardItem>
						<CardItem cardBody>
							<ScrollView horizontal={true} >
								{ this.state.beyondsData.map(
									(item,index)=>
										<List key={"recent"+item.data.summary.id}>
											<TouchableNativeFeedback onPress={() => Actions.singlebeyond({id: item.data.summary.id})}>
												<Card>
													<CardItem cardBody>
														{
															(item.data.summary.thumbnail === "")?<Image source={require('../images/Thumbnail.png')} style={{height: 180, width: 180, flex: 1}}/>
															:<Image source={{ uri: item.data.summary.thumbnail }} style={{height: 180, width: 180, flex: 1}}/>
															
														}
													</CardItem>
													<CardItem>
														<Right>
															<Text style={[styles.fix_font]}>{item.data.summary.name}</Text>
														</Right>
													</CardItem>
												</Card>
											</TouchableNativeFeedback>
										</List>
								)}
							</ScrollView>
						</CardItem>
					</Card>;
		}
		return html;
	}
	render(){
		return (
			<GgnMain title="صفحه اصلی آموزش">
				{this.products_render()}
				{this.recentViews_render()}
				{this.scienceChallenge_render()}
				{this.beyondthebook_render()}
				{this.requests_render()}
			</GgnMain>
		);
	}
}
export default Home;
const styles = StyleSheet.create({
	fix_font:{
		justifyContent: 'center',
		fontFamily: "IRANSans",
	}
});