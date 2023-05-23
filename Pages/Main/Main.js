// 앱 들어가면 제일 먼저 보이는 화면
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function Main({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                mode="outlined"
                style={styles.down}
                contentStyle={styles.button}
                labelStyle={{ fontSize: 20 }}
                onPress={() => navigation.navigate('BarcodeMain')}>바코드 검색</Button>
            <Button
                mode="outlined"
                style={styles.down}
                contentStyle={styles.button}
                labelStyle={{ fontSize: 20 }}
                onPress={() => navigation.navigate('CameraSearchMain')}>알약 검색</Button>

        </View>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Button
        //         mode="outlined"
        //         style={styles.down}
        //         contentStyle={styles.button}
        //         labelStyle={{ fontSize: 20 }}
        //         onPress={console.log("카머라 버튼 눌림")}>카메라로 알약 검색</Button>
        //     <Button
        //         mode="outlined"
        //         style={styles.down}
        //         contentStyle={styles.button}
        //         labelStyle={{ fontSize: 20 }}
        //         onPress={console.log("얼역 버튼 눌림")}>이름으로 알약 검색</Button>
        //     <Button
        //         mode="outlined"
        //         style={styles.down}
        //         contentStyle={[styles.button]}
        //         labelStyle={{ fontSize: 20 }}
        //         onPress={console.log("카머라 버튼 눌림")}>카메라로 알약 검색</Button>
        // </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 130, 
        width: 300, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    down: {
        marginBottom:60
    }
});