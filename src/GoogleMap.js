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
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig)
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
