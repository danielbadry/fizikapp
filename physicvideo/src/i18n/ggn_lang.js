import ggn_config from '../ggn_config'
const ggn_lang = (lng) => {
	switch (lng) {
		case 'fa':
			return require('./fa');
			break;
		case 'en':
			return require('./en');
			break;
		case 'fr':
			return require('./fr');
			break;
		default:
			return require('./en');
			break;
	};
};
export default ggn_lang(ggn_config.lng).default;