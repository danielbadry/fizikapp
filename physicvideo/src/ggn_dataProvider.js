import React, { Component } from 'react';
import AjaxProvider from './ggn_AjaxProvider';
import { Actions } from 'react-native-router-flux';
import Storage from './Storage';
export default async (type = "POST" , url, params = {} , main = true) => {
	const private_token = await Storage.getItem('token') ;
	/*Storage.getItem('token');*/
	console.log(private_token);
	if(private_token !== null && private_token !== ""){
		var new_private_token = private_token.slice(1, -1);
		var headers = {};
		//console.log(new_private_token);
		headers['Authorization'] = "Bearer "+new_private_token;
		const result = await AjaxProvider(type, url, params, main , 'JSON', 'JSON' , headers);
		if( typeof result == "object" ){
			console.log(new_private_token);
			if(result.auth === true || result.auth === 'true' ) {
				// Storage.setItem("token", result.token);
				Storage.setItem('date_check',new Date().getTime());
				console.log(result.data)
				return result.data;
			}
			else{
				Storage.setItem("token", "");
				Storage.setItem("date_check", "");
				Storage.setItem("force_data", "");
				Actions.login();
			}
		}
	}else{
		Actions.login();
	}
};