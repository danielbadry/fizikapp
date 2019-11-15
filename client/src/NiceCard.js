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
                        categories: category
                        }
                  }, () => {
                    
                  });
            });
    }

    render() {
        return(
            <React.Fragment>
                {this.state.categories.map(
                    (item, index) =>
                        <div
                            key={index}
                                style={{
                                    border:'1px solid gray',
                                    borderRadius:'50%',
                                    height:'100px',
                                    width:'100px',
                                    textAlign: 'center',
                                    lineHeight: '90px',
                                    fontFamily:'IranSans'
                                }}
                            >
                            <Link 
                                    color="inherit"
                                    style={{
                                        fontFamily: 'IranSans_Ultralight',
                                        fontSize: '13px',
                                        margin:'0',
                                        lineHeight:'2'
                                    }}
                                    component={RouterLink} 
                                    to={`/category/${item.id}`}>{item.name}
                                </Link>
                        </div>
                )}
               
            </React.Fragment>
        )
    }
}

export default NiceCard;