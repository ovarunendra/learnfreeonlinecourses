import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Saved extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{color: '#F5FCFF'}}>Your saved posts will show here.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F6D7A',
    },
});

export default Saved;
