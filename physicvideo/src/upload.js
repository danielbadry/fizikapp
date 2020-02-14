/** @format */
import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import GgnMain from './ggn_component/main';
import dataProvider from './ggn_dataProvider';
import Storage from './Storage';
import { Actions } from 'react-native-router-flux';
export default class App extends React.Component {
	constructor(props) {
        super(props);

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }
    state = {
		avatarSource: "",
		myfile:"",
	}
	selectPhotoTapped() {
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true,
			},
		};
		ImagePicker.showImagePicker(options, response => {
			console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled photo picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				let source = {uri: response.uri};
				let myfile = {response: response};

				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };

				this.setState({
					avatarSource: source,
					myfile: myfile
				});
			}
		});
	}
    uuidv4 = () => {
        return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    uploadtohost = async (file) => {
        if(file !== null && file !== ""){
        	if(this.state.myfile!==""){
        		var image = this.state.myfile.response.data;
        		// var image = "ببعی";
        		var name = this.uuidv4();
	            await new Promise((resolve, reject) => {
					dataProvider('UPLOAD', 'https://fizik.app/upload-user-profile-image.php', { name: name, image:image }, false)
	                .then((response) => {
						Storage.setItem("thumbnail", response);
	                })
	                .catch(reject);
	            	var name_new = name+'.jpg';
	                dataProvider('PUT', '/users/updateuserinfo', {thumbnail: name_new})
	                .then((response) => {
       	            	Actions.Profile({akbar:"https://fizik.app/api/files/usersImage/"+name_new});
	                })
	                .catch(reject);
	            })
	        }
        }
    }
	render() {
		return (
			<GgnMain title="آپلود" back={true}>
					<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
						<View
							style={[styles.avatar, styles.avatarContainer]}>
							{
								this.state.avatarSource === "" ? ( <Text>انتخاب عکس پروفایل</Text>)
								:(<Image style={styles.avatar} source={this.state.avatarSource} />)
							}
						</View>
					</TouchableOpacity>
					<View style={{marginTop:10}}>
						<Button style={{paddingTop:0 , borderRadius: 7 , marginLeft: 7 }} >
							<Text style={[styles.btnlogin]} onPress={ () => this.uploadtohost(this.state.avatarSource) } >
									آپلود
							</Text>
						</Button>
					</View>
			</GgnMain>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	avatarContainer: {
		borderColor: '#9B9B9B',
		borderWidth: 1 / PixelRatio.get(),
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		borderRadius: 75,
		width: 150,
		height: 150,
	},
    btnlogin:{
        fontFamily: "IRANSans",
        fontSize:20,
        padding:0,
        width:"100%",
        textAlign: 'center',
        color: '#fff',
    },
});