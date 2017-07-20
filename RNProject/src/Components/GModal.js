import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider,
    Button
} from 'react-native';
import Modal from 'react-native-simple-modal';
import DistanceUtils from '../utils/DistanceUtils';
import GHTTPWrapper from '../utils/GHTTPWrapper';

const dangerMapping = [{
    text: 'fairly dangerous',
    color: 'orange',
}, {
    text: 'dangerous',
    color: 'darkorange',
}, {
    text: 'very dangerous',
    color: 'orangered',
}, {
    text: 'extremely dangerous',
    color: 'red',
}];

export default class GModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            source: {
                latitude: 0,
                longitude: 0,
            },
            target: {
                latitude: 0,
                longitude: 0,
            },
            dangerLvl: 0,
            ExpiredTime: 15,
        }
    }

    _sliderDangerValueChange(value) {
        this.setState({dangerLvl: value});
    }

    _sliderTimeValueChange(value) {
        this.setState({ExpiredTime: value});
    }

    _closeModal() {
        this.setState({open: false});
        this.setState({dangerLvl: 0});
        this.setState({ExpiredTime: 15});
    }

    _buttonPressed() {
        let distance = DistanceUtils.Distance(this.state.source, this.state.target);
        if (distance > 500) {
            this._closeModal();
            alert('You can not mark too far away!');
        } else {
            try {
                GHTTPWrapper.postMark(this.state.target, this.state.dangerLvl, this.state.ExpiredTime);
                this._closeModal();
            } catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        return(
        <Modal 
            open={this.state.open} 
            offset={0} 
            overlayBackground={'rgba(0, 0, 0, 0.75)'} 
            animationDuration={200} 
            animationTension={40} 
            modalDidClose={() => this._closeModal()} 
            closeOnTouchOutside={true}
            containerStyle={styles.modalContainer}
            modalStyle={styles.modal}
            disableOnBackPress={false}>
            <View>
                <Text style={styles.boldHeader}>Marking</Text>
                <View>
                    <Text style={styles.bold}>Target Location:    </Text>
                    <Text style={styles.smallText}>    latitude: {this.state.target.latitude}</Text>
                    <Text style={styles.smallText}>    longtitude: {this.state.target.longitude}</Text>
                </View>
                <View>
                    <Text style={styles.bold}>Distance:    </Text>
                    <Text style={styles.smallText}>    {DistanceUtils.Distance(this.state.source, this.state.target)} meters</Text>
                </View>
                <View>
                    <View style={styles.inlineView}>
                        <Text style={styles.bold}>Danger Level:    </Text>
                        <Text style={{fontSize: 12, color: dangerMapping[this.state.dangerLvl].color}}>{dangerMapping[this.state.dangerLvl].text}</Text>
                    </View>
                    <Slider minimumValue={0} maximumValue={3} step={1} value={this.state.dangerLvl} onValueChange={value => this._sliderDangerValueChange(value)}/>
                </View>
                <View>
                    <View style={styles.inlineView}>
                        <Text style={styles.bold}>Expired time:    </Text>
                        <Text style={{fontSize: 12}}>{this.state.ExpiredTime} min(s)</Text>
                    </View>
                    <Slider minimumValue={15} maximumValue={360} step={1} value={this.state.ExpiredTime} onValueChange={value => this._sliderTimeValueChange(value)}/>
                </View>
                <View>
                    <Text>{'\n'}</Text>
                    <Button style={styles.button} title='Mark' onPress={() => this._buttonPressed()}/>
                </View>
            </View>
        </Modal>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        
    },
    inlineView: {
        flexDirection:'row', 
        flexWrap:'wrap',
    },
    smallText: {
        fontSize: 12,
    },
    bold: {
        fontWeight: 'bold',
    },
    boldHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        justifyContent: 'center',
    },
    modal: {
        borderRadius: 2,
        margin: 20,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
});