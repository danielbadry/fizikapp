import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class NiceCard extends React.Component {
    
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
                        categories: category.Categories
                        }
                  }, () => {
                    
                  });
            });
    }

    render() {
        return(
            <div
                style={{
                    marginLeft: '10%',
                    width: '90%',
                }}
                >
                {this.state.categories.map(
                    (item, index) =>
                    <div
                        style={{
                            display: 'inline-block',
                            textAlign: 'center',
                            width: '25%',
                            padding: '1px 15px',
                            margin: '1px 30px'
                        }}
                        >
                        <div
                            key={index}
                                style={{
                                    border:'1px solid gray',
                                    borderRadius:'50%',
                                    height:'200px',
                                    width:'200px',
                                    textAlign: 'center',
                                    lineHeight: '90px',
                                    fontFamily:'IranSans',
                                    backgroundImage: `url(${item.thumbnail})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }}
                            >
                            
                        </div>
                        <Link 
                            color="inherit"
                            style={{
                                fontFamily: 'IranSans_Ultralight',
                                fontSize: '20px',
                                margin:'0',
                                lineHeight:'2',
                                fontWeight: 'bold'
                            }}
                            component={RouterLink} 
                            to={`/category/${item.id}`}>{item.name}
                        </Link>
                        </div>
                )}
               
            </div>
        )
    }
}

export default NiceCard;