import React from 'react'
import ReactDOM from 'react-dom'
import GoogleApiComponent from './GoogleApiComponent'

export class Map extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.google !== this.props.google) {
      this.loadMap()
    }
  }

  loadMap() {
    if(this.props && this.props.google) {
      const {google} = this.props
      const maps = google.maps

      const node = ReactDOM.findDOMNode(this.mapRef)

      let zoom = 14
      let lat = process.env.REACT_APP_DEFAULT_LAT || 47.499094
      let lng = process.env.REACT_APP_DEFAULT_LON || 19.043867
      const center = new maps.LatLng(lat, lng)
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        mapTypeControl: false
      })
      this.map = new maps.Map(node, mapConfig)

      this.map.setOptions({
        styles: [
        {"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}
        ]
      })
    }
  }

  render() {
    return (
      <div style={{height: '100%'}} ref={(mapRef) => { this.mapRef = mapRef }}>
        Loading map...
      </div>
    )
  }
}

class Wrapper extends React.Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh',
    }
    return (
      <div style={style}>
        <Map google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(Wrapper)
