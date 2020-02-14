import ggn_config from './ggn_config.js';
const json_params_to_get_params = (params , cocact="&") => {
	var string_ = JSON.stringify(params);
	// string_=string_.replace(/\[/g, "");
	// string_=string_.replace(/\]/g, "");
	string_=string_.replace(/{/g, "");
	string_=string_.replace(/}/g, "");
	string_=string_.replace(/:/g, "=")
	string_=string_.replace(/,/g, "&");
	string_=string_.replace(/"/g, "");
	return string_;
}
export default async (type, url , params , main = true , typeResult = 'simple', typerequest = 'JSON', header = {}) => {
	if(main == true){
		url = ggn_config.url+url;
	}
	console.log(url);
	var request;
	var get_data = json_params_to_get_params(params);
	var mainresult = '';
	//console.log(type);
	if(type === 'GET'){
		console.log(header);
		if(get_data != ""){
			url = url+"?"+get_data;
		}
		mainresult = fetch(url , {
			method: type,
			headers: header
		}).then(res => res.json()).then(
			(result) => {
				if(typeResult === 'simple') {
					return result;
				}
				else if(typeResult === 'JSON') {
					return result;
				}
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				if(typeResult === 'simple') {
					return false;
				}
				else if(typeResult === 'JSON') {
					return JSON.parse("{'false'}");
				}
			}
		);
		console.log(mainresult);
	}
	else if (type == 'UPLOAD'){
		if (typerequest == 'JSON') {
			get_data = JSON.stringify(params);
		}
		//console.log(get_data);
		header["contentType"] = 'multipart/form-data';
		mainresult = fetch(url, {
			method: 'POST',
			headers: header,
			body: get_data,
		}).then(res => res.json()).then(
			(result) => {
				console.log(result);
				if (typeResult === 'simple') {
					return result;
				}
				else if (typeResult === 'JSON') {
					return result;
				}
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				if (typeResult === 'simple') {
					return false;
				}
				else if (typeResult === 'JSON') {
					return JSON.parse("{'false'}");
				}
			}
		);
	}
	else if(type !== 'GET'){
		/********* POST | PUT | PATCH | DELETE *********/
		if(typerequest == 'JSON'){
			get_data = JSON.stringify(params);
		}
		console.log(get_data);
		mainresult = fetch(url, {
			method: type,
			headers: header,
			body: get_data,
		}).then(res => res.json()).then(
			(result) => {
				if(typeResult === 'simple') {
					return result;
				}
				else if(typeResult === 'JSON') {
					return result;
				}
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				if(typeResult === 'simple') {
					return false;
				}
				else if(typeResult === 'JSON') {
					return JSON.parse("{'false'}");
				}
			}
		);
	}
	console.log(mainresult);
	return mainresult;
};