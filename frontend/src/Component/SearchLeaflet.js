import { withLeaflet, MapControl } from "react-leaflet";
import L from "leaflet";
// import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

class SearchLeaflet extends MapControl {
  // createLeafletElement() {
  //   return GeoSearchControl({
  //     provider: new OpenStreetMapProvider(),
  //   });
  // }
}

export default withLeaflet(SearchLeaflet);
