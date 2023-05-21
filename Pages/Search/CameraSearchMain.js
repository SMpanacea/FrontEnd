// main에서 알약 검색 누르면 보이는 화면
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import {Image, StyleSheet, View,ImageBackground, TouchableOpacity, InteractionManager, findNodeHandle,AccessibilityInfo } from 'react-native';
import { Text, Button } from 'react-native-paper';
export default function CameraSearchMain({ navigation }) {
    const screanReaderFocus = useRef(null);
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            const reactTag = findNodeHandle(screanReaderFocus.current);
            if (reactTag) {
                console.log("findNodeHandle")
                AccessibilityInfo.setAccessibilityFocus(reactTag);
            }
        })
    }, []);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity ref={screanReaderFocus}   style={[styles.button, styles.down]}   onPress={() => navigation.navigate('PillDetectionMain')}>
            {/* <ImageBackground 
                    source={require('../../assets/animation_640_lhwuujpi.gif')}
                    // style={{width: '100%', height: '100%', justifyContent: 'center'}}
                    style={styles.imageBackground}
                    resizeMode="cover"
                > */}
                {/* <Button
                    mode="outlined"
                    contentStyle={styles.button}
                    labelStyle={{ fontSize: 20 }}
                  >카메라로 알약 검색</Button> */}
            {/* </ImageBackground> */}
            <Image
    source={require('../../assets/animation_640_lhwuujpi.gif')}
    style={styles.image}
  />
            </TouchableOpacity>
            <Button
                mode="outlined"
                style={styles.down}
                contentStyle={styles.button}
                labelStyle={{ fontSize: 20 }}
                onPress={() => navigation.navigate('TextSearch')}>이름으로 알약 검색</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 230,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    down: {
        marginBottom: 60
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center', // Center button vertically
        alignItems: 'center', // Center button horizontally
      },
      image: {
        width: 180, // or whatever size you want
        height: 120, // or whatever size you want
        position: 'absolute',
        right: 0,
        bottom: 0
      }
});