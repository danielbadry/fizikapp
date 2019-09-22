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
        console.info('you clicked on like button : ', type);
        
        let data = {
            type : type,
            userId : this.props.userid,
            model : this.props.model,
            modelId : this.props.modelid
        }

        fetch(`http://localhost:1337/likedislikeview`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(result => {
                this.fetchData();
            });
    }

    fetchData = () => {
        fetch(`http://localhost:1337/likedislikeview?model=${this.props.model}&modelid=${this.props.modelid}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(result => {
                this.setState(function(state, props) {
                    return {
                        likes: result.likes,
                        disLikes: result.disLikes,
                        views: result.views
                    };
                  }, () => {
                    this.setState(function(state, props) {
                        console.info('do something after set states');
                    });
                  });
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    render () {
        return (
            <React.Fragment>
                <div>
                    <IconButton aria-label="delete" onClick={(e) => this.like(e, 'like')}>
                        <ThumbUp fontSize="small" />
                    </IconButton>
                    {this.state.likes.count}
                    /
                    <IconButton aria-label="delete" onClick={(e) => this.like(e, 'dislike')}>
                        <ThumbDown fontSize="small" />
                    </IconButton>
                    {this.state.disLikes.count}
                    /
                    <IconButton aria-label="delete">
                        <Visibility fontSize="small" />
                    </IconButton>
                    {this.state.views.count}
                </div>
            </React.Fragment>
        );
    }

}
export default ArticleToolBox;