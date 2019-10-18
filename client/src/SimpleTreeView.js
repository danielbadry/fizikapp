import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const Tree = ({data}) => ( 
    <ul className="hi">
      {data && data.map((item, index) => (
        <li key={index}>
            {(item.type == 'definition')
            ?
                (<Link component={RouterLink} to={`/definition/${item.id}`}>{item.title}</Link>)
                :
                    (<span>{item.title}</span>)
                    }
            {item.childNodes && <Tree data={item.childNodes} />}
        </li>
      ))}
    </ul>
);

class SimpleTreeView extends React.Component {
    
    constructor(props) {
        super (props);
        this.state = {
            treeList : []
        }
    }

    unflatten(arr) {
        var tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;
  
        // First map the nodes of the array to an object -> create a hash table.
        for(var i = 0, len = arr.length; i < len; i++) {
          arrElem = arr[i];
          mappedArr[arrElem.id] = arrElem;
          mappedArr[arrElem.id]['childNodes'] = [];
        }
  
        for (var id in mappedArr) {
          if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            // If the element is not at the root level, add it to its parent array of children.
            if (parseInt(mappedElem.parentid)) {
              mappedArr[mappedElem['parentid']]['childNodes'].push(mappedElem);
            }
            // If the element is at the root level, add it to first level elements array.
            else {
              tree.push(mappedElem);
            }
          }
        }

        return tree;
      }

    componentDidMount () {
        fetch(process.env.REACT_APP_API_URL+`definitions/treeviewbycategory`, {
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
            .then(flatList => {
                this.setState((state, props) => {
                    return {treeList: this.unflatten(flatList)};
                }, function() {
                    
                });
            });
    }

    render () {
        return(
            <Tree data={this.state.treeList} />
        )
    }

}

export default SimpleTreeView;