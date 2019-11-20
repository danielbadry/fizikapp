import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

class Tree2 extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      categories : [],
      content:[]
    }
  }

  showSubCategoryContent(rowId) {
    let token = localStorage.getItem('token');
    fetch(process.env.REACT_APP_API_URL+`categories?rowId=${rowId}`, {
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
        this.setState((state, props) => {
          return ({content: result});
        });
      });
  }

  componentDidMount() {
    let token = localStorage.getItem('token');

    fetch(process.env.REACT_APP_API_URL+`categories?rowId=${this.props.categoryid}`, {
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
        this.setState((state, props) => {
          return ({categories: result});
        });
      });
    }

  render() {
    return (
      <div>
          {this.state.categories.map(
              (item, index) => 
              <ExpansionPanel key={index}>
                  <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  >
                  <Typography
                    style={{
                      fontFamily:'IranSans',
                      fontSize:'14px'
                    }}
                    >{item.name}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul>
                      {item.allSubCategories.map(
                        (i, ind) =>
                          <li
                            key={ind}
                            onClick={this.showSubCategoryContent(i.id)}
                            >
                            <Typography
                              component="div"
                              style={{
                                fontFamily:'IranSans',
                                fontSize:'14px',
                              }}
                              >
                              {i.name}
                            </Typography>
                          </li>
                      )}
                    </ul>
                  </ExpansionPanelDetails>
              </ExpansionPanel>
          )}

      </div>
    );
  }
  
}
export default Tree2;