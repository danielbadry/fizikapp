import React , { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PostCard from "./PostCard";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ItemsCarousel from 'react-items-carousel';
import ProductCard from './ProductCard';
import SciencechallengeCard from './SciencechallengeCard';
import DefinitionCard from './DefinitionCard';
import RequestCard from './RequestCard';

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
            credentials: 'same-origin',
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
        console.info('modelType:', props.modelType);
        switch (props.modelType) {
            case 'products':
                return(<ProductCard item={props} />);
                break;
            case 'sciencechallenge':
                return(<SciencechallengeCard item={props} />);
                break;
            case 'definitions':
                return(<DefinitionCard item={props} />);
                break;
            case 'requests':
                return(<RequestCard item={props} />);
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

            {/* <Grid container spacing={1}> */}
                <div style={{ padding: `0 ${chevronWidth}px` }}>
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex}
                        activeItemIndex={activeItemIndex}
                        numberOfCards={3}
                        gutter={20}
                        leftChevron={<button>{'<'}</button>}
                        rightChevron={<button>{'>'}</button>}
                        outsideChevron
                        chevronWidth={chevronWidth}
                    >

                        {rows.map(
                            (item, index) => 
                            // <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                            <SelectCorrectCard modelType={props.model} />
                            // </Grid>
                        )}
                        
                    </ItemsCarousel>
                </div>
            {/* </Grid> */}

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