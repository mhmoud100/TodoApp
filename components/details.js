import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native';

export default function Details({ navigation }) {
    return (
        <View>
            <Text>{ navigation.getParam('title') }</Text>
            
        </View>
    )
}

