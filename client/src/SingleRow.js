import React , { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ItemsCarousel from 'react-items-carousel';
import ProductCard from './ProductCard';
import WatchedvideosCard from './WatchedvideosCard';
import BeyondthebookCard from './BeyondthebookCard';
import SciencechallengeCard from './SciencechallengeCard';
import DefinitionCard from './DefinitionCard';
import RequestCard from './RequestCard';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
import './index.css';

export default (props) => {

    const [rows, setRows] = useState([]);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    const [stepsEnabled, setStepsEnabled] = useState(true);
    const [initialStep, setInitialStep] = useState(0);
    
    const [steps, setSteps] = useState([
        {
        element: '.hello',
        intro: 'معرفی اول',
        },
        {
        element: '.world',
        intro: 'معرفی دوم',
        },
    ]);
    const [hintsEnabled, setHintsEnabled] = useState(true);
    const [hints, setHints] = useState([
        {
        element: '.hello',
        hint: 'Hello hint',
        hintPosition: 'middle-right',
        }
    ]);
    const onExit = () => {
        this.setState(() => ({ stepsEnabled: false }));
      };
      
    const toggleSteps = () => {
        this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }));
      };
    
    const addStep = () => {
        const newStep = {
          element: '.alive',
          intro: 'Alive step',
        };
    
        this.setState(prevState => ({ steps: [...prevState.steps, newStep] }));
      };
    
    const toggleHints = () => {
        this.setState(prevState => ({ hintsEnabled: !prevState.hintsEnabled }));
    };
    
     const addHint = () => {
        const newHint = {
          element: '.alive',
          hint: 'Alive hint',
          hintPosition: 'middle-right',
        };
    
        this.setState(prevState => ({ hints: [...prevState.hints, newHint] }));
      }
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
            <Steps
                enabled={true}
                steps={steps}
                initialStep={initialStep}
                // onExit={this.onExit}
                />
                <Hints
                enabled={hintsEnabled}
                hints={hints}
                />

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

                <div style={{ padding: `0 ${chevronWidth}px` }}>
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
                                <SelectCorrectCard modelType={props.model} item={item} key={index} />
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