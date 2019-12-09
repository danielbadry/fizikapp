import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CheckboxTree from 'react-checkbox-tree';
import Button from '@material-ui/core/Button';
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
import { change } from 'redux-form'

export default class InsertSubject extends React.Component {
    state = {
        checked: ["5ddfac975416c80f8c48a50c"],
        expanded: [],
        nodes:[],
        isRender:false
    };

    list_to_tree = (list)=> {
        var map = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
            list[i].children = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parentId !== "0") {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node.parentId]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }
    
    componentDidMount() {
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
                this.setState({nodes:this.list_to_tree(response)}, () => {
                    console.info('nodes:', this.state.nodes);
                    this.setState({isRender:true});
                });
            });
    }

    render() {
        return (
           <div style={{
               direction: 'rtl'
                }}>
                    <FormDataConsumer>
                    {({ formData, dispatch, ...rest }) => (
                    <CheckboxTree
                    nodes={this.state.nodes}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={ (checked) => {
                        this.setState({ checked }, () => {
                            dispatch(
                                change(REDUX_FORM_NAME, 'subjects', this.state.checked)
                            )
                        });
                    }}
                    onExpand={expanded => this.setState({ expanded })}
                    icons={{
                        check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
                        uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['far', 'square']} />,
                        halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-square" />,
                        expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
                        expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
                        expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
                        collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
                        parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
                        parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />,
                        leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="file" />
                    }}
                    noCascade
                />
                )}
                </FormDataConsumer>
                   
            </div> 
        ) 
    }
}
// class InsertSubject extends React.Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             subjects:[],
//             selectedSubjects:''
//         }
//     }

//     setinto = (nodeId, status) => {
//         console.info(nodeId,':',status);
//         // let selectedSubjects;
//         // selectedSubjects = this.state.selectedSubjects.split(",");
//         // for (let i = 0 ; i < selectedSubjects.length ; i ++) {
//         //     if (selectedSubjects[i] === nodeId) {
//         //         selectedSubjects.splice(i, 1);
//         //     }
//         // }
//     }

//     componentDidMount() {

//         window.setinto = (nodeId, status) => {
//             this.setinto(nodeId, status);
//         }
        
//         // let token = localStorage.getItem('token');
//         fetch(process.env.REACT_APP_API_URL+`/subjects/allsubjects`, {
//             method: 'GET', // *GET, POST, PUT, DELETE, etc.
//             mode: 'cors', // no-cors, cors, *same-origin
//             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//             credentials: 'same-origin', // include, *same-origin, omit
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'authorization': `Bearer ${token}`,
//             },
//             redirect: 'follow', // manual, *follow, error
//             referrer: 'no-referrer', // no-referrer, *client
//             // body: JSON.stringify(data), // body data type must match "Content-Type" header
//             })
//             .then(response => response.json())
//             .then(response => {
//                 this.setState((state, props) => {
//                     return ({subjects: response});
//                 }, () => {
//                     this.setState({isRender:true});
//                 });
            
//             });
//     }

//     getMenu = ( parentID ) => {
//         let data = this.state.subjects;
//         return data.filter(
//                 function(node) {
//                     return ( node.parentId === parentID ) ;
//                 }).map((node)=> {
//             var exists = data.some(function(childNode)  {
//                 return childNode.parentId === node.id; });
//                 var subMenu = (exists) ? '<ul>'+ this.getMenu(node.id).join('') + '</ul>' : "";
//                 return "<li><input type=checkbox onclick=window.setinto('" + node.id + "'," + this.checked + ") />" + node.name + subMenu + "</li>" ;
//             });
//     }

//     Subjects (props) {
//         var initLevel = 0;
//         var endMenu = this.getMenu("0");
//         let someHtml = '<ul>'+endMenu.join('')+ '</ul>';
//         return(
//             <div style={{direction:'rtl'}} className="Container" dangerouslySetInnerHTML={{__html: someHtml}}></div>
//         )
//     }

//     render() {
//         return(
//             <React.Fragment>
//                 {this.Subjects()}
//             </React.Fragment>
//         )
//     }

// }
// export default InsertSubject;