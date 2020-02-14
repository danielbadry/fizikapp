import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class RelatedProducts extends React.Component{
  constructor(props) {
    super (props);
    this.state = {
      categories: [],
      isRender: false
    }
  }
  
  componentDidMount() {
    const token = window.localStorage.getItem('token');
    fetch(process.env.REACT_APP_API_URL+`categories/allcategories`, {
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
      .then(response => {
          this.setState((state, props) => {
              return ({categories: response});
          }, () => {
              this.setState({isRender:true})
          });
      });
  }

  getMenu = ( parentID ) => {
    let data = this.state.categories;
    console.info('inje', data);
    return data.filter(function(node){ return ( node.parentId === parentID ) ; }).map((node)=>{
        var exists = data.some(function(childNode){  return childNode.parentId === node.id; });
        var subMenu = (exists) ? '<ul>'+ this.getMenu(node.id).join('') + '</ul>' : "";
        return '<li>'+node.name +  subMenu + '</li>' ;
    });
  }

  Subjects (props) {
      var initLevel = 0;
      var endMenu = this.getMenu("0");
      let someHtml = '<ul>'+endMenu.join('')+ '</ul>';
      return(
          <div style={{
            direction:'rtl'
          }} className="Container" dangerouslySetInnerHTML={{__html: someHtml}}></div>
      )
  }

  render() {
    return(
      <React.Fragment>
        {this.Subjects()}
      </React.Fragment>
    )
  }

}

export default RelatedProducts;