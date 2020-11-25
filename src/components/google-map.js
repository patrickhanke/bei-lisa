import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';



const AnyReactComponent = ({ text }) => <div>{text}</div>;

const createMapOptions = (maps) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    }
  }

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 47.97809341724494, 
      lng: 7.802252636899373
    },
    zoom: 20
  };
  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
         options={createMapOptions}
          bootstrapURLKeys={{ key: "AIzaSyBFXhMQXo61sZuf7h_bq2XZoLb5tQ3Xdhc" }}
          language='de'
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            css={{width: "100px", height: "100px"}}
            lat={47.97809341724494}
            lng={7.802252636899373}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
 
 