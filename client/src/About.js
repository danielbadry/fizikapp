import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainHeader from "./MainHeader";
import StickyFooter2 from "./StickyFooter2";
import HeaderSlider from "./HeaderSlider";
import SocialShare from "./SocialShare";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class About extends React.Component {
    render() {
        
        return (
            <div>
                <Grid container spacing={0}>

                    <Grid 
                        item
                        lg={12}
                        style={{
                            backgroundImage: `url(https://cdn.kastatic.org/images/impact/background.svg)`,
                            height: '300px'
                        }}
                        >
                        <h2>
                            A growing body of research indicates the impact that Khan Academy’s personalized mastery learning has on driving learning outcomes.
                        </h2>
                    </Grid>
                    
                    <Grid item lg={12}>
                        <Grid container spacing={0}>

                            <Grid item lg={12}>
                                Students who prepare using Official SAT Practice see substantial improvement in their SAT scores.
                            </Grid>

                            <Grid item lg={4}>
                                <img alt="Cartoon of a multiple choice test with a book and pen." src="https://cdn.kastatic.org/images/sat/sat.svg"></img>
                            </Grid>
                            
                            <Grid item lg={8}>
                                <Grid container spacing={0}>
                                    
                                    <Grid item lg={12}>
                                        30 point increase, a 1.5x gain in SAT scores
                                    </Grid>
                                    <Grid item lg={12}>
                                        In 2017, Khan Academy and the College Board, the maker of the SAT, analyzed gains between the PSAT/NMSQT and the SAT for approximately 250,000 students. Results indicated that studying 6-8 hours with Official SAT Practice on Khan Academy is associated with an average increase of 90-points from the PSAT/NMSQT to the SAT, compared to a 60-point increase for students not using it.
                                    </Grid>
                                    <Grid item lg={12}>
                                        Full study 
                                    </Grid>

                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </Grid>

                    <Grid 
                        item
                        lg={12}
                        style={{
                            backgroundImage: `url(https://cdn.kastatic.org/images/impact/featured.png)`,
                            height: '300px',
                            backgroundSize: 'cover'
                        }}
                        >
                    </Grid>

                    <Grid 
                        item
                        lg={12}
                        style={{
                            backgroundColor:'#0c7f99',
                            height:'300px'
                        }}
                        >

                            <Grid container spacing={0}>
                                
                                <Grid item lg={4}>
                                    <img src="https://cdn.kastatic.org/images/impact/laptop.svg" />
                                </Grid>
                                
                                <Grid item lg={8}>
                                “I love that Khan Academy shows you your errors. It really helped me in understanding words in context; it really broke it down for me. With the PSAT/NMSQT score I doubted myself, but my teachers showed me with Khan Academy I could do it. If it wasn’t for Khan Academy, I wouldn’t have access to SAT practice at all. It’s a godsend!”
—TATIANA, A SENIOR AT OAK RIDGE HIGH SCHOOL IN ORLANDO, FLORIDA
                                </Grid>

                            </Grid>

                    </Grid>

                    <Grid item lg={12}>
                        <Grid item lg={12}>
                            Khan Academy is the leading online learning resource used and trusted by US teachers and students.
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item lg={4}>
                                <Grid container spacing={0}>
                                    <Grid item lg={12}>
                                        <Typography
                                            style={{
                                                fontSize: '80px',
                                                fontWeight: 'bold',
                                                color: '#71B307'
                                            }}
                                            >
                                            90%
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid item lg={12}>
                                    <Typography
                                            style={{
                                                fontFamily: 'IranSans_UltraLight'
                                            }}
                                            >
                                            توضیحاتش
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={4}>
                                90%
                            </Grid>
                            <Grid item lg={4}>
                                90%
                            </Grid>
                        </Grid>
                        <Grid item lg={12}>
                            <Typography
                                style={{
                                    fontFamily: 'IranSans_UltraLight'
                                }}
                                >
                                در این قسمت می توان متنی را در رابطه با این قسمت قرار داد
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item lg={12}
                        style={{
                            height:'300px',
                            backgroundImage: `url(https://cdn.kastatic.org/images/impact/bg-cta.svg)`,
                        }}
                        >

                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                                style={{ minHeight: '87vh' }}
                                >
                                <Grid item lg={3}>
                                    <Grid container spacing={0}>

                                        <Grid item lg={12}>
                                            <div
                                                style={{
                                                    color:'white',
                                                    fontFamily:'IranSans'
                                                }}
                                                >آیا هنوز در فیزیک اپ ثبت نام نکرده اید؟</div>
                                            <div
                                                style={{
                                                    color:'white',
                                                    fontFamily:'IranSans'
                                                }}
                                            >آیا هنوز در فیزیک اپ ثبت نام نکرده اید؟</div>
                                        </Grid>

                                        <Grid item lg={12}>
                                            <Button 
                                                variant="outlined"
                                                style={{
                                                    fontFamily:'IranSans'
                                                }}
                                                >
                                                ثبت نام
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                            
                    </Grid>

                </Grid>
            </div>
            
        );
    }
}

export default About;