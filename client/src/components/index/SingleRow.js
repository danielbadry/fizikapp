import React , { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
//import ItemsCarousel from 'react-items-carousel';
import Slider from "react-slick";
import ProductCard from '../Product/ProductCard';
import WatchedvideosCard from './WatchedvideosCard';
import BeyondthebookCard from '../Beyondthebook/BeyondthebookCard';
import SciencechallengeCard from '../Sciencechallenge/SciencechallengeCard';
import DefinitionCard from '../Definition/DefinitionCard';
import RequestCard from '../Request/RequestCard';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import "../../assets/slick/slick.css";
import "../../assets/slick/slick-theme.css";
//import './index.css';
var settings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay : false,
	autoplaySpeed : 3000,
	pauseOnHover : true,
	arrows : false,
	responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 300,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

export default (props) => {

	const [rows, setRows] = useState([]);
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const chevronWidth = 40;
	
	
	useEffect(() => {
		const token = localStorage.getItem('token');
		fetch(process.env.REACT_APP_API_URL+`${props.model}?limit=${props.count}`, {
			method: 'GET', 
			cache: 'no-cache',
			//credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'authorization': `Bearer ${token}`,
			},
			redirect: 'follow',
			referrer: 'no-referrer',
			})
			.then(response => response.json())
			.then(result => {
				setRows(result.data);
			});
		}, []);

	function SelectCorrectCard (props) {
		switch (props.modelType) {
			case 'products':
				return(<ProductCard item={props.item} />);
				break;
			case 'watchedvideos':
				return(<WatchedvideosCard item={props.item} />);
				break;
			case 'sciencechallenge':
				return(<SciencechallengeCard item={props.item} />);
				break;
			case 'beyondthebooks':
				return(<BeyondthebookCard item={props.item} />);
				break;
			case 'definitions':
				return(<DefinitionCard item={props.item} />);
				break;
			case 'requests':
				return(<RequestCard item={props.item} />);
				break;
		}
		return <div>hichi</div>;
	}
	return (
		
		<React.Fragment>
			<div 
				style={{
					display: 'block',
					fontFamily: 'IranSans_Bold',
					float: 'right',
					width: '100%',
					direction: 'rtl',
					marginRight: '0',
					fontSize: '14px',
					marginBottom: '2%',
					marginTop: '2%'
				}}
				>
				{props.label}
			</div>

			<Slider {...settings}>
				{rows.map(
					(item,index) => 
						<div 
							key={index}
						>
							<SelectCorrectCard style={{marginLeft:"15px"}} modelType={props.model} item={item} key={index} />
						</div>
				)}
			</Slider>
			
			{/* <div style={{ padding: `0 ${chevronWidth}px` }}>
				<ItemsCarousel
					requestToChangeActive={setActiveItemIndex}
					activeItemIndex={activeItemIndex}
					numberOfCards={4}
					gutter={20}
					leftChevron={<button>{'<'}</button>}
					rightChevron={<button>{'>'}</button>}
					outsideChevron
					chevronWidth={chevronWidth}
				>
					<div style={{ height: 200, background: '#EEE' }}>First card</div>
					<div style={{ height: 200, background: '#EEE' }}>Second card</div>
					<div style={{ height: 200, background: '#EEE' }}>Third card</div>
					<div style={{ height: 200, background: '#EEE' }}>Fourth card</div>
					<div style={{ height: 200, background: '#EEE' }}>First card</div>
					<div style={{ height: 200, background: '#EEE' }}>Second card</div>
					<div style={{ height: 200, background: '#EEE' }}>Third card</div>
					<div style={{ height: 200, background: '#EEE' }}>Fourth card</div>
				</ItemsCarousel>
			</div> */}

				{/* <div style={{ padding:0}}>
					<Slider 
						dots={ false }
						infinite={ true }
						speed={ 500 }
						slidesToShow= { 4 }
						slidesToScroll={ 1 }
						style={{
							width: "100%"
						}}
					>
					{ /*requestToChangeActive={setActiveItemIndex}
						activeItemIndex={activeItemIndex}
						numberOfCards={4}
						gutter={10}
						leftChevron={<IconButton aria-label="delete"><LeftIcon /></IconButton>}
						rightChevron={<IconButton aria-label="delete"><RightIcon /></IconButton>}
						outsideChevron
						chevronWidth={chevronWidth} */ }
						{/*</React.Fragment>{rows.map(
							(item, index) => 
								<SelectCorrectCard style={{marginLeft:"15px"}} modelType={props.model} item={item} key={index} />
						)}
						
					</Slider>
				</div> */}

			{/* <Link 
				component={RouterLink} 
				to={props.linkToShowMore}
				style={{ fontFamily: 'IranSans_Light' }}
				>
				{props.footer}
			</Link> */}
			
		</React.Fragment>
	)
}