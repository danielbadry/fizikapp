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
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
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
							<RequestCard style={{marginLeft:"15px"}} modelType={props.model} item={item} key={index} />
						</div>
				)}
			</Slider>
			
			
			
		</React.Fragment>
	)
}