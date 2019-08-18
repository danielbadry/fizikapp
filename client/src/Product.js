import React from 'react';
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import Typography from '@material-ui/core/Typography';
import { Player } from 'video-react';
import "../node_modules/video-react/dist/video-react.css"; // import css
import ProductUserInteraction from "./ProductUserInteraction";

class Product extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    />
                <Typography variant="h3" gutterBottom>
                    wath is gravity?
                </Typography>
                <Typography variant="h6" gutterBottom>
                    2019-05-06
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Gravity is the force by which a planet or other body draws objects toward its center. The force of gravity keeps all of the planets in orbit around the sun.
                    What else does gravity do?
                    Why do you land on the ground when you jump up instead of floating off into space? Why do things fall down when you throw them or drop them? The answer is gravity: an invisible force that pulls objects toward each other. Earth's gravity is what keeps you on the ground and what makes things fall.
                </Typography>
                <ProductUserInteraction />
            </React.Fragment>
        );
    }
}
export default Product;