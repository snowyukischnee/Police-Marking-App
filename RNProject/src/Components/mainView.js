import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import GMap from './GMap';

export default class mainView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <GMap/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});