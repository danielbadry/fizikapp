import React from 'react';
import Comments from './Comments';
class Comment extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            record : {
                productsquestions : []
            }
        }
    }

    componentDidMount() {
        
        var con = {
            productsquestions : []
        };
        if (this.props.list)
            this.props.list.map(
                (item, index) => {
                    if (item.parentId == this.props.item.id) {
                        con.productsquestions.push(item);
                    }
                }
            )
        
        console.info('con',con.productsquestions);

        this.setState(prevState => {
            let jasper = Object.assign({}, prevState);  // creating copy of state variable jasper
            jasper.record.productsquestions = con.productsquestions;                     // update the name property, assign a new value                 
            return { jasper };                                 // return new object jasper object
          })

        console.info('state:', this.state);
    }
    
    create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    
    render () {
        return (
            this.state.record.productsquestions.map(
                (item, index) => (
                    <Comment 
                        key={this.create_UUID()}
                        record={this.state.record}
                        />
                )
            )
        )
    }

}

export default Comment;