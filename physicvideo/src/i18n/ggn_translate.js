const ggn_translate = (obj,verb) => {
	if(obj.hasOwnProperty(verb)){
		return obj[verb];
	}
	return verb;
};
export default ggn_translate