import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native';

export default function Details({ navigation }) {
    return (
        <View>
            <Text>{ navigation.getParam('text') }</Text>
            <Text>{ navigation.getParam('time') }</Text>
            <TextInput 
            style = {styles.input}
            placeholder = 'new todo ....'
            value={ navigation.getParam('text') }
            multiline={true}
            />
            <Button  title='add todo' color='coral'/>
        </View>
    )
}

