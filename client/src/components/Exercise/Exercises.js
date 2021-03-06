import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import StickyFooter from "../header/footer/StickyFooter";
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import InsertSubject from './InsertSubject';

class Exercises extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            exercises : [],
            fromYear:1380,
            toYear:1399,
            field:'',
            reference:'',
            subjects:'',
            isRender:true
        }
    }

    someMethod = (checked) => {
        this.setState({subjects: checked});
    }

    componentDidMount() {
        this.fetchExercises();
    }

    fetchExercises = () => {
        let token = localStorage.getItem('token');

        fetch(process.env.REACT_APP_API_URL+`exercises?fromYear=${this.state.fromYear}&toYear=${this.state.toYear}&field=${this.state.field}&reference=${this.state.reference}&subjects=${this.state.subjects}`, {
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
            .then(request => {
                this.setState((state, props) => {
                    return ({exercises: request.data});
                });
            });
    }

    handleFromYear = (e) => {
        this.setState({fromYear:e.target.value});
    }
    
    handleToYear = (e) => {
        this.setState({toYear:e.target.value});
    }
    
    changeField = (e) => {
        this.setState({field:e.target.value});
    }
    
    changeReference = (e) => {
        this.setState({reference:e.target.value});
    }

    searchInExercises = () => {
        this.fetchExercises();
    }

    getMenu = ( parentID ) => {
        let data = this.state.subjects;
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
            <div className="Container" dangerouslySetInnerHTML={{__html: someHtml}}></div>
        )
    }

    render () {
        return (
            <React.Fragment>
                <Grid 
                    container 
                    spacing={1} 
                    alignItems="center"
                    justify="center">

                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Paper>
                        <Grid 
                            container 
                            spacing={1}
                            alignItems="center"
                            justify="center"
                            >
                        
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Typography
                                    style={{
                                        fontFamily:'IranSans',
                                        direction:'rtl'
                                    }}
                                    >
                                    تعداد {this.state.exercises.length} تست پیدا شد
                                </Typography>
                            </Grid>
                            <Divider />
                            {this.state.exercises.map(
                                (item, index) =>
                                <Grid 
                                    key={index}
                                    item 
                                    xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <Link href={`#/exercise/${item.id}`}>
                                    <Card
                                        // component="a"
                                        // href={`/2121211z`}
                                        key={index}
                                        style={{
                                            direction:'rtl'
                                        }}
                                        >
                                        <CardActionArea>
                                            <CardMedia
                                                image={item.data.thumbnail}
                                                title="Contemplative Reptile"
                                                style={{
                                                    height:'120px'
                                                }}
                                                />
                                            <CardContent>
                                            <Typography 
                                                gutterBottom 
                                                variant="h6" 
                                                component="h2"
                                                style={{
                                                    fontFamily:'IranSans',
                                                    fontSize:'14px'
                                                }}
                                                >
                                                {item.data.summary.name}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary" 
                                                component="p"
                                                style={{
                                                    fontFamily:'IranSans'
                                                }}
                                                >
                                                {item.data.summary.title}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary" 
                                                component="p"
                                                style={{
                                                    fontFamily:'IranSans'
                                                }}
                                                >
                                                {item.data.summary.year}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary" 
                                                component="p"
                                                style={{
                                                    fontFamily:'IranSans'
                                                }}
                                                >
                                                {item.data.summary.field}
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        {/* <CardActions>
                                            
                                        </CardActions> */}
                                    </Card>
                                    </Link>
                                </Grid>
                            )}
                        
                            </Grid>
                        </Paper>
                    </Grid> 
                    
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Paper>
                            <Grid 
                                container 
                                spacing={0} 
                                alignItems='center'
                                justify="center"
                                style={{
                                    direction:'rtl'
                                }}
                                >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography
                                        style={{
                                            fontFamily:'IranSans'
                                        }}
                                        >
                                        از سال
                                    </Typography>
                                    
                                    <TextField
                                        id="standard-phone"
                                        margin="normal"
                                        type="number"
                                        value={this.state.fromYear}
                                        onChange={this.handleFromYear}
                                        InputProps={{
                                            style: {
                                            fontFamily: 'IranSans',
                                            fontSize: '14px'
                                            },
                                        }}
                                        InputLabelProps={{
                                            style:{
                                            fontFamily: 'IranSans',
                                            fontSize: '14px'
                                            }
                                        }}
                                        />
                                    <Typography
                                        style={{
                                            fontFamily:'IranSans'
                                        }}
                                        >
                                        تا سال
                                    </Typography>
                                    
                                    <TextField
                                        id="standard-phone"
                                        margin="normal"
                                        type="number"
                                        value={this.state.toYear}
                                        onChange={this.handleToYear}
                                        InputProps={{
                                            style: {
                                            fontFamily: 'IranSans',
                                            fontSize: '14px'
                                            },
                                        }}
                                        InputLabelProps={{
                                            style:{
                                            fontFamily: 'IranSans',
                                            fontSize: '14px'
                                            }
                                        }}
                                        />
                                    
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography
                                        style={{
                                            fontFamily:'IranSans'
                                        }}>
                                        رشته
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormControl component="fieldset">
                                        {/* <FormLabel component="legend">Gender</FormLabel> */}
                                        <RadioGroup 
                                            aria-label="field" 
                                            name="field" 
                                            value={this.state.field} 
                                            onChange={this.changeField} 
                                            >
                                            <FormControlLabel 
                                                value="riazi" 
                                                control={<Radio />} 
                                                label={<Typography 
                                                    style={{
                                                    fontFamily:'IranSans',
                                                    fontSize:'14px'
                                                    }}
                                                    >
                                                    ریاضی
                                                </Typography>} />
                                            <FormControlLabel 
                                                value="tajrobi" 
                                                control={<Radio />} 
                                                label={<Typography 
                                                    style={{
                                                    fontFamily:'IranSans',
                                                    fontSize:'14px'
                                                    }}>
                                                    تجربی
                                                </Typography>} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography
                                        style={{
                                            fontFamily:'IranSans'
                                        }}>
                                        منبع
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormControl component="fieldset">
                                        {/* <FormLabel component="legend">Gender</FormLabel> */}
                                        <RadioGroup 
                                            aria-label="reference" 
                                            name="reference" 
                                            value={this.state.reference} 
                                            onChange={this.changeReference} 
                                            >
                                            <FormControlLabel 
                                                value="in" 
                                                control={<Radio />} 
                                                label={<Typography 
                                                    style={{
                                                    fontFamily:'IranSans',
                                                    fontSize:'14px'
                                                    }}
                                                    >
                                                    داخل
                                                </Typography>} />
                                            <FormControlLabel 
                                                value="out" 
                                                control={<Radio />} 
                                                label={<Typography 
                                                    style={{
                                                    fontFamily:'IranSans',
                                                    fontSize:'14px'
                                                    }}>
                                                    خارج
                                                </Typography>} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography 
                                        style={{
                                        fontFamily:'IranSans',
                                        fontSize:'14px'
                                    }}>
                                        موضوعات
                                    </Typography>
                                </Grid>
                                <Grid>
                                    {
                                        (this.state.isRender)?
                                        <InsertSubject 
                                            parentMethod={this.someMethod}
                                            />:
                                                null
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Button
                                        variant="contained"
                                        onClick={this.searchInExercises}
                                        color="secondary"
                                        style={{
                                            border: 0,
                                            fontFamily:'IranSans',
                                            borderRadius: 3,
                                            color: 'white',
                                            height: 48,
                                            width:250,
                                            padding: '0 30px',
                                        }}
                                        >
                                        جستجو
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid> 
                </Grid>
                <StickyFooter />
            </React.Fragment>
        );
    }
}
export default Exercises;