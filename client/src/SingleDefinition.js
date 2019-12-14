import React from 'react';
import ContentUserInteraction from "./ContentUserInteraction";
import StickyFooter from "./StickyFooter";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ArticlesToolBox from "./ArticlesToolBox";
import Tree2 from "./Tree2";
import SimpleTreeView from "./SimpleTreeView";

class SingleDefinition extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            summary:{},
            cats:[],
            tags: [],
            id: '',
            targetCatId:null,
            targetCatName:null,
            isRender : false,
            thumbnail: '',
            definitionId: props.definitionid,
            startTime: 8,
            userInteractionConfig : [
                {
                    type:'qa',
                    label:' پرسش و پاسخ',
                    model:'definitions'
                },
                {
                    type:'comment',
                    label:'نظرات',
                    model:'definitions'
                }
            ]
        }
    }

    getMenu = ( parentID ) => {
        let data = this.state.cats;
        return data.filter(function(node){ return ( node.parentId === parentID ) ; }).map((node)=>{
            var exists = data.some(function(childNode){  return childNode.parentId === node.id; });
            var subMenu = (exists) ? '<ul>'+ this.getMenu(node.id).join('') + '</ul>' : "";
            return '<li>'+node.name +  subMenu + '</li>' ;
        });
    }
    
    Subjects (initLevel) {
        var endMenu = this.getMenu(initLevel);
        let someHtml = '<ul>'+endMenu.join('')+ '</ul>';
        return(
            <div style={{
                direction:'rtl'
                }} className="Container" dangerouslySetInnerHTML={{__html: someHtml}}>
            </div>
        )
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL+`categories/findparentdirectoryid?rowId=${this.props.match.path.split('/')[2]}`, {
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
            .then(result => {
                var category = result.data[0].p;
                fetch(process.env.REACT_APP_API_URL+`categories/allcategories?rowId=${result.data[0].p.id}`, {
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
                    .then(result => {
                        this.setState((state, props) => {
                            return ({
                                cats: result,
                                targetCatId: category.id,
                                targetCatName: category.name,
                            });
                        }, () => {
                            this.setState({isRender: true})
                        });
                    });
            });

        

        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+`definitions/${this.props.match.path.split('/')[2]}`, {
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
            })
            .then(response => response.json())
            .then(definition => {
                this.setState(function(state, props) {
                    return {
                        summary: JSON.parse(JSON.stringify(definition.summary)),
                        tags: JSON.parse(JSON.stringify(definition.tags)),
                        thumbnail: definition.thumbnail,
                        id: definition.id,
                        startTime : 30,
                    };
                  });
            });
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.summary.id != this.props.match.path.split('/')[2]) {
            const token = localStorage.getItem('token');
            fetch(process.env.REACT_APP_API_URL+`definitions/${this.props.match.path.split('/')[2]}`, {
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
                })
                .then(response => response.json())
                .then(definition => {
                    this.setState(function(state, props) {
                        return {
                            summary: JSON.parse(JSON.stringify(definition.summary)),
                            tags: JSON.parse(JSON.stringify(definition.tags)),
                            thumbnail: definition.thumbnail,
                            id: definition.id,
                            startTime : 30,
                        };
                    });
                });
        }
        window.scroll(0,0);
    }

    render () {
        return (
            <Grid container spacing={0} justify="center"> 

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} 
                        style={{
                            backgroundImage: `url(${this.state.thumbnail})`,
                            backgroundSize: 'cover',
                            height: '300px'
                        }}>
                        
                        <Typography
                            style={{
                                fontFamily: 'IranSans',
                                float: 'right',
                                marginTop: '16%',
                                marginRight: '5%',
                                fontSize: '22px',
                                borderBottom: 'solid'
                            }}
                        >
                            {this.state.summary.name}
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <Paper>
                            <ArticlesToolBox
                                model='definitions'
                                modelid={this.props}
                                token={this.state.token}
                                />
                            </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{
                            overflow:'hidden'
                        }}>
                        <Grid container spacing={1} justify="center" 
                            style={{
                                margin:0
                            }}
                        >
                            <Grid item xs={9} sm={4} md={4} lg={3} xl={3}>
                                <Paper>
                                <div>{this.state.targetCatName}</div>
                                {
                                (this.state.isRender) ? 
                                    this.Subjects(this.state.targetCatId)
                                        : null
                                }
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={11} sm={7} md={7} lg={8} xl={8}>
                                <Paper
                                    style={{
                                        padding: '10px 37px'
                                    }}
                                >
                                    <Typography
                                        style={{
                                            direction: 'rtl',
                                            textAlign: 'justify',
                                            fontFamily:'IranSans',
                                            lineHeight: '2.5rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {this.state.summary.title}
                                    </Typography>
                                    <hr />
                                    <Typography
                                        style={{
                                            direction: 'rtl',
                                            textAlign: 'justify',
                                            fontFamily:'IranSans',
                                            lineHeight: '2.5rem',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {this.state.summary.description}
                                    </Typography>
                                </Paper>

                                {/* <Paper style={{direction:'rtl', textAlign:'right', margin: '10px 0px', padding: '10px 6px'}}>
                                    {
                                        this.state.isRender ? 
                                            this.state.summary.tagsArray.map(
                                                (item, index)=>
                                                    <Chip 
                                                        key={index}
                                                        style={{fontFamily:'IranSans',fontSize:'14px'}} 
                                                        label={item.name} 
                                                        component="a" 
                                                        clickable 
                                                        />
                                                ) : null
                                    }
                                </Paper> */}

                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <ContentUserInteraction
                            config={this.state.userInteractionConfig}
                            modelid={this.props.match.path.split('/')[2]}
                            />
                    </Grid>

            </Grid>
        );
    }
}
export default SingleDefinition;