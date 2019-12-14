import React from 'react';
// import { div } from '@fortawesome/react-fontawesome'
import CheckboxTree from 'react-checkbox-tree';

class Tree2 extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
                checked: [],
                expanded: [],
                nodes:[],
                isRender:false
            };
        }
    click = (checked) => {
        this.props.parentMethod(checked);
    }

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
        fetch(process.env.REACT_APP_API_URL+`categories`, {
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
                    
                    <CheckboxTree
                    nodes={this.state.nodes}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={ (checked) => {
                        this.setState({ checked }, () => {
                            this.click(checked);
                        });
                    }}
                    onExpand={expanded => this.setState({ expanded })}
                    icons={{
                        check: <div className="rct-icon rct-icon-check" icon="check-square" />,
                        uncheck: <div className="rct-icon rct-icon-uncheck" icon={['far', 'square']} />,
                        halfCheck: <div className="rct-icon rct-icon-half-check" icon="check-square" />,
                        expandClose: <div className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
                        expandOpen: <div className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
                        expandAll: <div className="rct-icon rct-icon-expand-all" icon="plus-square" />,
                        collapseAll: <div className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
                        parentClose: <div className="rct-icon rct-icon-parent-close" icon="folder" />,
                        parentOpen: <div className="rct-icon rct-icon-parent-open" icon="folder-open" />,
                        leaf: <div className="rct-icon rct-icon-leaf-close" icon="file" />
                    }}
                    noCascade
                />
            </div> 
        ) 
    }
}
export default Tree2;