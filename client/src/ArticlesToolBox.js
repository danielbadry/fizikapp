import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Visibility from '@material-ui/icons/Visibility';

class ArticleToolBox extends React.Component {
    
    constructor(props) {
        super (props);
        this.state = {
            likes : 0,
            disLikes : 0,
            views : 0
        }
    }

    like = (e, type) => {
        let arr = this.props.modelid.match.path.split('/');
        let data = {
            type : type,
            model : this.props.model,
            modelId : arr[arr.length - 1]
        }

        fetch(process.env.REACT_APP_API_URL+`likedislikeview`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this.state.token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(result => {
                this.fetchData(this.state.token);
            });
    }

    fetchData = (token) => {
        let arr = this.props.modelid.match.path.split('/');
        fetch(process.env.REACT_APP_API_URL+`likedislikeview?model=${this.props.model}&modelid=${arr[arr.length - 1]}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(result => {
                this.setState(function(state, props) {
                    return {
                        likes: result.data.likes,
                        disLikes: result.data.disLikes,
                        views: result.data.views
                    };
                  }, () => {
                    this.setState(function(state, props) {
                        console.info('do something after set states');
                    });
                  });
            });
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.setState(function(state, props) {
            return {
                token: token
            }}, function() {
                // this.like('e','view');
            });
        this.fetchData(token);
        // increase view of this entity
    }

    render () {
        let isLikeStyle, isDisLikeStyle;
        
        if (this.state.likes.youLike) {
            isLikeStyle = <ThumbUp 
                fontSize="small" 
                style={{
                    color : '#5365c7'
                }}
                />
        } else {
            isLikeStyle = <ThumbUp 
                fontSize="small" 
                />
        }
        
        if (this.state.disLikes.youDisLike) {
            isDisLikeStyle = <ThumbDown 
                fontSize="small" 
                style={{
                    color : '#5365c7'
                }}
                />
        } else {
            isDisLikeStyle = <ThumbDown 
                fontSize="small" 
                />
        }

        return (
            <React.Fragment>
                <div>
                    
                    <IconButton aria-label="delete" onClick={(e) => this.like(e, 'like')}>
                        {isLikeStyle}
                    </IconButton>
                    {this.state.likes.count}
                    /
                    <IconButton aria-label="delete" onClick={(e) => this.like(e, 'dislike')}>
                        {isDisLikeStyle}
                    </IconButton>
                    {this.state.disLikes.count}
                    /
                    <IconButton aria-label="delete">
                        <Visibility 
                            fontSize="small" 
                            style={{
                                color : '#5365c7'
                            }}
                            />
                    </IconButton>
                    {this.state.views.count}
                </div>
            </React.Fragment>
        );
    }

}
export default ArticleToolBox;