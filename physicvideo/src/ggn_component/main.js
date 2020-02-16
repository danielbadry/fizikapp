import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet } from 'react-native';
import SideBar from './header/sidebar';
import { Container, Content, Drawer, Text, Header, Body, Left, Right, Icon, Title, Button } from 'native-base';
class main extends Component {
	constructor(props) {
        super(props);
        this.DrawerState = false;
    }
	openDrawer (){ 
		if(this.DrawerState=== false ){
			this.drawer._root.open();
			this.DrawerState = true;
		}else{
			this.drawer._root.close();
			this.DrawerState = false;
		}
	}
	closeDrawer(){
		this.DrawerState = false;
	}
	render() {
		let back_button = <Text></Text>;
		if(this.props.back===true){
			back_button = <Button transparent style={{zIndex:999999999}} onPress= {()=>Actions.pop()}><Icon name='arrow-back' /></Button>;
		}
		return (
			<Container>
				<Header style={[styles.bg_color]}>
					<Left>
						{ back_button }
					</Left>
					<Body style={{alignItems: 'flex-end'}}>
						<Title style={[styles.fix_font]}>{this.props.title}</Title>
					</Body>
					<Button transparent onPress={  () => this.openDrawer() }><Icon name='menu' /></Button>
				</Header>
				<Drawer 
					ref={(ref) => { this.drawer = ref; }} 
					content={<SideBar MainClass={this}/>} 
					onClose={() => this.closeDrawer() } 
					type="displace"
					style={[styles.drawer]}
					side="right"
					>
						<Content padder>
							{this.props.children}
						</Content>
				</Drawer>
				{this.props.fabs}
			</Container>
		);
	}
}
export default main;
const styles = StyleSheet.create({
	container: {
		paddingRight:20,
		paddingLeft:20
	},
	bg_color:{
		backgroundColor: "#28B498"
	},
	drawer:{
		borderWidth: 0
	},
	fix_font:{
		textAlign: 'center', 
		alignItems: 'center', 
		justifyContent: 'center',
		fontFamily: "IRANSans",
	}
});