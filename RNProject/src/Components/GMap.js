import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';
import GModal from './GModal';
import GHTTPWrapper from '../utils/GHTTPWrapper';
import DistanceUtils from '../utils/DistanceUtils';

const {width, height} = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0055;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const colorMapping = ['orange', 'darkorange', 'orangered', 'red'];

export default class GMap extends Component {
    initialRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
    geoOptions = {
        enableHighAccuracy: true, 
        timeout: 20000, 
        maximumAge: 10000
    }
    constructor(props) {
        super(props);
        this.state = {
            position: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            marker: {
                latitude: 0,
                longitude: 0,
            },
            markers: [],
        }
        setInterval(() => {
            GHTTPWrapper.getNearMark(this.state.marker, (markers) => this.setState({markers: markers}));
        }, 5000);
    }

    _updatePosition(position) {
        let lat = parseFloat(position.coords.latitude);
        let long = parseFloat(position.coords.longitude);
        let pos = {
            latitude: lat,
            longitude: long,
            latitudeDelta: this.state.position.latitudeDelta,
            longitudeDelta: this.state.position.longitudeDelta,
        }
        let mark = {
            latitude: lat,
            longitude: long,
        }
        this.setState({position: pos});
        this.setState({marker: mark});
    }

    _onRegionChange(region) {
        this.setState({position: region});
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => this._updatePosition(position), (err) =>console.log(err), this.geoOptions);
        navigator.geolocation.watchPosition((position) => this._updatePosition(position), (err) =>console.log(err), this.geoOptions);
    }

    _openModal(coords) {
        this.refs['modal'].setState({target: coords})
        this.refs['modal'].setState({source: this.state.marker})
        this.refs['modal'].setState({open: true})
    }

    render() {
        return(   
            <View style={styles.mapContainer}>
                <MapView 
                    style={styles.map} 
                    initialRegion={this.initialRegion} 
                    region={this.state.position} 
                    /*customMapStyle={require('../resources/customMapStyle')}*/
                    mapType='standard'
                    cacheEnabled={true}
                    rotateEnabled={false}
                    onRegionChange={(region) => this._onRegionChange(region)}
                    onLongPress={(data) => this._openModal(data.nativeEvent.coordinate)}>
                    <MapView.Marker title='Your Position' coordinate={this.state.marker} pinColor='skyblue'/>
                    {this.state.markers.map(marker => (
                        <MapView.Marker key={marker._id} 
                        coordinate={marker.position} 
                        pinColor={colorMapping[marker.dangerLvl]} 
                        title="Police"
                        description={DistanceUtils.Distance(this.state.marker, marker.position).toString() + " meters"}/>
                    ))}
                </MapView>
                <GModal ref='modal'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
    },
});