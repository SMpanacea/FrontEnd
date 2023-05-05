import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Entypo} from '@expo/vector-icons'

function CameraButton({title, onPress, icon, color}){
    return(
        <TouchableOpacity onPress ={onPress} style={styles.button}>
            <Entypo name={icon} size={28} color={color ? color : 'blue'} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CameraButton;


const styles = StyleSheet.create({
    button:{
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontWeight: 'bold',
        fontSize: 16,
        // color: '#f1f1f1',
        color:'blue',
        marginLeft: 10
    }
  });