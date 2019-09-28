import React from 'react';
import './header-slider.css';
// import './header-slider.js';

class HeaderSlider extends React.Component {
    render() {
        return(
            <React.Fragment>
                <div class="wrapper wrapper--demo">
                    <div class="carousel">
                        <div class="carousel__content">
                        <div class="item">
                            <p class="title">First</p>
                            <img src="http://placehold.it/1800x850/70AD96/FFF" alt="" />
                        </div>
                        <div class="item">
                            <p class="title">Second</p>
                            <img src="http://placehold.it/1800x850/EA4E23/FFF" alt="" />
                        </div>
                        <div class="item">
                            <p class="title">Third</p>
                            <img src="http://placehold.it/1800x850/9BA452/FFF" alt="" />
                        </div>
                        <div class="item">
                            <p class="title">Fourth</p>
                            <img src="http://placehold.it/1800x850/472D38/FFF" alt="" />
                        </div>
                        <div class="item">
                            <p class="title">Fifth</p>
                            <img src="http://placehold.it/1800x850/F77C85/FFF" alt="" />
                        </div>
                        <div class="item">
                            <p class="title">Sixth</p>
                            <p class="title title--sub">Last Item</p>
                            <img src="http://placehold.it/1800x850/00FFAE/FFF" alt="" />
                        </div>
                        </div>

                        <div class="carousel__nav">
                        <a href="#" class="nav nav--left">Previous</a>
                        <a href="#" class="nav nav--right">Next</a>
                        </div>

                    </div>
                    </div>
                    
            </React.Fragment>   
        )
    }
}
export default HeaderSlider;