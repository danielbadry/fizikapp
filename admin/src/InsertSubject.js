import React from 'react';
class InsertSubject extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            subjects:[]
        }
    }

    componentDidMount() {
        // let token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`/subjects/allsubjects`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'authorization': `Bearer ${token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(response => {
                this.setState((state, props) => {
                    return ({subjects: response});
                }, () => {
                    this.setState({isRender:true});
                });
            
            });
    }

    getMenu = ( parentID ) => {
        let data = this.state.subjects;
        console.info('inje', data);
        return data.filter(function(node){ return ( node.parentId === parentID ) ; }).map((node)=>{
            var exists = data.some(function(childNode){  return childNode.parentId === node.id; });
            var subMenu = (exists) ? '<ul>'+ this.getMenu(node.id).join('') + '</ul>' : "";
            return '<li><input type=checkbox />'+node.name +  subMenu + '</li>' ;
        });
    }

    Subjects (props) {
        var initLevel = 0;
        var endMenu = this.getMenu("0");
        let someHtml = '<ul>'+endMenu.join('')+ '</ul>';
        return(
            <div style={{direction:'rtl'}} className="Container" dangerouslySetInnerHTML={{__html: someHtml}}></div>
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
export default InsertSubject;