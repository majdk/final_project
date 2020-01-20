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
import jwt_decode from "jwt-decode";
import axios from "axios";
import {getPostsFeed} from "./HomePage";
import Post from "./Post";

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

export const searchMap = params => {
  axios.defaults.withCredentials = true;
  console.log(params)
  return axios
      .get('http://127.0.0.1:5000/user/search_on_map', { params: params})
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

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
      zoom: 13,
      currentPos: [51.505, -0.09],
      radius: '',
      posts_in_radius: [],
      choseLocation: false,
      empty_radius: true,
      error: false,
    };

    this.searchTravels = this.searchTravels.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onRadiusChange = this.onRadiusChange.bind(this);
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.fitBounds(this.state.places);
  }

  searchTravels() {
    if (this.state.radius === "") {
      this.setState({
        empty_radius: true,
        error: true,
      });
      console.log('EMPTY')
      return;
    }
    searchMap({
      km: this.state.radius,
      longitude: this.state.currentPos.lng,
      latitude: this.state.currentPos.lat,
    }).then(res => {
      if (res !== 'error') {
        console.log(res)
        this.setState({
          choseLocation: false,
          posts_in_radius: res
        })
      } else {

      }
    })
  }

  handleClick(e){
    this.setState({
      currentPos: e.latlng,
      choseLocation: true,
    });
    // console.log(this.props)
    // this.props.updateLocation(e.latlng.lat, e.latlng.lng);
  }

  onRadiusChange(e) {
    this.setState({
      radius: e.target.value,
      empty_radius: false,
      error: false,
    })
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
        <ReactLeafletSearch position="topleft" closeResultsOnClick={true} showMarker={false} showPopup={false}/>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*{this.state.places.map(place => (*/}
        {/*  <Marker position={place} />*/}
        {/*))}*/}
        {this.state.posts_in_radius.map((post) =>
            <Marker position={[post.latitude, post.longitude]} key={post.id}>
            <Popup>
              {"\'" + post.title + "\'" + " by " + post.username }
            </Popup>
          </Marker>
        )}
        {this.state.choseLocation &&
        <Marker position={this.state.currentPos} >
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
        }
        <Control position="bottomleft">
          <Button variant="contained" color="primary" onClick={this.searchTravels} disabled={!this.state.choseLocation} >
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
              onChange={this.onRadiusChange}
              error={this.state.error}
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
