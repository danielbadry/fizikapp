import React , { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ItemsCarousel from 'react-items-carousel';
import ProductCard from '../Product/ProductCard';
import WatchedvideosCard from './WatchedvideosCard';
import BeyondthebookCard from '../Beyondthebook/BeyondthebookCard';
import SciencechallengeCard from '../Sciencechallenge/SciencechallengeCard';
import DefinitionCard from '../Definition/DefinitionCard';
import RequestCard from '../Request/RequestCard';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';

export default (props) => {

    const [rows, setRows] = useState([]);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`${props.model}?limit=${props.count}`, {
            method: 'GET', 
            mode: 'cors',
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
                    fontSize: '18px',
                    marginBottom: '2%',
                    marginTop: '2%'
                }}
                >
                {props.label}
            </div>

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

                <div style={{ padding:0 }}>
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex}
                        activeItemIndex={activeItemIndex}
                        numberOfCards={4}
                        gutter={10}
                        leftChevron={<IconButton aria-label="delete"><LeftIcon /></IconButton>}
                        rightChevron={<IconButton aria-label="delete"><RightIcon /></IconButton>}
                        outsideChevron
                        chevronWidth={chevronWidth}
                    >

                        {rows.map(
                            (item, index) => 
                                <SelectCorrectCard style={{marginLeft:"15px"}} modelType={props.model} item={item} key={index} />
                        )}
                        
                    </ItemsCarousel>
                </div>

            <Link 
                component={RouterLink} 
                to={props.linkToShowMore}
                style={{ fontFamily: 'IranSans_Light' }}
                >
                {props.footer}
            </Link>
            
        </React.Fragment>
    )
}