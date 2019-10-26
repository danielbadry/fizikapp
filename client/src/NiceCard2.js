import React from 'react';
import './nice-card2.css';
import Grid from '@material-ui/core/Grid';

class NiceCard2 extends React.Component {
    
    constructor(props) {
        super (props);
    }

    componentDidMount() {

    }

    render() {
        return(
            <React.Fragment>
                <Grid container spacing={0}>
                    {
                        [1,2,3].map(
                            (item, index) => 
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
                            <div class="center">
                                <div class="card green">
                                    <div class="additional">
                                    <div class="user-card">
                                        <div 
                                            class="level center"
                                            style={{
                                                width:'85px',
                                                left:'50%'
                                            }}
                                            >
                                            Level 13
                                        </div>
                                        <div 
                                            class="points center"
                                            style={{
                                                width:'85px',
                                                left:'50%'
                                            }}
                                            >
                                            5,312 Points
                                        </div>
                                        <div
                                            style={{
                                                left: '16%',
                                                top: '28%',
                                                position: 'absolute'
                                            }}
                                            >
                                            <img 
                                                src="https://cdn2.vectorstock.com/i/1000x1000/60/31/girl-graduate-student-in-graduation-cap-and-mantle-vector-18356031.jpg"
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    borderRadius: '50%'
                                                }}
                                                />
                                        </div>
                                    </div>
                                    <div class="more-info">
                                        <h1>Jane Doe</h1>
                                        <div class="coords">
                                        <span>Group Name</span>
                                        <span>Joined January 2019</span>
                                        </div>
                                        <div class="coords">
                                        <span>Position/Role</span>
                                        <span>City, Country</span>
                                        </div>
                                        <div class="stats">
                                        {/* <div>
                                            <div class="title">Awards</div>
                                            <i class="fa fa-trophy"></i>
                                            <div class="value">2</div>
                                        </div> */}
                                        <div>
                                            <div class="title">Matches</div>
                                            <i class="fa fa-gamepad"></i>
                                            <div class="value">27</div>
                                        </div>
                                        <div>
                                            <div class="title">Pals</div>
                                            <i class="fa fa-group"></i>
                                            <div class="value">123</div>
                                        </div>
                                        {/* <div>
                                            <div class="title">Coffee</div>
                                            <i class="fa fa-coffee"></i>
                                            <div class="value infinity">∞</div>
                                        </div> */}
                                        </div>
                                    </div>
                                    </div>
                                    <div class="general">
                                    <h1>Jane Doe</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar.</p>
                                    <span class="more">Mouse over the card for more info</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        )
                    }
                    
                </Grid>
            </React.Fragment>
        )
    }
}

export default NiceCard2;