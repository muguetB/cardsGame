import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'

export default function Button({onPress, text, style} : {onPress: Function, text: string, style?: Object}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button, style]}>
              <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    }
})

