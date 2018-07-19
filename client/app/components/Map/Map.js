import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            map: null
        }
    }

    mapMoved(){
        console.log('Moved the map: ' + JSON.stringify(this.state.map.getCenter()))
    }

    mapLoaded(map){
        if (this.state.map != null){ return }
        this.setState({map: map})
    }

    render(){
        const markers = this.props.markers || [];

        return (
            <div>
                <GoogleMap
                    center={this.props.center}
                    ref={this.mapLoaded.bind(this)}
                    onDragEnd={this.mapMoved.bind(this)}
                    defaultZoom={this.props.zoom}
                    defaultCenter={this.props.center}>
                    {markers.map((marker, index) => (
                            <Marker {...marker} />
                        )
                    )}
                </GoogleMap>
            </div>
        )
    }
}

export default withGoogleMap(Map);
