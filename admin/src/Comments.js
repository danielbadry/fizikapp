import React from 'react';

class Comments extends React.Component {
    
    constructor (props) {
        super(props);
        
        // console.info(props.record.productsquestions);

        // change flat list into tree list
        // this.state.tree = this.unflatten(props.record.productsquestions);
        console.info(this.props.record.productsquestions);
    }
    
    componentDidMount () {
       
    }
    
    render () {

      var data = [],
          mappedArr = {},
          arrElem,
          mappedElem;

      // First map the nodes of the array to an object -> create a hash table.
      for(var i = 0, len = this.props.record.productsquestions.length; i < len; i++) {
        arrElem = this.props.record.productsquestions[i];
        mappedArr[arrElem.id] = arrElem;
        mappedArr[arrElem.id]['children'] = [];
      }

      for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
          mappedElem = mappedArr[id];
          // If the element is not at the root level, add it to its parent array of children.
          if (mappedElem.parentId) {
            mappedArr[mappedElem['parentId']]['children'].push(mappedElem);
          }
          // If the element is at the root level, add it to first level elements array.
          else {
            data.push(mappedElem);
          }
        }
      }

      const Menu = ({data}) => {
            return (
              <ul>
                {data.map((m,i) => {
                  return (<li key={i}>
                    {m.message}
                    {m.children && <Menu data={m.children} />}
                  </li>);
                })}
              </ul>
            );
          }

        return (
            <Menu data={data} />
        )
    }

}

export default Comments;