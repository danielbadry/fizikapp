import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import './gerdali.css';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DoneIcon from '@material-ui/icons/Done';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
class Gerdali extends React.Component {
    
    constructor(props) {
        super (props);
        this.state = {
            categories : []
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL+`categories/`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'authorization': `Bearer ${token}`,
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(category => {
                // console.info('category:', category);
                this.setState(function(state, props) {
                    return {
                        categories: category.data
                        }
                  }, () => {
                    
                  });
            });
    }

    render() {
        return(
            <div>
                {this.state.categories.map(
                    (item, index) => 
                    <Link 
                        style={{
                            fontFamily: 'IranSans_Ultralight',
                            fontSize: '20px',
                            margin:'0',
                            lineHeight:'2',
                            fontWeight: 'bold',
                            color: 'inherit'
                        }}
                        key={'Gerdali_'+index}
                        component={RouterLink} 
                        to={`/category/${item.id}`}>
                        <div
                        style={{
                            position: 'relative',
                            height: '500px',
                            width: '30%',
                            display: 'inline-block'
                        }}
                        >
                            <div id="profile-wrap">
                            <div className={"pulse1"}></div>
                            <div className="pulse2"></div>
                            <div className="profile-overlay"
                                style={{
                                    backgroundImage: `url(${item.thumbnail})`,
                                    backgroundSize: 'cover'
                                }}
                                ></div>
                            <div className="profile-image"></div>
                            <div className="profile-name">
                                <h2>
                                    {item.name}
                                    <br />
                                    <span> 
                                        ویدیوهای آموزشی
                                    </span>
                                </h2>
                            </div>
                            <div className="profile-social">
                                <ul>
                                <li>
                                    <a href={"/category/" + `${item.id}`} data-toggle="tooltip" title={item.name} target="_blank">
                                        <AddShoppingCartIcon 
                                        style = {{
                                            paddingTop: '12px'
                                        }}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href={"/category/" + `${item.id}`} data-toggle="tooltip" title={item.name} target="_blank">
                                        <DoneIcon 
                                        style = {{
                                            paddingTop: '12px'
                                        }}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href={"/category/" + `${item.id}`} data-toggle="tooltip" title={item.name} target="_blank">
                                        <MusicVideoIcon 
                                        style = {{
                                            paddingTop: '12px'
                                        }}
                                        />
                                    </a>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
            
        )
    }
}

export default Gerdali;