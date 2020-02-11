import React from 'react';
import Grid from '@material-ui/core/Grid';

//import Paper from '@material-ui/core/Paper';

class AdsPanel extends React.Component{
	render () {
		return(
			<Grid container spacing={3} justify="center">
				<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
					<div 
						style={{
							borderRadius:0,
							fontFamily: 'IranSans',
							border:"0px",
							textAlign:'right',
							padding:'5px'
						}}
						>
						متن یا تبلیغات اینجا
					</div>
				</Grid>
				<Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
					<video 
						id="bgVideo" 
						loop="10"
						controls = {false}
						muted
						preload="true" 
						autoPlay = {true}
						style={{
							// position:'absolute',
							width:'100%',
							height:'100%',
							zIndex:'-1',
						}}
						>
						<source src="/assets/videos/background.mp4" type="video/mp4" /> 
					</video>
				</Grid>
			</Grid>
		);
	}
}
export default AdsPanel;