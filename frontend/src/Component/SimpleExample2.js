import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import ReactLeafletSearch from "react-leaflet-search";
import Control from "react-leaflet-control";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({

});

class SimpleExample2 extends React.Component {
    constructor() {
        super();
        this.state = {
            places: [
                [32.9331, 35.0827],
                [33.8938, 35.5018],
                [48.8566, 2.3522],
                [34.052, -118.2437]
            ],
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
            currentPos: [51.505, -0.09]
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log(this.props.latlng)
        this.setState({
            currentPos: {lat: this.props.latlng[0], lng: this.props.latlng[1]}
        })
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.fitBounds(this.state.places);
    }

    handleClick(e){
        this.setState({ currentPos: e.latlng });
        console.log(this.props)
        this.props.updateLocation(e.latlng.lat, e.latlng.lng);
    }

    render() {
        console.log('Rendering map...')
        const { classes } = this.props;
        const position = [this.state.lat, this.state.lng];
        return (
            <Map
                onClick={this.handleClick}
                center={position}
                zoom={this.state.zoom}
                ref={m => {
                    this.leafletMap = m;
                }}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/*{this.state.places.map(place => (*/}
                {/*  <Marker position={place} />*/}
                {/*))}*/}
                <Marker position={this.state.currentPos}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <ReactLeafletSearch position="topleft" closeResultsOnClick={true} showMarker={false}
                                    showPopup={false}/>
                {/* <SearchLeaflet/> */}
            </Map>
        );
    }
}

export default withStyles(styles)(SimpleExample2);
// ReactDOM.render(<SimpleExample />, document.getElementById('container'))
