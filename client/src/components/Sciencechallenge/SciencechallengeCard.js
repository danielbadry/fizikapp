import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


//import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
//import ThumbDown from '@material-ui/icons/ThumbDown';
//import Visibility from '@material-ui/icons/Visibility';


class SciencechallengeCard extends React.Component {

constructor(props) {
  super (props);
}

render() {
	const theme = createMuiTheme();
	const classes = {
		card: {
		maxWidth: 345,
		},
		padding_style:{
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1),
		}
	}
	return (
		<React.Fragment>
			<Link component={RouterLink}  to={`sciencechallenge/${this.props.item.id}`} underline="none" >
			<div style={classes.padding_style} >
				<Paper
				style={{
				background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${this.props.item.data.thumbnail})`,
				backgroundSize: "cover",
				height:'142px',
				width: '100%',
				position: 'relative',
				borderRadius:0
				}}
				>
				
					<div style={{
					bottom: '0',
					position: 'absolute',
					backgroundColor:'#0000004d',
					width: '100%',
					// borderRadius: '7px'
					}}>

						<ThumbUp 
						fontSize="small" 
						style={{
						color : 'white',
						marginLeft: '8px',
						marginTop: '2px',
						marginBottom: '0px'
						}}
						/>
						<span style={{
						color: 'white',
						fontFamily: 'verdana',
						fontSize: '12px',
						marginLeft: '2px',
						paddingTop: '5px',
						position: 'absolute'
						}}>{this.props.item.data.summary.likes}</span>  
					</div>

				</Paper>
				
					<Typography style={{
					fontFamily: 'IranSans_Bold',
					color: '#000',
					direction: 'rtl',
					fontSize: "12px",
					maxHeight: "4rem",
					marginTop: "10px",
					marginBottom: "5px"}}>
					{this.props.item.data.summary.name}
					</Typography>

					{/* <Typography style={{
					fontFamily: 'IranSans_UltraLight',
					color: '#606060',
					direction: 'rtl',
					fontSize: '12px'
					}}>
					{this.props.item.data.summary.title}
					</Typography> */}
				
			</div>
			</Link>
		</React.Fragment>
    
		);
	}
}
export default SciencechallengeCard;