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
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {},
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 100
  }
});

class SimpleExample extends React.Component {
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
      zoom: 13
    };
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.fitBounds(this.state.places);
  }

  render() {
    console.log('Rendering map...')
    const { classes } = this.props;
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        ref={m => {
          this.leafletMap = m;
        }}
      >
        <ReactLeafletSearch position="topleft" closeResultsOnClick={true} />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*{this.state.places.map(place => (*/}
        {/*  <Marker position={place} />*/}
        {/*))}*/}
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Control position="bottomleft">
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Control>
        <Control position="bottomleft">
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <OutlinedInput
              type="number"
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">Km</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight"
              }}
              labelWidth={0}
            />
            <FormHelperText id="outlined-weight-helper-text">
              Radius
            </FormHelperText>
          </FormControl>
        </Control>

        {/* <SearchLeaflet/> */}
      </Map>
    );
  }
}

export default withStyles(styles)(SimpleExample);
// ReactDOM.render(<SimpleExample />, document.getElementById('container'))
