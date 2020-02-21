import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class WatchedVideosList extends React.Component {
	constructor(props) {
		super (props);
		this.state = {
			watchedVideosList : []
		}
	}

	componentDidMount () {
		let token = localStorage.getItem('token');
		fetch(process.env.REACT_APP_API_URL+'watchedvideos/', {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				'authorization': `Bearer ${token}`,
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
			// body: JSON.stringify(data), // body data type must match "Content-Type" header
			})
			.then(response => response.json())
			.then(watchedVideosList => {
			this.setState((state, props) => {
			return {watchedVideosList: watchedVideosList.data};
			});
			});
	}

	render() {
		return (
			<List>
				{this.state.watchedVideosList.map(
					(uw, index) => 
					<Link 
						component={RouterLink} 
						to={`/product/${uw.id}`}
						style={{ fontFamily: 'IranSans_Light' }}
						>
						<div style={{
							display: 'flex',
							height : '100px',
							marginBottom : '1%',
							paddingRight: '1%'
						}}>
							<div style={{
								width:'70%',
								fontFamily : 'IranSans',
								direction : 'rtl'
							}}>
								{uw.name}
							</div>
							<div style={{
								width : '30%',
								position : 'relative'
							}}>
								<div style={{
									background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${uw.thumbnail})`,
									width : '100%',
									height : '90px',
									position : 'absolute',
									left : '0',
									top :'0',
									bottom : '10px'
								}}>
									
								</div>
								<div style={{
									backgroundColor : 'red',
									width: `${uw.percent}%`,
									height : '10%',
									position : 'absolute',
									left : '0',
									bottom : '10%'
								}}>

								</div>
							</div>
						</div>
						</Link>
				)}
			</List>
		)
	};
}
export default WatchedVideosList;